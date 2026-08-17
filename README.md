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

## Hosting

Strona to pojedynczy plik `index.html` bez zależności backendowych — działa
w całości w przeglądarce i jest hostowana publicznie przez GitHub Pages.

## Rozwój

Aby dodać/zmienić pole w szablonie, edytuj tablicę `fields` oraz funkcję
`render()` odpowiedniego szablonu (`TPL_PROSTY`, `TPL_DLUGI`,
`TPL_ZAAWANSOWANY`) w pliku `index.html`.
