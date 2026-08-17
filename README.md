# HTML Card Creator

Proste narzędzie webowe do generowania opisów produktów (HTML) do wklejenia w e-Sklep, na podstawie 3 gotowych szablonów wizualnych.

## Jak działa

1. Wybierz jeden z 3 szablonów: **PROSTY**, **DŁUGI**, **ZAAWANSOWANY**.
2. Wklej tekst (np. z pliku Word) do odpowiednich pól — każda sekcja opisu ma osobny box.
3. Po prawej stronie widać na żywo podgląd, jak opis będzie wyglądał w e-Sklepie.
4. Kliknij **„Kopiuj kod HTML”** i wklej gotowy kod w zakładce HTML opisu produktu.

## Zdjęcia

Miejsca na zdjęcia są celowo pozostawione jako placeholdery w kodzie
(`src="PODMIEN-ZDJECIE-1.jpg"` + komentarz HTML nad tagiem `<img>` z opisem,
którego zdjęcia dotyczy). Po wklejeniu kodu do e-Sklepu wystarczy podmienić
te adresy na docelowe linki do zdjęć bezpośrednio w kodzie.

## Formatowanie tekstu w polach

- Pusta linia w polu tekstowym = nowy akapit (`<br><br>`).
- `**tekst**` = pogrubienie (`<b>tekst</b>`).

## Zapis roboczy, walidacja i cofanie

- **Autozapis**: treść zapisuje się na bieżąco w tej przeglądarce (localStorage).
  Zamknięcie karty lub przypadkowe odświeżenie nie kasuje wpisanej treści —
  po powrocie pojawia się baner „Przywrócono niezapisaną wcześniej pracę”.
  Przycisk **„🗑 Wyczyść wszystko”** czyści zapis i zaczyna od zera.
- **Cofnij (Ctrl+Z)**: przywraca stan sprzed ostatniej strukturalnej zmiany
  (usunięcie/przywrócenie pola lub sekcji, dodanie/usunięcie/przesunięcie bloku).
  Nie cofa pojedynczych znaków w polu tekstowym.
- **Walidacja przed kopiowaniem**: kliknięcie „Kopiuj kod HTML” pokazuje listę
  zdjęć do podmiany w kodzie oraz ostrzeżenia o polach z niezmienionym
  przykładowym tekstem szablonu — można poprawić albo skopiować mimo to.

## Kopiuj jako tekst (Word)

Drugi przycisk obok „Kopiuj kod HTML" — kopiuje sam tekst, **bez zdjęć**,
z zachowanym formatowaniem (nagłówek / podtytuł-hasło / zwykły tekst,
różne wielkości i pogrubienia). Po wklejeniu (Ctrl+V) w Wordzie hierarchia
jest widoczna od razu, bez ręcznego formatowania.

## Hosting

Strona to pojedynczy plik `index.html` bez zależności backendowych — działa
w całości w przeglądarce i jest hostowana publicznie przez GitHub Pages.

## Rozwój

Aby dodać/zmienić pole w szablonie, edytuj tablicę `fields` oraz funkcję
`render()` odpowiedniego szablonu (`TPL_PROSTY`, `TPL_DLUGI`,
`TPL_ZAAWANSOWANY`) w pliku `index.html`.
