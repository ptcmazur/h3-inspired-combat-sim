# Analiza projektu — 2026-09-05

## Wniosek

**Aktualizacja po analizie:** 2026-09-05 opublikowano MVP na https://ptcmazur.github.io/h3-inspired-combat-sim/ (commit `295445f`). Dodano workflow Pages, build:pages i obsługę bazowej ścieżki presetów; Firebase działa wyłącznie ręcznie. Publiczna aplikacja przeszła test przeglądarkowy. Poniższe ustalenia opisują stan przed tym wdrożeniem; luki silnika pozostają aktualne.

Projekt jest działającym MVP pojedynków dwóch stosów jednostek. Najbliższy cel to wiarygodne wyniki i powtarzalne wydanie. Rozbudowa liczby zdolności przed ustabilizowaniem podstaw utrudni diagnozowanie błędów.

**Postęp stabilizacji:** H3-01 naprawia przypisywanie zwycięstwa po limicie rund. Dodano regresje dla remisu, agregacji oraz zwycięstwa każdej strony w ostatniej dopuszczonej rundzie. Następne zadanie: H3-02 — ataki dystansowe i kontrataki. Lista ustaleń niżej pozostaje historycznym zapisem audytu.

Analiza dotyczy lokalnego checkoutu, którego HEAD to `a6237cb`. Przed pracą drzewo Git było czyste. Nie sprawdzano działającej strony, ustawień zdalnego repozytorium ani zgodności wszystkich mechanik z grą. Uwagi o implementacji wynikają z odczytu kodu; konkretne reguły gry wymagają osobnej weryfikacji przy realizacji zadań.

## Struktura i odpowiedzialności

| Obszar | Pliki | Rola i ocena |
| --- | --- | --- |
| Uruchomienie | `src/main.tsx`, `vite.config.ts`, `package.json` | React 19, TypeScript 6, Vite 8; statyczny frontend bez backendu |
| Ekran aplikacji | `src/App.tsx` (553 linie), `src/App.css`, `src/index.css` | Konfiguracja, panele stron, presety, wyniki i log w jednym pliku; można rozdzielać stopniowo przy zmianach |
| Model | `src/types.ts` | Wspólne typy konfiguracji, jednostek, bohaterów, wyników i zdarzeń |
| Silnik | `src/simulation/duel.ts`, `damage.ts`, `rng.ts` | Deterministyczne pojedynki i agregacja; niezależne od Reacta, ale `duel.ts` pobiera bohaterów bezpośrednio z katalogu |
| Przeliczanie stosów | `src/simulation/stackPresets.ts` | Przyrost tygodniowy i porównanie za równy koszt złota |
| Katalog | `src/data/creatures.ts`, `heroes.ts`, `selectors.ts` | 190 rekordów stworzeń, 212 rekordów bohaterów (w tym brak bohatera); liczba rekordów nie dowodzi poprawności danych |
| Presety | `src/data/presets.ts`, `public/data/presets.*.json` | Parser, pobieranie i fallback; powielone dane wymagają kontroli spójności |
| Generator | `scripts/generate-wiki-data.mjs` | Pobiera HTML i zapisuje TS; parsowanie zależy od układu tabel źródłowych |
| Języki | `src/i18n.ts` | Część UI PL/EN; log silnika i część etykiet pozostają angielskie |
| Testy | sześć plików `*.test.ts(x)`, `src/test/setup.ts` | Vitest, Testing Library, jsdom; testy silnika, danych, presetów i interfejsu |
| Wydawanie | `.github/workflows/deploy-firebase.yml`, `firebase.json` | Firebase uruchamiany na push do main i ręcznie; brak workflow Pages |

Przepływ danych: katalog/presety → stan w `App` → `BattleConfig` → `simulateMany` → `simulateOne` → `SimulationSummary` → wyniki i log. Obliczenia odbywają się synchronicznie w głównym wątku przeglądarki. Pełny log powstaje dla każdej walki, chociaż UI pokazuje tylko pierwszą próbkę.

## Ustalenia wpływające na priorytety

