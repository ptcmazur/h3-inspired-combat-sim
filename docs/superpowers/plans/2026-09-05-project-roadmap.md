# Plan pracy nad symulatorem — 2026-09-05

**Cel:** przygotować wiarygodne, powtarzalne MVP pojedynków, a następnie poprawić wygodę porównań i dzielenia się wynikami.

**Architektura:** statyczny React/TypeScript, niezależny silnik symulacji, katalog i presety bez backendu. Rozdzielanie komponentów oraz Web Worker wprowadzane przy konkretnych potrzebach.

**Technologie:** obecny React, TypeScript, Vite, Vitest i Testing Library; Playwright jest już zależnością developerską.

**Podstawa:** [analiza lokalnego kodu](../../PROJECT_ANALYSIS.md), aktualne pliki źródłowe i istniejące testy. To plan projektu z kryteriami odbioru; nie stanowi potwierdzenia zgodności mechanik z oryginalną grą.

**Wykonanie:** jedno zadanie naraz, proporcjonalny test i przegląd diffu. Bez automatycznego uruchamiania subagentów. Status ukończenia jest aktualizowany przy realizacji zadań.

**Aktualizacja po poleceniu wdrożenia (2026-09-05):** pierwszy publiczny deploy wykonano przed stabilizacją silnika, zgodnie z nowym priorytetem użytkownika. Strona: https://ptcmazur.github.io/h3-inspired-combat-sim/. Commit `295445f`; workflow `33927496128` zakończony sukcesem. Z H3-05 wykonano Pages, ścieżkę bazową presetów, build:pages, instrukcje README i ręczny tryb Firebase; osobne CI dla PR pozostaje do wykonania. Weryfikacja: 28 testów, lint, build oraz test przeglądarkowy lokalny i publiczny (presety, symulacja, log, PL; brak błędów). H3-12 pozostaje częściowo otwarte: brak trwałego testu E2E w repo i changelogu. Następne zadanie to H3-01. Przy porządkowaniu CI zaktualizować akcje Pages zgłaszające ostrzeżenie o Node 20.

## Granice i zasady

- Pozostać przy dwóch stosach, abstrakcyjnym dystansie 1D i deterministycznym seedzie.
- Nie dodawać teraz planszy hex, czarów, artefaktów, kont użytkowników, rankingu ani bazy danych.
- Zmiany mechanik rozpoczynać od testu regresyjnego; dokumentację i konfigurację sprawdzać proporcjonalnie.
- Zmiany sprawdzać przed pushem. Publikacja jest obecnie automatyczna po pushu do main; wcześniej użytkownik zlecił uruchomienie strony i kontynuację prac.
- Nie przenosić lokalnego notesu do śledzonych plików ani nadpisywać jego treści.
- Szacunki poniżej oznaczają skupioną pracę implementacyjną z weryfikacją, nie terminy kalendarzowe.

## Kolejka zadań

| ID | Priorytet | Rezultat | Zależności | Szacunek |
| --- | --- | --- | --- | --- |
| H3-01 | P0 | Ukończone: poprawny wynik walki przerwanej limitem | brak | 1–2 h |
| H3-02 | P0 | Jawne i przetestowane reguły ataku/kontrataku | H3-01 | 4–8 h |
| H3-03 | P0 | Walidacja konfiguracji i aktualność wyników | H3-01 | 3–5 h |
| H3-04 | P1 | Spójne dane oraz bezpieczne presety | H3-03 | 3–5 h |
| H3-05 | P1 | Jedna opisana ścieżka wydania i CI dla PR | brak; wydanie po H3-01–04 | 3–5 h |
| H3-06 | P1 | Powtarzalne generowanie danych | H3-04 | 4–8 h |
| H3-07 | P1 | Czytelny log PL/EN z wyliczeniem obrażeń | H3-02 | 4–7 h |
| H3-08 | P1 | Responsywne obliczenia dużych serii | H3-03, H3-07 | 4–8 h |
| H3-09 | P2 | Wygodne porównania na telefonie i presety | H3-04, H3-07 | 3–6 h |
| H3-10 | P2 | Link odtwarzający konfigurację walki | H3-03, H3-06 | 3–5 h |
| H3-11 | P2 | Jawne ustawienia bohatera, morale i luck | H3-02, H3-03, H3-07 | 5–8 h |
| H3-12 | P1 | Zweryfikowany kandydat do wydania | zakres wybranego wydania | 2–4 h |

