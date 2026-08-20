# Licencje słownika i biblioteki sprawdzania pisowni

## Słownik polski (`pl_PL.aff`, `pl_PL.dic`)

Pochodzi z projektu [LibreOffice dictionaries](https://github.com/LibreOffice/dictionaries)
(słownik sjp.pl, opiekun: Marek Futrega). Licencjonowany łącznie na:
GPL, LGPL, MPL (Mozilla Public License), Apache 2.0 oraz Creative Commons
ShareAlike. Źródło: http://www.sjp.pl/slownik/en/

Pliki oryginalnie w kodowaniu ISO-8859-2 — przekonwertowane na UTF-8
(łącznie ze zaktualizowaniem deklaracji `SET` w pliku `.aff`), żeby
poprawnie działały z `fetch().text()` w przeglądarce.

## Biblioteka `lib/typo.js`

[Typo.js](https://github.com/cfinke/Typo.js) autorstwa Christophera Finke,
licencja BSD (3-clause), Copyright (c) 2011, Christopher Finke. Pełny tekst
licencji: https://github.com/cfinke/Typo.js/blob/master/license.txt
