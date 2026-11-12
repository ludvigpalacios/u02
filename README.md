# Dynamisk Portfolio – u02

En interaktiv och responsiv portfolio-webbplats byggd vidare på grunden från u01. Sidan hämtar projekt dynamiskt från GitHubs REST API samt CV-data (arbetslivserfarenhet och utbildning) från en lokal JSON-fil, och inkluderar stöd för ljust och mörkt tema.

## Funktioner
* **Dynamisk projekthämtning:** Hämtar publika repositories via GitHub REST API (`https://api.github.com/users/ludvigpalacios/repos`) och renderar projektkort med roterande bakgrundsbilder, beskrivning och direktlänk till koden.
* **Dynamiskt CV:** Läser in arbetslivserfarenhet och utbildning från en lokal JSON-fil och bygger upp korten i DOM:en.
* **Ljust & mörkt läge:** Temaväxlare baserad på CSS-variabler (`data-theme`) som respekterar användarens systeminställningar (`prefers-color-scheme`) och sparar valet i `localStorage`.
* **Modulär JavaScript:** Koden är uppdelad i ES6-moduler (`import`/`export`) för tydlig ansvarsfördelning mellan datahämtning, DOM-rendering och temahantering.

---

## Teknisk reflektion

### 1. Datans väg
För att förstå datastrukturen testade jag först endpointen `https://api.github.com/users/ludvigpalacios/repos` i Postman. API:et returnerar ett JSON-svar bestående av en array där varje objekt representerar ett repository med egenskaper som `name`, `description` och `html_url`.

**Flödet i koden från anrop till skärm:**
1. **Asynkron hämtning (`fetchData`):** URL:en skickas till `fetch()`, som initierar ett HTTP GET-anrop och omedelbart returnerar ett `Promise`. Eftersom `fetch` är asynkront blockeras inte huvudtråden – webbläsaren kan fortsätta ladda och rendera HTML, CSS och synkron JavaScript medan nätverksanropet pågår i bakgrunden.
2. **Validering och parsning:** När svaret anländer kontrolleras `response.ok` (vilket är `true` för HTTP-statuskoder i intervallet 200–299). Om svaret är godkänt anropas `response.json()`, som läser svarsströmmen och parsar JSON-texten till en faktisk JavaScript-array (även detta returnerar ett `Promise`). Eventuella nätverks- eller HTTP-fel fångas upp av `.catch()`.
3. **Rendering:** När promiset har lösts ut i `.then()` skickas arrayen vidare till `generateProjectTiles()`, som omvandlar datan till HTML-element i DOM:en så att projekten blir synliga för besökaren.

---

### 2. Två datakällor
Även om både CV-datan (lokal JSON-fil) och projektdata (GitHub API) hämtas via samma `fetchData()`-funktion, skiljer de sig åt ur ett tekniskt och arkitektoniskt perspektiv:

* **Lokal JSON-fil (CV):** Filen ligger på samma server/ursprung som resten av webbplatsen och har en fast struktur som jag själv har skrivit och kontrollerar. Risken för nätverksfel, CORS-problem eller oväntade datatyper är minimal, och svaret kommer i princip omedelbart.
* **Externt REST API (GitHub):** Anropet går över internet till en tredjepartsserver som jag inte styr över. Det innebär fördröjning (latens), risk för att API:et ligger nere, rate-limiting (HTTP 403/429) eller att enskilda fält saknar värde (t.ex. att `description` är `null`). Därför krävs defensiv programmering med statuskontroll (`if (!response.ok)`), felhantering via `.catch()` samt fallback-värden i koden (t.ex. en standardtext om en repo-beskrivning saknas).

---

### 3. DOM och händelser
**Hur sidan byggs om när datan kommit in:**
När arrayen från GitHub API har tagits emot i `generateProjectTiles()` hämtas först mål-containern via `document.querySelector(".project-tiles")` och töms med `container.innerHTML = ""` för att rensa bort eventuella testkort och undvika dubbletter. Därefter itererar koden igenom arrayen och plockar ut `name`, `description` och `html_url` med object destructuring. 

