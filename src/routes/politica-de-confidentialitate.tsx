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
        'Ce date primește LaserCraft Craiova prin telefon, WhatsApp, email sau din coșul magazinului, cookie-urile Google Analytics și drepturile dumneavoastră conform GDPR.',
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
            Ce date primim când ne contactați sau ne trimiteți o comandă din
            coș, ce păstrează coșul în browserul dumneavoastră, cum folosim
            datele și ce cookie-uri folosește site-ul{' '}
            <span className={nowrap}>laser-craft.ro</span>.
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
          {/* Facts about the code: the cart sends nothing by itself (see
              /cos and utils/cart.ts). */}
          <p>
            Site-ul nu cere cont, iar coșul magazinului nu ne trimite nimic
            singur. Primim doar datele pe care ni le trimiteți dumneavoastră
            prin telefon, WhatsApp sau email, inclusiv mesajul de comandă
            pregătit în coș:
          </p>
          <ul className={bullets}>
            <li>numele, numărul de telefon sau adresa de email;</li>
            <li>
              produsele, cantitățile și textele de personalizare (de exemplu
              numele de pe glob), precum și localitatea, numele și observațiile,
              dacă ne trimiteți mesajul de comandă din coș;
            </li>
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
          <p>
            {`Temeiul prelucrării este răspunsul la cererea dumneavoastră, pregătirea și executarea comenzii (art.\u00a06 alin.\u00a0(1) lit.\u00a0b din GDPR) și obligațiile legale, de exemplu cele contabile (lit.\u00a0c). Pentru Google Analytics, temeiul este consimțământul dumneavoastră (lit.\u00a0a).`}
          </p>

          <h2 className={h2}>Coșul de cumpărături</h2>
          <p>
            Coșul magazinului online funcționează numai în browserul
            dumneavoastră, fără cont. Ca să nu se piardă la reîncărcarea
            paginii, păstrăm în memoria locală a browserului:
          </p>
          <ul className={bullets}>
            <li>
              produsele, cantitățile și textele de personalizare (cheia{' '}
              <code>lc-cos</code>);
            </li>
            <li>
              modul de livrare, localitatea, numele și observațiile completate
              în coș (cheia <code>lc-cos-detalii</code>).
            </li>
          </ul>
          <p>
            Aceste date rămân pe dispozitivul dumneavoastră și ajung la noi
            numai în mesajul de comandă pe care ni-l trimiteți. Textele de
            personalizare, numele, localitatea și observațiile nu sunt trimise
            către Google Analytics (mai jos găsiți ce date despre magazin
            primește acesta). Butoanele „Trimiteți comanda
            pe WhatsApp” și „Trimiteți pe email” doar deschid aplicația cu
            mesajul comenzii gata scris; mesajul ne ajunge numai dacă îl
            trimiteți dumneavoastră. Această memorie locală nu necesită acordul
            dumneavoastră, fiindcă este necesară pentru funcționarea coșului pe
            care îl folosiți.
          </p>
          <p>
            Toate aceste date se șterg când goliți coșul sau când ștergeți
            datele site-ului din browser.
          </p>

          <h2 className={h2}>Cookie-uri și Google Analytics</h2>
          {/* The events in utils/analytics.ts and trackCartEvent in
              utils/cart.ts. */}
          <p>
            Dacă sunteți de acord, folosim Google Analytics 4 pentru a vedea,
            în mod agregat, câți vizitatori are site-ul, ce pagini sunt utile,
            de câte ori sunt folosite butoanele de contact (WhatsApp, telefon,
            email) și cum este folosit magazinul online: ce produse sunt
            vizualizate, adăugate în coș sau scoase din coș, când este deschis
            coșul și când sunt folosite butoanele de trimitere sau de copiere a
            comenzii. Despre magazin trimitem doar date despre produse (codul
            și denumirea produsului, categoria, prețul, cantitatea și valoarea
            totală); nu trimitem textele de personalizare, numele, localitatea
            sau observațiile din coș.
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
            <li>Dacă apăsați „Refuz”, coșul și comanda funcționează la fel.</li>
            <li>
              Datele Google Analytics sunt prelucrate de Google Ireland Limited
              și pot fi transferate în SUA, în baza Cadrului de
              confidențialitate a datelor UE–SUA.
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
            <li>să vă opuneți prelucrării și să cereți portabilitatea datelor;</li>
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
