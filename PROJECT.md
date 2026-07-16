# Project Document — KM71 Jukebox Radio Website

**Owner:** Roland Broos (Cypres11)
**Started:** Juli 2026
**Status:** Actief, live op www.km71.nl

---

## 1. Achtergrond

KM71 Jukebox Radio is een internetradiostation, gebouwd rond de muziek uit
de legendarische jukebox die ooit in de middenkamer van roeivereniging
Laga's huis (Koornmarkt 71, Delft) stond. Het station draait op
**SAM Broadcaster Cloud (Silver)** van Spacial, en de website stond eerder
als eenvoudige, verouderde site op Hostinger.

Doel van dit project: de website moderniseren, en luisteraars de
mogelijkheid geven om zelf een nummer uit de bibliotheek te kiezen en aan
te vragen — zoals bij de originele jukebox.

---

## 2. Projectdoelen

- Moderne, aantrekkelijke website die het "jukebox"-verhaal vertelt
- Luisteraars laten zoeken in de volledige muziekbibliotheek en een nummer
  aanvragen
- Live radio die *écht* ononderbroken doorspeelt, ook tijdens het
  navigeren en aanvragen
- Geen maandelijkse extra kosten — gebruikmaken van de bestaande
  SAM Broadcaster Cloud- en Hostinger-abonnementen
- Ruimte voor persoonlijke content: het verhaal, foto's, en een
  fotoserie voor oud-huisgenoten

---

## 3. Ontwikkelverhaal

### Fase 1 — Eerste opzet (meerdere pagina's)

Gestart als klassieke meerdere-pagina's-website: `index.html`,
`verzoekjes.html`, `over-ons.html`, `contact.html`, met gedeelde
header/footer, gebouwd in een submap (`km71-website/`) van een bestaande
GitHub-repo.

**Design:** warm goud/amber (`#e8a33d`) op een donkere achtergrond
(`#14100c`) — een retro-jukebox gevoel met een moderne, strakke lay-out.

### Fase 2 — SAM Broadcaster Cloud widgets

De website is verbonden met het echte radiostation via de officiële
**Web Widgets** van SAM Broadcaster Cloud (ingebed als `<sam-widget>`
custom elements, geladen via een script van `samcloudmedia.spacial.com`):

| Widget-type | Gebruikt voor |
|---|---|
| `library` | Doorzoekbare bibliotheek + aanvragen (met "Allow request" aan) |
| `history` | "Draaide net" — laatst gespeelde nummers |
| `line up tile` | De wachtrij — bevestigde, aankomende nummers (heet in SAM Cloud dus "Line Up", niet "Queue") |

Elke widget kreeg een eigen `theme`-attribuut om de kleuren te matchen met
de rest van de site.

**Belangrijke ontdekking:** requests hebben in SAM Cloud een minimale
vertraging (ingesteld op ~12 minuten via **Station Settings → Request
Policy**) voordat ze in de wachtrij verschijnen — dit is server-side
gedrag, niet iets wat de website kan versnellen.

### Fase 3 — Live speler & continu afspelen

Eerste versie had de audiospeler alleen op de homepage — waardoor de
muziek stopte zodra iemand naar de verzoekjespagina navigeerde. Opgelost
door:

1. Eerst: dezelfde speler op elke pagina zetten (hielp gedeeltelijk).
2. Uiteindelijk: de **hele site omgebouwd naar een single-page app**.
   Alle content staat nu in één `index.html`; JavaScript
   (`js/router.js`) wisselt welk deel zichtbaar is op basis van het
   URL-anker (`#home`, `#verzoekjes`, `#over-ons`, `#contact`). Zo wordt
   de pagina nooit opnieuw geladen en de audiospeler dus nooit vernietigd
   — de muziek speelt écht ononderbroken door.

### Fase 4 — Eigen repository

De site is losgekoppeld van de oorspronkelijke (gedeelde) GitHub-repo en
verhuisd naar zijn eigen repository: **github.com/Cypres11/km71**.

