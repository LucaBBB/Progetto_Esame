"use strict";

// import di readline-sync per inserire input da terminale.
let readlineSync = require('readline-sync');

class Articolo {
    constructor(id, titolo, descrizione, immagine, autore) {
        this.id = id;
        this.titolo = titolo;
        this.descrizione = descrizione;
        this.immagine = immagine;
        this.autore = autore;
    }
}

/**
 * Funzione che mostra il menu.
 */
function printMenu() {
    console.log("\nMENU");
    console.log("1 per inserire un nuovo articolo\n");
    console.log("2 per rimuovere un articolo dato il suo titolo\n");
    console.log("3 per visualizzare tutti gli articoli\n");
}

/**
 * Funzione che restituisce quale sara' l'id del nuovo articolo che verra' inserito.
 * 
 * @param {*} articoli array contenente tutti gli articoli salvati.
 * 
 * @returns l'id del prossimo articolo.
 */
function getID(articoli) {
    return articoli.length+1;
}

/**
 * Funzione che aggiunge un nuovo articolo ai salvati.
 * 
 * @param {*} articoli array contenente tutti gli articoli salvati.
 */
function addArticle(articoli) {
    let titolo = readlineSync.question("Inserire il titolo ... ");
    let descrizione = readlineSync.question("Inserire la descrizione ... ");
    let immagine = readlineSync.question("Inserire l'immagine ... ");
    let autore = readlineSync.question("Inserire l'username dell'autore ... ");
    let nuovoArticolo = new Articolo(getID(articoli), titolo, descrizione, immagine, autore);

    if (!articoli.includes(nuovoArticolo)) {
        articoli.push(nuovoArticolo);
        console.log("Nuovo articolo aggiunto!\n");
    }
    else
        console.log("Articolo gia' presente!\n");
}

/**
 * Funzione che rimuove un articolo dato il suo id.
 * 
 * @param {*} articoli l'articolo da rimuovere.
 */
function removeByTitle(articoli) {
    if (articoli.length === 0)
        console.log("Nessun articolo presente.");
    else {
        let titolo = readlineSync.question("Inserire il titolo ... ");
        let eliminato = false;
        for (let i=0; i<articoli.length; i++) {
            if (articoli[i].titolo === titolo) {
                articoli.splice(i, 1);
                eliminato = true;
                break;
            }
        }
        if (eliminato)
            console.log("Articolo eliminato!\n");
        else
            console.log("Articolo non trovato!\n");
    }
}

/**
 * Funzione che stampa le informazioni di tutti gli articoli salvati.
 * 
 * @param {*} articoli l'array contenente tutti gli articoli.
 */
function printAllArticles(articoli) {
    if (articoli.length === 0)
        console.log("Nessun articolo presente!\n");
    else {
        console.log("\nLista articoli");
        for (const a of articoli) {
            console.log(a);
        }
        console.log("\nFine lista");
    }
}

// MAIN
if (require.main === module) {
    const articoli = [];

    const menu = setInterval(()=> {
    printMenu();
    let choice = readlineSync.question("Inserisci la tua scelta... ");

        switch(choice.trim()) {

            case "1":
                addArticle(articoli);
                break;

            case "2":
                removeByTitle(articoli);
                break;

            case "3":
                printAllArticles(articoli);
                break;

            default:
                clearInterval(menu);
        }
    }, 500);
}