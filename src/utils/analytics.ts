// Google Analytics 4 with Consent Mode v2 in "basic" mode: gtag.js is not
// even downloaded until the visitor accepts, so nothing reaches Google before
// consent. The inline script at the top of <body> (see __root.tsx) sets the
// denied defaults and restores a previous "granted" choice from localStorage.
// js/config are queued only in the loader, after the consent update, so the
// first page_view already uses the consented cookie.

export const GA_ID = 'G-T3L6H9G61S'
export const CONSENT_KEY = 'lc-consent'
export const OPEN_CONSENT_EVENT = 'lc:open-consent'

type Gtag = (...args: unknown[]) => void
type AnalyticsWindow = Window & {
  gtag?: Gtag
  lcLoadGa?: () => void
  lcGaLoaded?: boolean
}

function gtag(...args: unknown[]) {
  const fn = (window as AnalyticsWindow).gtag
  if (fn) fn(...args)
}

export const gaHeadScript = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied'
});
window.lcLoadGa = function () {
  if (window.lcGaLoaded) return;
  window.lcGaLoaded = true;
  gtag('js', new Date());
  gtag('config', '${GA_ID}');
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=${GA_ID}';
  document.head.appendChild(s);
};
try {
  if (localStorage.getItem('${CONSENT_KEY}') === 'granted') {
    gtag('consent', 'update', { analytics_storage: 'granted' });
    window.lcLoadGa();
  }
} catch (e) {}
`

export type ConsentChoice = 'granted' | 'denied'

export function readConsent(): ConsentChoice | null {
  try {
    const value = localStorage.getItem(CONSENT_KEY)
    return value === 'granted' || value === 'denied' ? value : null
  } catch {
    return null
  }
}

export function saveConsent(choice: ConsentChoice) {
  try {
    localStorage.setItem(CONSENT_KEY, choice)
  } catch {}
  const win = window as AnalyticsWindow
  gtag('consent', 'update', { analytics_storage: choice })
  if (choice === 'granted') {
    win.lcLoadGa?.()
  } else {
    // Withdrawing consent also removes the cookies GA already set.
    for (const name of document.cookie.split('; ').map((c) => c.split('=')[0])) {
      if (!name.startsWith('_ga')) continue
      for (const domain of ['', `; domain=.${location.hostname.replace(/^www\./, '')}`]) {
        document.cookie = `${name}=; Max-Age=0; path=/${domain}`
      }
    }
    // An already-loaded gtag keeps sending until the page is reloaded; the
    // reload runs the inline script with "denied", so gtag.js is not loaded.
    if (win.lcGaLoaded) window.location.reload()
  }
}

export function openConsentSettings() {
  window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))
}

// Events are only queued once GA is loaded (i.e. after consent), so nothing
// collected while refused is sent after a later "Accept".
export function trackEvent(name: string, params: Record<string, string> = {}) {
  if (!(window as AnalyticsWindow).lcGaLoaded) return
  gtag('event', name, params)
}

// Delegated click tracking for every contact link on the site.
export function trackContactClick(event: MouseEvent) {
  const link = (event.target as Element | null)?.closest?.('a[href]')
  if (!link) return
  const href = link.getAttribute('href') ?? ''
  const name = href.startsWith('tel:')
    ? 'click_call'
    : href.startsWith('mailto:')
      ? 'click_email'
      : href.includes('wa.me/')
        ? 'click_whatsapp'
        : null
  if (!name) return
  const placement =
    link.closest<HTMLElement>('[data-placement]')?.dataset.placement ??
    link.closest('header')?.tagName.toLowerCase() ??
    link.closest('footer')?.tagName.toLowerCase() ??
    'page'
  trackEvent(name, { placement, page_path: window.location.pathname })
}