För varje objekt skapas ett nytt `<article>`-element med `document.createElement("article")`, dess inre HTML byggs upp via template literals i `.innerHTML`, och elementet fästs slutligen i DOM-trädet med `container.appendChild(article)`. Att bygga ett element per objekt och appenda det gör att varje projektkort blir en isolerad, självständig nod i DOM:en.

**Vilka händelser som lyssnas på och varför:**
* **`DOMContentLoaded` på `document`:** Koden lyssnar på när HTML-dokumentet har laddats klart innan datahämtningen och DOM-manipuleringen startar. Detta garanterar att behållare som `.project-tiles` faktiskt existerar i DOM:en när JavaScript försöker hämta dem, vilket förhindrar `null`-fel.
* **`click` på `#theme-toggle`:** Lyssnar direkt på temaknappen eftersom den är ett statiskt element som finns på sidan från start.
* **Ingen klick-lyssnare på `.project-tiles`:** Själva projektcontainern har ingen event-lyssnare kopplad till sig eftersom navigeringen till respektive GitHub-repo hanteras nativt av webbläsaren via vanliga semantiska `<a>`-taggar (`href="${html_url}"`), vilket både är enklare och bättre för tillgängligheten.

---

### 4. Markup du inte skrivit för hand
För att säkerställa att den dynamiskt genererade HTML-koden håller samma semantiska och tillgänglighetsmässiga kvalitet som min handskrivna kod i u01, utgick jag direkt från den färdiga och validerade HTML-strukturen från u01 som mall inuti mina template literals.

Genom att bevara exakt samma elementhierarki och attribut – som semantiska `<article>`-, `<nav>`- och `<h3>`-taggar samt `aria-label` och `alt`-texter på ikoner och bilder – och enbart byta ut textinnehållet mot JavaScript-variabler, undvek jag slarvfel i taggstrukturen och säkerställde att både skärmläsare och CSS-selektorer fungerar identiskt med originaldesignen.

---

### 5. Temaväxlingen
**Lösning med CSS-variabler:**
Jag definierade hela färgpaletten som CSS custom properties (t.ex. `--background` och `--text-color`) under `:root` för det ljusa standardläget, och skapade sedan ett regelblock för `[data-theme="dark"]` där samma variabelnamn skrivs över med mörka färgvärden. 

Vid sidladdning kontrollerar JavaScript om det finns ett sparat val i `localStorage`, och faller annars tillbaka på användarens operativsysteminställning via `window.matchMedia('(prefers-color-scheme: dark)')`. När användaren klickar på temaknappen ändras enbart attributet `data-theme` på `<html>`-elementet (`document.documentElement`) mellan `'light'` och `'dark'`, samtidigt som valet sparas i `localStorage`. Eftersom CSS-variabler ärvs nedåt i DOM-trädet (cascade) räknar webbläsaren automatiskt om färgerna på alla element som använder `var(--...)`.

**Varför det hade blivit svårare direkt i JavaScript:**
* **Omfattande DOM-manipulation:** Istället för att ändra ett enda attribut på `<html>` hade jag tvingats hämta alla berörda element med mängder av `querySelectorAll()`-anrop, loopa igenom dem och manuellt skriva över inline-stilar (`element.style...`).
* **Sämre underhåll (Separation of Concerns):** Färg- och designregler hade blandats in i JavaScript-logiken istället för att ligga samlad i CSS-filen, vilket gör koden svårare att felsöka och uppdatera.
* **Dynamiskt skapat innehåll:** Kort som renderas i efterhand från API:et eller JSON-filen hade inte fått rätt tema automatiskt utan extra JavaScript-logik, medan CSS-variabler slår igenom omedelbart på alla nya element som läggs till i DOM:en.

---

