MongoDB-query-optimization-Airbnb-Madrid

Projekat: Projektovanje i realizovanje NoSQL šeme baze podataka, kreiranje i optimizacija upita

Tema: Analiza, kreiranje i optimizacija upita za bazu podataka Airbnb Madrid

Predmet: Sistemi baza podataka

Semestar: 8. semestar

Datum realizacije projekta: 15.06.2024.

Autori: Miloš Sirar IN 3/2020 i Ana Parović IN 17/2020

Korišćeno:
1. Python
2. MongoDB
3. Metabase

Projekat se sastoji iz nekoliko celina:
1. Predlog projekta
	- prezentacija gde je prikazano zašto je odabrana tema Airbnb Madrid. Predstavljena je baza podataka od 7 csv fajlova, objašnjena su njihova obeležja, kao i međusobna povezanost datoteka. Prikazana je okvirna logička šema baze podataka. Na kraju je dato po 5 predloga upita za oba autora.
2. Analiza baze podataka i obležja, kreiranje baze podataka
	- ovde je korišćen programski jezik Python. Analizirani su podaci iz csv fajlova i na osnovu toga je odabrano koji fajlovi i obeležja će biti relevantni za nastavak projekta. Na kraju, ovako kreirane csv datoteke su ubačene u MongoDB bazu podataka pomoću odgovarajuće funkcije.
3. MongoDB - kreiranje osnovnih upita
	- u MongoDB je kreirano onih 5 upiti od strane oba autora. Za svaki upit je dat kod koji ga izvršava, vreme izvršavanja upita
4. Optimizacija upita u MongoDB
	- Nakon kreiranja upita, različitim analizama i pokušajima došlo se do optimalnih upita, odnosno upita koji daju najbrže vreme izvršavanja. Ovo je urađeno pomoću kreiranja odgovarajućih indeksa i reorganizacije koda potrebnog za izvršavanje upita. Takođe, korišćeni su i šabloni koji su doprineli optimizaciji: Šablon podskupa, Šablon proširene reference i Šablon proračunavanja
5. Explain plan
	- Pomoću explain plan se moglo tačno videti gde se najviše vremena troši tokom izvršavanja upita, i zatim na tom delu upita pokušavati pronaći bolje načine za izvršavanje.
6. Metabase
	- Pomoću Metabase alata na kraju je na elegantan i reprezentativan način prikazao svaki od upita, tako da osobi kojoj se prezentuje ovaj problem olakša shvatanje istog.


Detaljnije informacije o svakoj celini i koraku, kao i o rezultatima nalaze se u okviru repozitorijuma.

Pregled prezentacije i izveštaja daje celokupnu sliku o projektu.

Za detaljniji opis i uvid u realizaciju projekta, možete pogledati u foldere u okviru ovog repozitorijuma:

1. Folder explain_plan - sadrži explain_plan za svaki upit pre i posle optimizacija
2. Folder grafikon_za_vreme_izvršavanja_upita - sadrži uporedna vremena izvršavanja upita pre i posle optimizacija
3. Folder metabase - sadrži sačuvane prikaze iz Metabase-a za svaki od upita
4. Folder prezentacije - sadrži dve prezentacije - sa predlogom projekta i sa završenim projektom
5. Folder skripte - sadrži Python skripte korišćene za analizu i kreiranje baze podataka
6. Folder upiti_i_indeksi - sadrže sve upite pre i posle optimizacija, kao i indekse koji su korišćeni prilikom optimizacije