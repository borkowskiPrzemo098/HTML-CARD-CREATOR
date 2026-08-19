# Konfiguracja wspólnych szablonów (jednorazowa, ok. 5 minut)

Ten krok robi tylko właściciel strony (Ty), **raz**. Pracownicy niczego nie
konfigurują ani się nie logują — po prostu widzą i edytują zapisane szablony
od razu po wejściu na stronę.

## Kroki

1. Wejdź na [sheets.google.com](https://sheets.google.com) i utwórz nowy,
   pusty arkusz (może nazywać się np. „HTML Card Creator — szablony”).
2. W menu wybierz **Rozszerzenia → Apps Script**.
3. Usuń domyślną zawartość pliku `Code.gs`, który się otworzy, i wklej w to
   miejsce całą zawartość pliku [`Code.gs`](./Code.gs) z tego folderu.
4. Zapisz projekt (ikona dyskietki / Ctrl+S). Możesz nadać mu dowolną nazwę,
   np. „Card Creator API”.
5. Kliknij **Wdróż → Nowe wdrożenie** (Deploy → New deployment).
   - Kliknij ikonę ⚙️ obok „Wybierz typ” i wybierz **Aplikacja internetowa**
     (Web app).
   - **Wykonaj jako**: Ja (Twoje konto).
   - **Kto ma dostęp**: **Każdy** (Anyone) — to jest kluczowe, żeby strona
     działała bez logowania dla pracowników.
   - Kliknij **Wdróż**.
6. Google poprosi o autoryzację (bo skrypt zapisuje dane do Twojego arkusza).
   Zaakceptuj — to Twój własny skrypt, na Twoim koncie.
7. Po wdrożeniu dostaniesz **URL aplikacji internetowej**
   (wygląda mniej więcej tak:
   `https://script.google.com/macros/s/AKfycb.../exec`). Skopiuj go.
8. Otwórz plik [`index.html`](../index.html) w repozytorium, znajdź linijkę
   (blisko początku sekcji `<script>`):

   ```js
   var SHEETS_API_URL = '';
   ```

   i wklej tam skopiowany URL, np.:

   ```js
   var SHEETS_API_URL = 'https://script.google.com/macros/s/AKfycb.../exec';
   ```

9. Zapisz i wypchnij zmianę na GitHub (`git add`, `git commit`, `git push`) —
   po zaktualizowaniu się GitHub Pages przycisk „💾 Zapisz jako szablon” oraz
   lista „Zapisane szablony” zaczną działać dla wszystkich, którzy mają link
   do strony.

## Co widać w arkuszu

Skrypt sam utworzy w arkuszu zakładkę **„Szablony”** z kolumnami:
`id | name | savedAt | tplId | stateJson`. Możesz tam ręcznie podejrzeć,
posortować, a nawet usunąć wiersz (usunięcie wiersza = usunięcie szablonu
z listy na stronie).

## Aktualizacja skryptu w przyszłości

Jeśli kiedyś zmienimy logikę backendu (np. dodamy usuwanie szablonów z
poziomu strony), wystarczy podmienić zawartość `Code.gs` w Apps Script i
zrobić **Wdróż → Zarządzaj wdrożeniami → ✏️ Edytuj → Wdróż** (URL zostaje
ten sam, nic nie trzeba zmieniać w `index.html`).