1. **Wynik przy limicie rund:** w `simulateOne` żyjąca strona A zostaje zwycięzcą również wtedy, gdy B także żyje. Może to zawyżać procent zwycięstw A. Brak testu tego przypadku.
2. **Kontratak na dystans:** końcowy warunek `performAttack` nie sprawdza, czy atak był strzałem i czy strony są w kontakcie. Strzelec może otrzymać kontratak bez dojścia przeciwnika.
3. **Sekwencja i amunicja:** oba uderzenia `doubleAttack` poprzedzają kontratak; amunicja maleje raz przed pętlą uderzeń. Potrzebna jawna specyfikacja rozróżniająca atak wręcz i strzał oraz testy sekwencji.
4. **Zdolności a rzeczywisty efekt:** `noMeleePenalty` i `flying` są w modelu i UI, ale nie wpływają na silnik. Funkcje szans obsługują wartości ujemne morale/luck, lecz przebieg walki ich nie wykorzystuje. Nie należy sugerować pełnej obsługi wszystkich danych bohatera i zdolności.
5. **Walidacja wejścia:** atrybuty HTML `max` nie wymuszają górnych limitów w handlerach. Silnik nie odrzuca ułamkowej liczby symulacji ani wartości niefinitywnych. Ułamek może spowodować rozbieżność między liczbą wykonanych walk i mianownikiem statystyk.
6. **Stare wyniki:** zmiana większości ustawień nie czyści `summary`; użytkownik może oglądać wynik poprzedniej konfiguracji obok nowych ustawień.
7. **Dane presetów:** parser sprawdza kształt danych, ale nie referencje do katalogu, unikalność ID ani zgodność jednostek i bohaterów z rulesetem. `findRecord` i `getHero` potrafią cicho podstawić pierwszy rekord.
8. **Generator:** `no melee` i `no range` mapują się do tej samej zdolności; brak odrębnego traktowania tych pojęć. Niepowodzenie pobierania statystyk klasy zwraca zera. Nazwy PL są domyślnie kopią EN. Testy wielkości katalogu nie wykrywają tych problemów.
9. **Rozjazd opisu wydania:** lokalny notes opisuje Pages, `build:pages`, URL względem `BASE_URL` i opcję `VITE_PRESET_API_URL`. W aktualnym kodzie brak tego skryptu i workflow, endpoint presetów to `/data/presets.v1.json`, a opisana zmienna nie jest odczytywana. README publiczny opisuje Firebase. Lokalny notes pozostaje poza Gitem; nie jest dowodem wykonanego wdrożenia.
10. **Testy i CI:** brak osobnego workflow weryfikacji pull requestów. Aktualny workflow łączy kontrolę jakości z publikacją. Brak testu przeglądarkowego ścieżek zasobów pod katalogiem projektu.

## Kierunek architektury

- Zachować frontend bez bazy danych i logowania dla aktualnego zakresu.
- Utrzymać czysty, deterministyczny silnik z walidacją na wejściu.
- Oddzielić zdarzenia walki od ich tłumaczenia i renderowania.
- Przenosić panele z `App.tsx` przy realizacji konkretnych zadań, bez ogólnej przebudowy projektu.
- Najpierw zmierzyć obliczenia; ograniczyć zbędne logowanie, potem przenieść duże serie do Web Workera.
- Dla danych utrzymywać pochodzenie, wersję i ręczne korekty poza plikami nadpisywanymi przez generator.

## Weryfikacja wykonana w tej sesji

- `npm test`: 27 testów w 6 plikach — wszystkie przeszły.
- `npm run lint`: zakończony bez błędów.
- `npm run build`: TypeScript i build Vite zakończone poprawnie.
- Nie uruchamiano publikacji ani regeneracji katalogu z internetu.
- Dodano wyłącznie dwa dokumenty w `docs/`; kod aplikacji nie został zmieniony. Build odświeżył ignorowany katalog `dist/`.

Zielone testy potwierdzają obecne przypadki testowe, nie pełną poprawność reguł walki. Regresje wskazane wyżej trzeba objąć nowymi przypadkami podczas realizacji planu.

Plan i zadania: [plan pracy](superpowers/plans/2026-09-05-project-roadmap.md).

## Aktualizacja po realizacji trzech kolejnych kroków

Naprawiono sekwencję ataków i strzelanie, dodano walidację wejścia oraz powiązanie wyniku z bieżącą konfiguracją. Log zawiera strukturalne dane obrażeń, tłumaczenie PL/EN i rozwijane szczegóły. Układ sprawdzono w przeglądarce przy 360, 768 i 1280 px. Bieżący zestaw ma 77 testów. Historyczna lista ustaleń wyżej nie jest listą nadal otwartych błędów — aktualny stan jest w planie pracy.
