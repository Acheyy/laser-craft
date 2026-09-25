import { createFileRoute } from '@tanstack/react-router'
import { PageHero } from '~/components/PageHero'
import { Section, buttonClass, textLink } from '~/components/ui'
import { COMPANY, EMAIL, PHONE_DISPLAY, PHONE_HREF, emailHref } from '~/data/business'
import { openConsentSettings } from '~/utils/analytics'
import { breadcrumbs, seo } from '~/utils/seo'

export const Route = createFileRoute('/politica-de-confidentialitate')({
  component: PrivacyPage,
  head: () => ({
    ...seo({
      title: 'Politica de confidențialitate și cookie-uri | LaserCraft',
      description:
        'Cum folosește LaserCraft Craiova datele trimise prin telefon, WhatsApp sau email și cookie-urile Google Analytics, plus drepturile dumneavoastră conform GDPR.',
      path: '/politica-de-confidentialitate',
    }),
    scripts: [
      breadcrumbs([
        { name: 'Politica de confidențialitate', path: '/politica-de-confidentialitate' },
      ]),
    ],
  }),
})

const h2 = 'mt-10 text-xl font-bold text-zinc-900 first:mt-0'
const bullets = 'list-disc space-y-1.5 pl-5 marker:text-amber-600'
// Hyphenated words and the domain must not break at the hyphen.
const nowrap = 'whitespace-nowrap'

function PrivacyPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Politica de confidențialitate' }]}
        title="Politica de confidențialitate"
        intro={
          <p>
            Ce date primim când ne contactați, cum le folosim și ce cookie-uri
            folosește site-ul <span className={nowrap}>laser-craft.ro</span>.
          </p>
        }
        actions={false}
      />

      {/* Left-aligned text column, in line with the hero above it. */}
      <Section>
        <div className="max-w-3xl space-y-4 leading-relaxed text-zinc-700">
          <h2 className={h2}>Cine suntem</h2>
          <p>
            Site-ul <span className={nowrap}>laser-craft.ro</span> aparține
            atelierului LaserCraft din Craiova, județul Dolj
            {COMPANY ? ` (${COMPANY.name}, CUI ${COMPANY.cui}, ${COMPANY.regCom})` : ''}.
            Ne puteți scrie la{' '}
            <a href={emailHref('Date personale')} className={textLink}>
              {EMAIL}
            </a>{' '}
            sau ne puteți suna la{' '}
            <a href={PHONE_HREF} className={`${textLink} ${nowrap}`}>
              {PHONE_DISPLAY}
            </a>
            .
          </p>

          <h2 className={h2}>Ce date primim</h2>
          <p>
            Site-ul nu are formulare și nu cere cont. Primim doar datele pe care
            ni le trimiteți dumneavoastră când ne contactați prin telefon,
            WhatsApp sau email:
          </p>
          <ul className={bullets}>
            <li>numele, numărul de telefon sau adresa de email;</li>
            <li>
              detaliile comenzii și, dacă e cazul, fotografiile sau fișierele de
              design;
            </li>
            <li>adresa de livrare, dacă alegeți livrarea prin curier.</li>
          </ul>

          <h2 className={h2}>De ce le folosim</h2>
          <p>
            Folosim aceste date doar pentru a vă răspunde, pentru a vă face
            oferta și pentru a realiza și livra comanda. Nu le vindem și nu le
            folosim pentru reclame. Le păstrăm cât este necesar pentru comandă
            și pentru obligațiile legale (de exemplu cele contabile).
          </p>

          <h2 className={h2}>Cookie-uri și Google Analytics</h2>
          <p>
            Dacă sunteți de acord, folosim Google Analytics 4 pentru a vedea,
            în mod agregat, câți vizitatori are site-ul, ce pagini sunt utile și
            de câte ori sunt folosite butoanele de contact (WhatsApp, telefon,
            email).
          </p>
          <ul className={bullets}>
            <li>
              Google Analytics se încarcă doar după ce apăsați „Accept”.
              Cookie-urile lui (<code>_ga</code>, <code>_ga_*</code>) expiră
              după cel mult 2 ani.
            </li>
            <li>
              Dacă apăsați „Refuz”, Google Analytics nu se încarcă deloc. Dacă
              ați acceptat anterior și alegeți apoi „Refuz”, ștergem
              cookie-urile <code>_ga</code> și reîncărcăm pagina, iar analiza se
              oprește imediat.
            </li>
            <li>
              Alegerea dumneavoastră este păstrată în memoria locală a
              browserului (cheia <code>lc-consent</code>), până când o schimbați
              din „Setări cookie”, în subsolul paginii, sau ștergeți datele
              site-ului.
            </li>
          </ul>
          <p>
            <button
              type="button"
              onClick={openConsentSettings}
              className={buttonClass('outlineLight', 'md')}
            >
              Schimbați setările cookie
            </button>
          </p>

          <h2 className={h2}>Drepturile dumneavoastră</h2>
          <p>Conform GDPR (Regulamentul UE 2016/679), aveți dreptul:</p>
          <ul className={bullets}>
            <li>să cereți accesul la date, corectarea sau ștergerea lor;</li>
            <li>să cereți restricționarea prelucrării;</li>
            <li>să vă retrageți oricând consimțământul;</li>
            <li>
              să depuneți o plângere la Autoritatea Națională de Supraveghere a
              Prelucrării Datelor cu Caracter Personal (ANSPDCP).
            </li>
          </ul>
          <p>
            Pentru orice cerere, <span className={nowrap}>scrieți-ne</span> la{' '}
            <a href={emailHref('Date personale')} className={textLink}>
              {EMAIL}
            </a>
            .
          </p>
        </div>
      </Section>
    </>
  )
}