### Fase 5 — Echte content

Placeholder-teksten vervangen door het echte verhaal (jukebox, Laga,
Koornmarkt 71, genres inclusief "Franse hijg" en "Klassiek"), en foto's
toegevoegd:

- `assets/jukebox.jpg` — de originele jukebox, in de hero op de homepage
- `assets/km71-single.jpg` — KM71 met een Philips-single, gebruikt als
  logo (header) én bovenaan "Over ons"
- `assets/gitaar.jpg` — sfeervolle achtergrond achter de genre-tags

### Fase 6 — Widget-problemen opgelost

- **Zoekveld onleesbaar:** het zoekveld in de Library-widget had witte
  achtergrond met bijna-witte tekst. Bleek te komen doordat de widget
  (die intern een Shadow DOM gebruikt) de `theme.text`-kleur globaal
  toepast op alles binnen de widget, inclusief het zoekveld — niet alleen
  op de donkere onderdelen waarvoor die kleur bedoeld was. Workaround:
  `theme.text` gezet op een neutraal grijs (`#808080`) dat op zowel
  donkere achtergrond als wit zoekveld leesbaar is. Root cause is
  gerapporteerd bij Spacial support; een echte fix (aparte kleur voor het
  zoekveld) ligt bij hen.
- **Widget-taal:** de widgets ondersteunen alleen Engels — bevestigd door
  Spacial support, geen workaround mogelijk vanuit de website.
- **Cache-problemen:** Safari bleek CSS/JS-bestanden hardnekkig te
  cachen, zelfs na een harde refresh. Opgelost met cache-busting
  versienummers (`?v=1`, `?v=2`, ...) achter elk CSS/JS-bestand in
  `index.html` — zie sectie 7.

### Fase 7 — Fotoslider voor oud-huisgenoten