P0 oznacza zaufanie do wyniku i kontrolę wejścia, P1 stabilność i jakość MVP, P2 rozwój funkcjonalny. H3-12 powtarzać przy kolejnych wydaniach; nie trzeba czekać na wszystkie P2.

## Etap 1 — poprawność podstaw

### H3-01 — wynik po osiągnięciu limitu rund

**Pliki:** zmiana `src/simulation/duel.ts`; test `src/simulation/duel.test.ts`.

- [x] Dodać test do istniejącego zestawu z dwoma żyjącymi stosami po jednej rundzie:

```ts
const config = {
  ...baseConfig,
  maxRounds: 1,
  sideA: { creature: slow, count: 100, heroId: 'none' },
  sideB: { creature: slow, count: 100, heroId: 'none' },
}
expect(simulateOne(config).winner).toBe('draw')
expect(simulateMany({ ...config, simulations: 3 }).draws).toBe(3)
```

- [x] Uruchomić `npm test -- src/simulation/duel.test.ts` i potwierdzić błąd obecnej implementacji.
- [x] Wyznaczać zwycięzcę na podstawie obu stosów: obie strony żywe lub obie martwe → draw; tylko A żywa → A; tylko B żywa → B.
- [x] Dodać przypadki eliminacji A/B oraz sprawdzenie `winsA + winsB + draws === total`.

**Odbiór:** limit rund nie przyznaje wygranej A; istniejące testy deterministyczności pozostają zielone.

### H3-02 — kontratak, strzelanie i kolejne uderzenia

**Pliki:** `src/simulation/duel.ts`, `damage.ts`, ich testy, `src/types.ts`; nowy `docs/COMBAT_RULES.md`.

- [ ] Zapisać tabelę reguł: strzał/wręcz, kontakt, zużycie amunicji, doubleAttack, noRetaliation, kara wręcz i noMeleePenalty. Dla szczegółów gry sprawdzić źródła i podać je w dokumencie; jawnie oznaczyć przyjęte uproszczenia 1D i pierwszeństwo A przy równej szybkości.
- [ ] Zsyntetyzować strzelca z `slow`, `abilities: ['ranged']`, `shots: 2`, i walkę z `startDistance: 50`, `maxRounds: 1`; oczekiwać braku fazy retaliation przed kontaktem.
- [ ] Dodać testy: zero strzał → ruch/wręcz; brak kontrataku po śmierci celu; noRetaliation nie zużywa możliwości kontrataku; maksymalnie jeden kontratak na rundę.
- [ ] Po ustaleniu reguł sprawdzać kolejność zdarzeń dla dwóch ciosów i dwóch strzałów, także przy jednym pozostałym naboju oraz śmierci atakującego w kontrataku.
- [ ] Rozróżnić rodzaj ataku w `performAttack` i przekazywać go do liczenia obrażeń; wdrożyć uzgodnioną sekwencję i modyfikatory. Nie implementować innych zdolności w tym zadaniu.
- [ ] Uruchomić `npm test -- src/simulation/duel.test.ts src/simulation/damage.test.ts`.

**Odbiór:** każda opisana reguła ma przypadek deterministyczny; UI i dokument nie deklarują nieobsługiwanych efektów jako działających.

### H3-03 — wejście i związek wyniku z konfiguracją

**Pliki:** nowe `src/simulation/validation.ts` i `validation.test.ts`; zmiany `duel.ts`, `App.tsx`, `App.test.tsx`, `i18n.ts`.

- [ ] Ustalić wspólne limity: całkowite simulations 1–5000, count 1–99999, weeks 1–52, startDistance 0–50, maxRounds 1–100; seed jako nieujemna bezpieczna liczba całkowita. To proponowane limity MVP, oparte na aktualnym UI.
- [ ] Utworzyć `validateBattleConfig(config: BattleConfig): string[]`; sprawdzać także finitywność liczb oraz ID bohatera i dostępność obu stron w rulesecie.
- [ ] Testować 0, -1, 1.5, NaN, Infinity i wartości ponad limit. Silnik odrzuca niepoprawną konfigurację przed rozpoczęciem pętli, UI pokazuje komunikat PL/EN.
- [ ] Czyścić wynik przy zmianie parametrów wpływających na walkę, także przez przyrost i equal-gold. Zmiana języka i tekstu wyszukiwania nie zmienia wyniku.
- [ ] Test UI: uruchom walkę → zmień liczebność → poprzednie wyniki znikają → ponów → nowy wynik jest widoczny.
- [ ] Uruchomić testy walidacji, silnika i `src/App.test.tsx`.