### 6. När det inte går som tänkt
* **Om GitHub svarar långsamt:** Eftersom `fetchData()` är asynkron körs inte `generateProjectTiles()` förrän svaret har kommit in. Under väntetiden ser besökaren de ursprungliga hårdkodade testkorten som ligger i `.project-tiles` i HTML-filen (eftersom `container.innerHTML = ""` inte körs förrän datan väl är redo). Sidans övriga funktioner, som navigation och temaväxling, fungerar utan fördröjning.
* **Om GitHub svarar med fel (t.ex. 404, 403 eller nätverksfel):** Kontrollblocket `if (!response.ok)` kastar ett `Error` som fångas upp i `.catch()`. Där loggas felet i konsolen och funktionen returnerar `null` istället för att krascha applikationen. För besökaren innebär det att inga API-kort ritas ut (och att ett felmeddelande kan visas när `data` kontrolleras vara `null`).
* **Om GitHub svarar med en tom lista (`[]`):** Anropet räknas som lyckat (`response.ok === true`), så `generateProjectTiles([])` anropas. Containern rensas via `container.innerHTML = ""`, och eftersom loopen körs noll varv förblir projektsektionen helt tom för besökaren. *(Med en enkel `if (githubArray.length === 0)`-kontroll kan man även visa en förklarande text).*

---

### 7. Styrkor och brister
**Styrkor:**
* **Modulär arkitektur:** Uppdelningen i ES6-moduler (`import`/`export`) gav tydlig struktur, undvek krockar i det globala scopet och gjorde det enkelt att återanvända `fetchData` för både API:et och JSON-filen.
* **Smarta rendering- och temalösningar:** Återanvändningen av semantiska HTML-mallar, modulo-rotationen för bakgrundsbilder (`(i % 6) + 1`) och kopplingen mellan CSS-variabler, `prefers-color-scheme` och `localStorage` fungerade sömlöst tillsammans.

**Vad jag skulle bygga om med mer tid:**
* **Migrera till `async/await`:** I `fetchData` använde jag `.then()`-kedjor. Med mer tid hade jag skrivit om funktionen med `async/await` och `try/catch`, vilket ger en mer linjär, lättläst och lättdebuggad kod när flera asynkrona steg kombineras.
* **Bättre laddnings- och fel-UX:** Istället för att låta testkort ligga kvar i HTML-koden under laddning hade jag implementerat en laddningsindikator (spinner eller skeleton-kort) samt ett tydligt felmeddelande direkt i DOM:en vid API-fel eller tomma svar.
* **Städning av mallar och attribut:** Jag hade ersatt duplicerade `id`-attribut inuti kortlooparna med CSS-klasser (eftersom `id` ska vara unikt i HTML) samt lagt till `rel="noopener noreferrer"` på externa länkar med `target="_blank"`.

---

### 8. AI-verktyg
**Hur AI-verktygen användes:**
* **Inlärning och konceptförståelse:** Jag använde AI som bollplank för att repetera och förstå koncept som ES6-moduler (`import`/`export`) och variabel-scope, samt skapade egna små testexempel för att verifiera hur koden fungerade innan jag skrev den i projektet.
* **Konvertering av HTML-mallar:** Jag tog hjälp av AI för att strukturera om min befintliga HTML från u01 till template literals för `.innerHTML`, vilket minimerade risken för syntaxfel i långa HTML-strängar.
* **Problemlösning:** När bakgrundsbilderna tog slut efter de första projektkorten använde jag AI för att hitta en matematisk lösning för att återanvända bilderna cykliskt, vilket resulterade i modulo-beräkningen `(i % 6) + 1`.

**Vad jag ändrade i det som genererades:**
Jag kopierade aldrig kod rakt av utan anpassade alltid förslagen efter min egen kodbas. Jag bytte ut generiska selektorer, klassnamn och variabelnamn så att de stämde överens med min HTML och CSS från u01, lade till egna fallback-värden för saknad GitHub-data och säkerställde att jag förstod varenda rad innan den lades in i projektet.