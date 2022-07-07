/**
 * Pripremio sam vam slijedeću šprancu jer još niste učili fetch.
 * Stoga vas molim nadogradite kod da radi punu funkcionalnost koristeći pripremljenu
 * funkciju prikaziNoveRezultate u koju ćete kao parameter dobiti objekt sa rezultatima
 * nakon što se dohvati(fetch-a) rezultat sa nationalize.io apija.
 *
 * Molim pokušajte i sami exploreati još neke metode DOM-a, te ih primjenjivati.
 * Konkretno mislim na to da osim appendChild, postoje i removeChild i lastElementChild
 * uz pomoć kojih možete izbaciti prethodi rezultat iz prikaza, te onda dodati novi rezultat.
 *
 * Rezultate bi bilo zgodno prikazivati u ul elementu.
 * Bilo bi zgodno i kada biste od stvorili klasu iz koje ćete instancirati objekte s kojih
 * ćete pozivom na određenu metodu izbacivati konkretni html element (Npr. cijeli ul sa svim itemima)
 * za ubacivanje u dom stablo.
 *
 * Ekstra poene biste dobili kada biste sve instancirane objekte iz klase (za svaku novu pretragu po jedan)
 * pospremili dinamički u "Prethodne pretrage:" područje u htmlu, te po uzoru na ove pripremljene dummy botune
 * automatski generirate prave klikom na koje bi se prikazao taj davno prije dohvaćeni rezultat u rezultatima.
 *
 * Ps. tko god napravi molim da link na github repo, te link na github page dijeli u našu whatsup grupu tako da
 * bude od pomoći ili barem nadahnuća kolegama koji se muče sa izradom.
 *
 * S ljubavlju,
 * vaš profesor Antun
 *
 */
 

const ispis = document.querySelector('.ispis');
const prethodni = document.querySelector('.prethodni');
const h3rezultat = document.querySelector('.h3rezultat');
const input = document.querySelector('.form-control');

/* Gotovo sav kod sam prepisao od (autor će se znati prepoznati), ali eto - da ne bude da nikada ne predam zadaću */

document
    .getElementById("botunZaSlanje")
    .addEventListener("click", dohvatiPodatke);

function dohvatiPodatke(event) {
    let unos = event.target.previousElementSibling.value;
    fetch(`https://api.nationalize.io/?name=${unos}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            prikaziNoveRezultate(data);
        });
   //* input.value = '';

    const drzava = new Intl.DisplayNames(["hr"], {
        type: "region",
    });

       function prikaziNoveRezultate(data) {
        if (data.country.length == 0) {
            nemaPodataka();
        }
        else {
            if (data.country[1] == undefined || data.country[2] == undefined) {
                imaParPodataka();
            }
            else {
                imaSvePodatke();
            }
        }


        function nemaPodataka() {
            h3rezultat.innerHTML = `Ne pronalazim ime  ${data.name} u bazi podataka...`;
            ispis.innerHTML = "";
        };


        function imaParPodataka() {

            h3rezultat.innerHTML = `Rezultati pretrage za:  ${data.name} `
            ispis.innerHTML = `
        <ul style="list-style-type:none;">
          <li>
            ${drzava.of(data.country[0].country_id)} 
            ${Math.round(data.country[0].probability * 100)}%
          </li>
        </ul>`;
            prethodni.innerHTML += `<button type="button" class="botunZaPonovit">${data.name}</button> `;
        }


        function imaSvePodatke() {
            h3rezultat.innerHTML = `Rezultati pretrage za:  ${data.name} `
            ispis.innerHTML = `
                            <ul style="list-style-type:none;">    
                                <li>
                                    ${drzava.of(data.country[0].country_id)} 
                                    ${Math.round(data.country[0].probability * 100)}%
                                </li>
                                <li>
                                    ${drzava.of(data.country[1].country_id)}
                                    ${Math.round(data.country[1].probability * 100)}%
                                    </li>
                                <li>
                                    ${drzava.of(data.country[2].country_id)}
                                    ${Math.round(data.country[2].probability * 100)}%
                                </li>
                            </ul>
                            `;
/* Ne znam riješiti poziv trenutne vrijednosti koja se pokazuje kao ime gumba... */
            prethodni.innerHTML += `<button type="button" id="botunZaPonovit">${data.name}</button> `;
            document.getElementById("botunZaPonovit").addEventListener("click", function () {
                  alert ("Sad bi se trebali u polju rezultata ispisati rezultati pretrage za ovo ime, no ne znam kako to riješiti")           ;
            }); 
        }
    }
}