**Odbiór:** wejście nie omija limitów, liczba wykonanych prób odpowiada total, ekran nie przypisuje starych wyników nowym parametrom.

## Etap 2 — dane i powtarzalne wydanie

### H3-04 — integralność katalogu i presetów

**Pliki:** `src/data/data.test.ts`, `presets.ts`, `presets.test.ts`, `public/data/presets.v1.json`, `presets.latest.json`.

- [ ] Testować unikalność ID stworzeń, bohaterów i presetów; referencje obu stron oraz zgodność z rulesetem.
- [ ] Sprawdzać rzeczywisty plik publiczny i fallback, a nie wyłącznie fixture testowe. Wymagać spójności treści dla tej samej wersji.
- [ ] W parserze odrzucać nieznane ID, duplikaty, niedostępne frakcje i liczby ponad limity H3-03; nie zastępować błędnego wyboru pierwszą jednostką.
- [ ] Dodać przypadki fetch: HTTP error, odrzucona obietnica, niepoprawny JSON, pusty katalog i wadliwy payload. Zdefiniować pusty katalog jako powód użycia fallbacku.
- [ ] Uruchomić `npm test -- src/data`.

**Odbiór:** każdy oferowany preset wskazuje dokładnie istniejące, dostępne jednostki; wadliwe dane uruchamiają przewidywalny fallback.

### H3-05 — zgodność opisu hostingu z konfiguracją

**Pliki:** `package.json`, `src/data/presets.ts`, `presets.test.ts`, `README.md`, `.github/workflows/deploy-firebase.yml`; nowe `.github/workflows/ci.yml`, `.github/workflows/deploy-pages.yml` przy wyborze Pages.

- [ ] Przyjąć Pages jako proponowany kierunek zgodny z lokalną intencją projektu; przed wdrożeniem ustalić faktyczny stan zdalny. Obecny checkout nie dowodzi, że migracja została wykonana.
- [ ] Dla Pages dodać `build:pages` wykonujący `tsc -b && vite build --base=/h3-inspired-combat-sim/`; pobierać presety względem `import.meta.env.BASE_URL`.
- [ ] Dodać CI dla pull requestów: npm ci → test → lint → build. Przygotować Pages początkowo jako workflow ręczny; Firebase pozostawić wyłącznie ręczny, aby uniknąć dwóch automatycznych publikacji.
- [ ] Sprawdzić lokalnie bundle w podkatalogu: dokument, JS, favicon i JSON presetów ładują się poprawnie. Test fetchera musi oczekiwać prefiksu projektu dla wariantu Pages.
- [ ] Ujednolicić README z faktycznie istniejącymi skryptami. Nie deklarować aktywnej strony ani obsługi `VITE_PRESET_API_URL`, dopóki nie zostaną zweryfikowane lub wdrożone.

**Odbiór:** jedna jasno opisana ścieżka wydania; testy PR nie wymagają sekretów hostingu; lokalny test podkatalogu nie korzysta przypadkiem z fallbacku.

### H3-06 — bezpieczny generator i ręczne korekty

**Pliki:** `scripts/generate-wiki-data.mjs`, katalogi danych i ich testy; nowe `scripts/wiki-parser.mjs`, `scripts/wiki-parser.test.ts`, `scripts/fixtures/wiki-minimal.html`, `src/data/overrides.ts`, `docs/DATA_SOURCES.md`.