Een fotoslider toegevoegd op de "Over ons"-pagina (sectie "Foto's van
vroeger") met eigen, simpele knoppen en dots — geen externe library, puur
HTML/CSS/JS. Foto's worden beheerd via een los, makkelijk aan te passen
bestand (`js/slider-photos.js`) — zie sectie 8 voor de instructie.

---

## 4. Belangrijkste functies (huidige versie)

| Functie | Beschrijving |
|---|---|
| Live radio | Speelt automatisch, blijft doorspelen tijdens navigeren |
| Verzoekjes | Doorzoekbare bibliotheek, nummer aanvragen of opdragen |
| Historie | Toont recent gespeelde nummers |
| Wachtrij | Toont aankomende, bevestigde nummers |
| Over ons | Het verhaal van de jukebox, met foto's |
| Fotoslider | Reüniefoto's voor oud-huisgenoten, makkelijk uit te breiden |
| Contact | E-mailadres, beschermd tegen scrapers via een klein scriptje |
| Mobielvriendelijk | Volledig responsive, incl. inklapbaar menu |

---

## 5. Technologie

| Laag | Technologie | Waarom |
|---|---|---|
| UI | HTML + eigen CSS | Geen frameworks, makkelijk aan te passen |
| Logica | Vanilla JavaScript | Geen buildstap nodig, direct te bewerken |
| Radiodata | SAM Broadcaster Cloud Web Widgets | Officiële, live koppeling met het radiostation |
| Navigatie | Eigen router.js (hash-based SPA) | Voorkomt dat de audiospeler herlaadt |
| Versiebeheer | Git + GitHub (`Cypres11/km71`) | Historie, back-up, samenwerken met Claude |
| Hosting | Hostinger (shared hosting) | Bestaand abonnement, geen extra kosten |
| Deployment | Handmatig via `scp`/`ssh` (SFTP-poort 65002) | Geen automatische pipeline, simpel en voorspelbaar |

---

## 6. Bestandsstructuur

```
km71/
├── index.html            Alle pagina's in één bestand (single-page app)
├── verzoekjes.html         Redirect-stub → index.html#verzoekjes
├── over-ons.html           Redirect-stub → index.html#over-ons
├── contact.html            Redirect-stub → index.html#contact
├── css/
│   └── style.css           Alle styling
├── js/
│   ├── main.js              Mobiel menu
│   ├── router.js            Wisselt de zichtbare "pagina"
│   ├── slider.js             Fotoslider-logica
│   └── slider-photos.js      Lijst met foto's voor de slider (jij beheert dit)
├── assets/
│   ├── favicon.svg
│   ├── jukebox.jpg
│   ├── km71-single.jpg
│   ├── gitaar.jpg
│   └── reunie/               Foto's voor de slider
├── README.md                Technische documentatie
└── PROJECT.md                Dit document
```

---

## 7. Werken met de code

### Lokaal testen (Mac)

```bash
cd ~/Documents/km71
python3 -m http.server 8080
```
Open **http://localhost:8080**.

### Wijzigingen doorvoeren

```bash
cd ~/Documents/km71
# ... bestanden aanpassen ...
git add -A
git commit -m "Omschrijving van de wijziging"
git push origin main
```

### Live zetten op Hostinger

```bash
scp -P 65002 index.html u612741653@92.112.187.1:~/domains/km71.nl/public_html/
scp -P 65002 css/style.css u612741653@92.112.187.1:~/domains/km71.nl/public_html/css/
scp -P 65002 js/*.js u612741653@92.112.187.1:~/domains/km71.nl/public_html/js/
ssh -p 65002 u612741653@92.112.187.1 "chmod 644 ~/domains/km71.nl/public_html/index.html ~/domains/km71.nl/public_html/css/style.css ~/domains/km71.nl/public_html/js/*.js"
```

**Let op — cache-busting:** iedere keer dat je de *inhoud* van
`css/style.css`, `js/main.js`, `js/router.js`, `js/slider.js` of
`js/slider-photos.js` wijzigt, moet je het versienummer erachter in
`index.html` ophogen (bijv. `style.css?v=10` → `?v=11`), anders houden
sommige browsers (vooral Safari) een oude, gecachete versie vast:

```bash
sed -i '' 's/style.css?v=10/style.css?v=11/' index.html
```
(Vervang bestandsnaam en versienummers naar wat van toepassing is.)

---

## 8. Foto's vervangen via de terminal

### 8.1 De vaste foto's (jukebox, single, gitaar)

Deze drie foto's worden op precies één plek gebruikt en hebben een vaste
bestandsnaam. Een nieuwe foto plaatsen = het bestand met dezelfde naam
overschrijven:

| Bestand | Gebruikt voor |
|---|---|
| `assets/jukebox.jpg` | Hero-foto op de homepage |
| `assets/km71-single.jpg` | Logo (header) én bovenaan "Over ons" |
| `assets/gitaar.jpg` | Achtergrond achter de genre-tags |

```bash
cd ~/Documents/km71

# Kopieer je nieuwe foto (voorbeeld: vanaf het Bureaublad) over het bestaande bestand
cp ~/Desktop/nieuwe-jukebox-foto.jpg assets/jukebox.jpg

git add -A
git commit -m "Nieuwe jukebox-foto"
git push origin main

scp -P 65002 assets/jukebox.jpg u612741653@92.112.187.1:~/domains/km71.nl/public_html/assets/
ssh -p 65002 u612741653@92.112.187.1 "chmod 644 ~/domains/km71.nl/public_html/assets/jukebox.jpg"
```

Zie je de nieuwe foto niet meteen op de site? Doe een harde refresh
(Cmd+Shift+R in Safari) — browsers onthouden afbeeldingen soms een tijdje.

### 8.2 De fotoslider (reüniefoto's voor huisgenoten)

Dit is de plek die je waarschijnlijk het vaakst bijwerkt. Twee stappen:
**foto's uploaden** + **de lijst in `slider-photos.js` bijwerken**.

**Een foto toevoegen:**

```bash
cd ~/Documents/km71

# 1. Kopieer de foto naar de reunie-map (gebruik een duidelijke, unieke naam)
cp ~/Desktop/reunie-2024.jpg assets/reunie/reunie-2024.jpg
```

Open daarna `js/slider-photos.js` in een teksteditor (bijv. TextEdit, of
`open -e js/slider-photos.js` vanaf de terminal) en voeg de bestandsnaam
toe aan de lijst:

```js
var sliderPhotos = [
  "reunie-2019.jpg",
  "reunie-2024.jpg",   // <- nieuwe regel
];
```

Sla op, en upload alles:

```bash
git add -A
git commit -m "Reüniefoto 2024 toegevoegd aan de slider"
git push origin main

scp -P 65002 assets/reunie/reunie-2024.jpg u612741653@92.112.187.1:~/domains/km71.nl/public_html/assets/reunie/
scp -P 65002 js/slider-photos.js u612741653@92.112.187.1:~/domains/km71.nl/public_html/js/
ssh -p 65002 u612741653@92.112.187.1 "chmod 644 ~/domains/km71.nl/public_html/assets/reunie/reunie-2024.jpg ~/domains/km71.nl/public_html/js/slider-photos.js"
```

**Een foto verwijderen:** haal de bijbehorende regel weg uit
`js/slider-photos.js`, en optioneel ook het bestand uit `assets/reunie/`
(niet strikt nodig — als de bestandsnaam nergens meer in de lijst staat,
wordt de foto simpelweg niet meer getoond). Daarna weer committen, pushen
en uploaden zoals hierboven.

**Belangrijk:** telkens als je de inhoud van `slider-photos.js` wijzigt,
moet je ook het versienummer in `index.html` ophogen (zie sectie 7,
cache-busting) — zoek naar `slider-photos.js?v=` en verhoog het getal:

```bash
sed -i '' 's/slider-photos.js?v=2/slider-photos.js?v=3/' index.html
git add -A && git commit -m "Bump slider-photos.js cache versie" && git push origin main
scp -P 65002 index.html u612741653@92.112.187.1:~/domains/km71.nl/public_html/
ssh -p 65002 u612741653@92.112.187.1 "chmod 644 ~/domains/km71.nl/public_html/index.html"
```

**Toegestane bestandsformaten:** `.jpg`/`.jpeg` en `.png` werken altijd.
Vermijd `.heic` (het standaardformaat van iPhone-foto's) — dat wordt niet
overal correct getoond. Exporteer HEIC-foto's eerst als JPEG via de
Foto's-app (**Archief → Exporteer → Exporteer x foto's... → JPEG**).

---

## 9. Bekende beperkingen

- **Widget-taal:** de SAM Broadcaster Cloud widgets tonen alleen Engelse
  tekst — bevestigd door Spacial support, geen oplossing beschikbaar op
  dit moment.
- **Zoekveld-kleur:** werkt met een compromis-grijs (`#808080`) omdat de
  widget geen aparte kleur voor het zoekveld ondersteunt. Wacht op een
  mogelijke fix van Spacial.
- **Requestvertraging:** een aanvraag verschijnt pas na ~12 minuten in de
  "bevestigde wachtrij" — dit is een server-side instelling in SAM Cloud
  (Request Policy), niet aanpasbaar vanuit de website.
- **Geen automatische deployment:** elke wijziging moet handmatig via
  `scp`/`ssh` naar Hostinger worden geüpload — er is geen CI/CD-pipeline.

---

## 10. Toekomstideeën

- [ ] Telefoonnummer/social media toevoegen aan de contactpagina (nu
      bewust minimaal gehouden)
- [ ] Reactie van Spacial support afwachten over de widget-taal en het
      zoekveld, en de fix doorvoeren zodra beschikbaar
- [ ] Eventueel meer foto's/verhalen toevoegen aan "Over ons"

---

*Project ontwikkeld met Claude Code (Anthropic) — juli 2026.*
