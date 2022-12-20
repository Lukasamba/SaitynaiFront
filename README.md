# Kino teatro administravimo sistema

## Išorinės pusės kodo repozitorija.<br>

Projekto tikslas – sukurti kino teatro valdymo sistemą, kuri leistu pridėti naujus kino teatro padalinius, padaliniams pridėti filmams žiūrėti sales ir salėms pridėti žiūrėjimui filmus.<br>

Svetainės adresas: https://neon-horse-61e298.netlify.app<br>

## Sistemos pagrindinės funkcijos:

Neregistruotas sistemos naudotojas galės:<br>
1.	Peržiūrėti rodomų filmų sąrašą;<br>
2.	Užsiregistruoti prie internetinės aplikacijos.<br>

Registruotas sistemos vartotojas galės:<br>
1.	Prisijungti prie internetinės aplikacijos;<br>
2.	Atsijungti nuo internetinės aplikacijos;<br>
3.	Užsiregistruoti peržiūrai į filmą;<br>
4.	Peržiūrėti sąrašą filmų, į kuriuos yra peržiūrėti užsiregistravęs.<br>

Administratorius galės:<br>
1.	Valdyti padalinius:<br>
      1.1.	Pridėti padalinį;<br>
      1.2.	Peržiūrėti padalinio informacija;<br>
      1.3.	Redaguoti padalinį;<br>
      1.4.	Pašalinti padalinį.<br>
2.	Valdyti sales:<br>
      2.1.	Pridėti salę;<br>
      2.2.	Peržiūrėti salės informacija;<br>
      2.3.	Redaguoti salę;<br>
      2.4.	Pašalinti salę.<br>
3.	Valdyti filmus:<br>
      3.1.	Pridėti filmą;<br>
      3.2.	Peržiūrėti filmo informacija;<br>
      3.3.	Redaguoti filmą;<br>
      3.4.	Pašalinti filmą.<br>

## Sistemos architektūra:<br>
![](/photos/diagram.png)

## Naudotojo sąsaja:<br>

Pagrindinis puslapis:<br>
![](/photos/main_page.png)

Prisijungimo puslapis:<br>
![](/photos/login.png)

Registracijos puslapis:<br>
![](/photos/register.png)

Filmų sąrašo puslapis:<br>
![](/photos/movies_page.png)

Filmų modalo pavyzdys:<br>
![](/photos/movies_modal_example.png)

Rezervacijų sąrašo puslapis:<br>
![](/photos/reservations_page.png)

Salių sąrašo puslapis:<br>
![](/photos/halls_page.png)

Salių modalo pavyzdys:<br>
![](/photos/halls_modal_example.png)

Padalinių sąrašo puslapis:<br>
![](/photos/divisions_page.png)

Padalinių modalo pavyzdys:<br>
![](/photos/divisions_modal_example.png)

## API specifikacija:<br>

## Autorizacija<br>

### Register<br>
Tipas: POST<br>
Parametrai: name*, email*, password*, password_confirmation*<br>
Atsakymai: sėkmė 200, klaida 422<br>

### Login<br>
Tipas: POST<br>
Parametrai: email*, password*<br>
Atsakymai (kodas): sėkmė 200, klaida 422<br>

### Logout<br>
Tipas: POST<br>
Parametrai: -<br>
Atsakymai (kodas): sėkmė 200, klaida 401<br>

## Padaliniai<br>

### List<br>
Tipas: GET<br>
Parametrai: -<br>
Atsakymai: sėkmė 200<br>

### Create<br>
Tipas: POST<br>
Parametrai: address*, halls_count*<br>
Atsakymai (kodas): sėkmė 200, klaida 422<br>

### Read<br>
Tipas: GET<br>
Parametrai: -<br>
Atsakymai (kodas): sėkmė 200, klaida 422<br>

### Update<br>
Tipas: PUT<br>
Parametrai: address*, halls_count*<br>
Atsakymai (kodas): sėkmė 200, klaida 422<br>

### Delete<br>
Tipas: DELETE<br>
Parametrai: -<br>
Atsakymai (kodas): sėkmė 200, klaida 422<br>

## Salės<br>

### List<br>
Tipas: GET<br>
Parametrai: -<br>
Atsakymai: sėkmė 200<br>

### Create<br>
Tipas: POST<br>
Parametrai: division_id*, name*, seats_count*<br>
Atsakymai (kodas): sėkmė 200, klaida 422<br>

### Read<br>
Tipas: GET<br>
Parametrai: -<br>
Atsakymai (kodas): sėkmė 200, klaida 422<br>

### Update<br>
Tipas: PUT<br>
Parametrai: division_id*, name*, seats_count*<br>
Atsakymai (kodas): sėkmė 200, klaida 422<br>

### Delete<br>
Tipas: DELETE<br>
Parametrai: -<br>
Atsakymai (kodas): sėkmė 200, klaida 422<br>

## Filmai<br>

### List<br>
Tipas: GET<br>
Parametrai: -<br>
Atsakymai: sėkmė 200<br>

### Create<br>
Tipas: POST<br>
Parametrai: name*, genre*, length*, image_url*<br>
Atsakymai (kodas): sėkmė 200, klaida 422<br>

### Read<br>
Tipas: GET<br>
Parametrai: -<br>
Atsakymai (kodas): sėkmė 200, klaida 422<br>

### Update<br>
Tipas: PUT<br>
Parametrai: name*, genre*, length*, image_url*<br>
Atsakymai (kodas): sėkmė 200, klaida 422<br>

### Delete<br>
Tipas: DELETE<br>
Parametrai: -<br>
Atsakymai (kodas): sėkmė 200, klaida 422<br>

## Išvados:<br>
Pavyko realizuoti išorinėje pusėje visas serverio užklausas.<br> 
Sistema buvo ištestuota, suprogramuoti 42 testai aprėpiantys visas serverio užklausas.<br>
Taip pat kuriant projektą, buvo naudojama statinė kodo analizė PHPStan, dėl ko buvo stengiamasi išlaikyti švarų, kuo lengviau suprantantį kodą.<br>

Darbą atliko:<br>
Lukas Velička IFF-9/3