- [ ] Wydzielić parsowanie HTML od fetch i zapisu. Dodać mały syntetyczny HTML do testów: prawidłowy wiersz, brak wymaganej kolumny, dwa różne rodzaje braku kar i błąd statystyk bohatera.
- [ ] Rozdzielić brak kary dystansowej od braku kary wręcz. Nie zamieniać nieudanego pobrania statystyk na poprawny rekord z zerami.
- [ ] Przed nadpisaniem obu plików sprawdzić cały wynik generowania; przy błędzie zakończyć bez zmiany istniejącego katalogu.
- [ ] Ręczne nazwy PL i korekty przechowywać w `overrides.ts` kluczowanym po ID; generator nakłada je w powtarzalnej kolejności.
- [ ] Dodać raport wersji źródeł, daty pobrania, liczby rekordów i różnic. Przypiąć opisaną wersję zasad dla Complete/HotA zamiast traktować nazwę wariantu jako gwarancję zgodności.
- [ ] Testować parser offline przez `npm test -- scripts/wiki-parser.test.ts`; osobno sprawdzać niezmienność korekt po powtórnym generowaniu.

**Odbiór:** błędne źródło nie niszczy katalogu, ręczne korekty przeżywają regenerację, testy nie wymagają internetu.

## Etap 3 — czytelność i szybkość

### H3-07 — strukturalny i tłumaczony log

**Pliki:** `src/types.ts`, `src/simulation/duel.ts`, `damage.ts`, testy silnika; nowe `src/components/BattleLog.tsx`, `src/simulation/logFormatting.ts`, `logFormatting.test.ts`; zmiany `App.tsx`, `i18n.ts`.

- [ ] Rozszerzyć zdarzenia o dane potrzebne do wyjaśnienia wyniku: rodzaj ataku, bazowe obrażenia, ATK/DEF, zastosowane mnożniki, wynik rzutu luck, końcowe obrażenia i straty.
- [ ] Renderować tekst PL/EN poza silnikiem; log nie zmienia losowania ani wyniku po zmianie języka.
- [ ] Przenieść renderowanie rund do `BattleLog.tsx`; zachować zwijane sekcje i wyraźny opis, że log przedstawia jedną próbkę z serii.
- [ ] Testować dokładny rozkład obrażeń dla jednostek ze stałymi statystykami oraz zmianę języka bez ponownej symulacji.

**Odbiór:** użytkownik potrafi odtworzyć końcowe obrażenia z widocznych wartości; log i etykiety faz działają po polsku i angielsku.

### H3-08 — duże serie bez blokowania interfejsu

**Pliki:** `src/simulation/duel.ts`, `duel.test.ts`, `App.tsx`; nowe `src/simulation/simulation.worker.ts`, `src/hooks/useSimulation.ts`, `src/hooks/useSimulation.test.tsx`, `scripts/benchmark-simulation.mjs`.

- [ ] Zmierzyć serie 100/1000/5000 walk dla krótkiego pojedynku i przypadku dochodzącego do limitu rund. Zapisać parametry, środowisko i wyniki.
- [ ] Dodać opcję zbierania logu tylko dla próbki, zachowując ten sam porządek wywołań RNG i identyczne statystyki.
- [ ] Uruchamiać serię w Web Workerze; komunikaty identyfikować przez runId. Hook udostępnia start, stan obliczeń, wynik, błąd i cancel; anulowanie kończy worker, a stary runId nie nadpisuje nowszego wyniku.
- [ ] Testować równość wyników dla seeda przy obu trybach logowania, anulowanie i ignorowanie spóźnionej odpowiedzi.
- [ ] W przeglądarce sprawdzić, że przy 5000 walk można przewijać stronę i anulować serię, a błąd workera ma czytelny komunikat.

**Odbiór:** wynik deterministyczny pozostaje ten sam; obliczenia nie blokują interakcji; pomiary pozwalają porównać zmianę.

### H3-09 — mobile i wybór presetów

**Pliki:** `src/App.tsx`, `App.css`, `App.test.tsx`, `i18n.ts`; nowe `src/components/SidePanel.tsx`, `Results.tsx`, `PresetSelector.tsx`.

- [ ] Wydzielić istniejące panele bez zmiany reguł silnika.
- [ ] W presetach pokazać opis i filtr rulesetu; dla pustego filtra wyświetlić komunikat zamiast pustego wyboru. Dodać reprezentatywne presety obu rulesetów, z walidacją H3-04.
- [ ] Uzupełnić etykiety PL/EN i nazwy zdolności; rozdzielić efekty zaimplementowane od opisów nieobsługiwanych.
- [ ] Sprawdzić szerokości 360, 768 i 1280 px oraz obsługę klawiaturą; panel wyników nie zasłania przycisku uruchomienia i nie powoduje przewijania poziomego.

