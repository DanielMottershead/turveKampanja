setTimeout(function () {
    document.getElementById('text').classList.remove('hide');
}, 2000);



setTimeout(function () {
    document.getElementById('header').classList.remove('hide');
}, 2000);

function click() {
    document.getElementById('navi1').classList.remove('hide2');
}

window.onload = function () {
    if (sessionStorage.getItem("ladattava") === null) {
        sessionStorage.setItem("simba", "")


    } else {
        var objektit = JSON.parse(sessionStorage.getItem("ladattava"))
        sessionStorage.clear();



        console.log(ladattava)
        var string = JSON.stringify(objektit)
        var pull = JSON.parse(string)
        console.log(pull[0])

        for (k = 0; k < pull.length; k++) {
            luotapahtuma(pull[k].luoja, pull[k].pvm, pull[k].aika, pull[k].paikka, pull[k].osallistujat, pull[k].kommentit, pull[k].likes);

        }
    }
}

class Tapahtumat {
    constructor(luoja, pvm, aika, paikka, osallistujat, kommentit, likes, id) {
        this.luoja = luoja;
        this.pvm = pvm;
        this.aika = aika;
        this.paikka = paikka;
        this.osallistujat = osallistujat;
        this.kommentit = kommentit;
        this.likes = likes;
        this.id = id;
    }
    lisaakommentti(uusikommentti) {
        this.kommentit.push(uusikommentti);
    }
}

class Palvelu {
    constructor() {
        this.tapahtumalista = [];
    }
    lisaatapahtuma(uusitapahtuma) {
        this.tapahtumalista.push(uusitapahtuma)
    }
}

var ladattava = []

minunpalvelu = new Palvelu







function luotapahtuma(luoja, pvm, aika, paikka, osallistujat, kommentit, likes) {
    if (luoja == "" || pvm == "" || aika == "" || paikka == "") {
        alert("Täytä pakolliset kentät")
    } else {
        var tapahtuma = new Tapahtumat(luoja, pvm, aika, paikka, osallistujat, kommentit, likes, minunpalvelu.tapahtumalista.length);
        minunpalvelu.lisaatapahtuma(tapahtuma);

        var jiisoni = {
            luoja: tapahtuma.luoja,
            pvm: tapahtuma.pvm,
            aika: tapahtuma.aika,
            paikka: tapahtuma.paikka,
            osallistujat: tapahtuma.osallistujat,
            kommentit: tapahtuma.kommentit,
            likes: tapahtuma.likes,
            id: tapahtuma.id
        }

        ladattava[ladattava.length] = jiisoni
        sessionStorage.setItem("ladattava", JSON.stringify(ladattava))

        var fiidi = document.getElementById("feed");
        var kommenttitila = document.createElement("P");
        var teksti = document.createElement("P");
        fiidi.appendChild(teksti);
        fiidi.appendChild(kommenttitila);
        teksti.className = "teksti";
        kommenttitila.className = "tnappi";

        var tykkaykset = document.createElement("A");
        var btn = document.createElement("BUTTON");
        btn.innerHTML = "LIKE";
        btn.id = tapahtuma.id
        var maara = tapahtuma.likes;
        teksti.innerHTML += " " + tapahtuma.luoja + " loi tapahtuman <br>Milloin? " + tapahtuma.pvm + " kello " + tapahtuma.aika + "<br> Paikassa " + tapahtuma.paikka + "<br> <br>";
        btn.onclick = function () { diggaa(tapahtuma, btn, tykkaykset) }
        tykkaykset.innerHTML = maara;
        teksti.appendChild(btn);
        teksti.appendChild(tykkaykset)


        var menijat = document.createElement("A");
        var osallistubtn = document.createElement("BUTTON");
        osallistubtn.innerHTML = "OSALLISTUJAT";
        osallistubtn.id = tapahtuma.id;
        var mani = tapahtuma.osallistujat;
        menijat.innerHTML = tapahtuma.osallistujat
        osallistubtn.onclick = function () { osallistu(tapahtuma, osallistubtn, menijat) }
        teksti.appendChild(osallistubtn)
        teksti.appendChild(menijat)
        teksti.style.color = "black";
        teksti.style.font = 'Adamina';




        var kommenttikentta = document.createElement("INPUT");
        var nimimerkki = document.createElement("INPUT");
        var kommentteja = document.createElement("P");
        var kommenttibtn = document.createElement("BUTTON");
        kommentteja.innerHTML = tapahtuma.kommentit
        kommenttibtn.innerHTML = "KOMMENTOI"
        kommenttibtn.id = tapahtuma.id
        kommenttikentta.placeholder = "Kommentti"
        nimimerkki.placeholder = "Nimimerkki"
        kommenttibtn.onclick = function () { kommentoi(tapahtuma, kommenttikentta, kommenttibtn, kommentteja, nimimerkki) }
        kommenttitila.appendChild(kommentteja)
        kommenttitila.appendChild(kommenttikentta);
        kommenttitila.appendChild(nimimerkki)
        kommenttitila.appendChild(kommenttibtn)




    }
    //document.getElementById('tapahtumat').innerHTML = document.getElementById('tapahtumat').innerHTML + "<p id = \"tapahtuma.tunnus\">" + tapahtuma.luoja + " " + tapahtuma.aika + " " + "tykkäykset:" + tapahtuma.likes + "<button id = \"tapahtuma.tunnus\" type=\"button\" name=\"button\" value = \"k\" onclick = \"diggaa()\">LIKE</button>" + "</p>"
}

function diggaa(tapahtuma, btn, tykkaykset) {
    ladattava[btn.id].likes += 1;
    sessionStorage.setItem("ladattava", JSON.stringify(ladattava));
    tapahtuma.likes += 1;
    tykkaykset.innerHTML = tapahtuma.likes;

}
function osallistu(tapahtuma, osallistubtn, menijat) {
    ladattava[osallistubtn.id].osallistujat += 1;
    sessionStorage.setItem("ladattava", JSON.stringify(ladattava));
    tapahtuma.osallistujat += 1;
    menijat.innerHTML = tapahtuma.osallistujat + "<br>";

}
function kommentoi(tapahtuma, kommenttikentta, kommenttibtn, kommentteja, nimimerkki) {
    if (kommenttikentta.value == "" || nimimerkki.value == "") {
        alert("Täytä kommenttikentät")
    } else {
        ladattava[kommenttibtn.id].kommentit = kommentteja.innerHTML + kommenttikentta.value + " -" + nimimerkki.value + "<br>"
        sessionStorage.setItem("ladattava", JSON.stringify(ladattava));
        kommentteja.innerHTML = kommentteja.innerHTML + kommenttikentta.value + " -" + nimimerkki.value + "<br> <br>"
        console.log(ladattava[kommenttibtn.id].kommentit)
    }
}