**Odbiór:** użytkownik wybiera preset z opisem, porównuje oba stosy i czyta wynik na telefonie; dotychczasowe testy UI przechodzą.

## Etap 4 — rozszerzenia po stabilizacji

### H3-10 — permalink bez backendu

**Pliki:** nowe `src/config/shareConfig.ts`, `shareConfig.test.ts`; zmiany `App.tsx`, `App.test.tsx`, `i18n.ts`.

- [ ] Kodować w hashu URL wersję schematu i danych, ruleset, ID stron, liczebności, heroId, seed, simulations, maxRounds, startDistance i weeks. Nie serializować całych katalogów ani logu.
- [ ] Dodać `encodeConfig` i `decodeConfig`; dekoder korzysta z walidacji H3-03 i zwraca błąd dla nieznanej wersji/ID. Nie uruchamiać kosztownej symulacji automatycznie po otwarciu linku.
- [ ] Testować round-trip, uszkodzony hash, nieznaną wersję danych i próbę przekroczenia limitu.
- [ ] Dodać przycisk kopiowania z informacją o sukcesie lub błędzie schowka.

**Odbiór:** ten sam link i wersja danych odtwarzają parametry i wynik po uruchomieniu; błędny link nie powoduje cichych podmian.

### H3-11 — jawne statystyki bohatera i morale/luck

**Pliki:** `src/types.ts`, `src/simulation/duel.ts`, `damage.ts`, `validation.ts`, testy; `src/components/SidePanel.tsx`, `i18n.ts`, `docs/COMBAT_RULES.md`.

- [ ] Przed implementacją opisać, które statystyki są edytowalne i jak wybór bohatera ustawia wartości domyślne. Wyraźnie opisać, że specjalność, czary i pozostałe umiejętności nie muszą być symulowane.
- [ ] Dodać jawne modyfikatory ataku/obrony oraz morale/luck z walidacją; dla morale/luck zakres -3…3.
- [ ] Po zweryfikowaniu reguł dopisać testy ujemnych wartości i właściwych wyjątków jednostek; nie uogólniać morale na cały katalog bez modelu odporności.
- [ ] Sprawdzić brak zmian wyników dla dotychczasowych konfiguracji z wartościami domyślnymi; jeśli H3-10 już istnieje, rozszerzyć wersjonowany format linku i jego testy.

**Odbiór:** wynik pokazuje faktycznie zastosowane wartości; wszystkie nowe ustawienia mają testy dla obu rulesetów.

## Bramka wydania

### H3-12 — kandydat do publikacji

**Pliki:** nowe `tests/e2e/smoke.spec.ts`, `playwright.config.ts`, `CHANGELOG.md`; `package.json`, `README.md`, workflow CI.

- [ ] Dodać skrypt `test:e2e` korzystający z zainstalowanego pakietu Playwright; test: otwórz build w podkatalogu → pobierz prawdziwy JSON → zastosuj preset → uruchom → odczytaj wynik i log → przełącz PL.
- [ ] Wykonać `npm test`, `npm run lint`, `npm run build`, a dla Pages także `npm run build:pages` i `npm run test:e2e`.
- [ ] Sprawdzić ten sam proces z czystego checkoutu z `npm ci`; nie opierać publikacji na lokalnym `dist`.
- [ ] W changelogu zapisać wersję, poprawki wyników i ograniczenia silnika. README ma wskazywać rzeczywiście istniejące skrypty.
- [ ] Przygotować raport kandydata: commit, wyniki kontroli, obsługiwane reguły, ograniczenia, instrukcja publikacji i powrotu do poprzedniego artefaktu.

**Odbiór:** wybrany zakres wydania przeszedł testy i kontrolę w przeglądarce. Faktyczne wdrożenie i ustawienia usługi weryfikuje się oddzielnie, po autoryzacji publikacji.

## Pierwszy pakiet do wykonania

Rozpocząć od H3-01, następnie H3-02 i H3-03. H3-04 oraz H3-05 zamykają przygotowanie pierwszego stabilizacyjnego wydania; wtedy wykonać H3-12. Zadania H3-06–11 można dostarczać w kolejnych małych wydaniach. Nie wiązać naprawy wyników z ukończeniem całego backlogu.
