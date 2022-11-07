let nombreCoup;                                 //création et nom de la variable
let emplacement;                                //création et nom de la variable
let gagnant;                                    //création et nom de la variable
let table = document.getElementById("center");  // on nomme une variable qui est égale à "document.getElementById("center");"
let cells = table.getElementsByTagName("td");   // on nomme une variable "cells" qui va systématiquement englober et sélectionner les "td" du html

window.addEventListener('load', (event) => {    //permet d'ajouter un élément uniquement lorsque le html, css et js sont chargés
    initialisation();                           //fonction créée 
});

function initialisation() {   // On appelle la fonction
    document.getElementById("rejouer").style.display = "none"; // on cible la div html avec l'ID=rejouer et on ne l'affiche pas
    document.getElementById("titre").textContent = "Super Morpion"; // la div id titre devient dynamique et on peut modifier le texte. Là on met le même.
     nombreCoup = 0; //création de variable initialisée à zéro
     emplacement = { //création d'un tableau objet qui comprend l'ensemble des éléments du morpion
        Zonea1: "vide",
        Zonea2: "vide",
        Zonea3: "vide",
        Zoneb1: "vide",
        Zoneb2: "vide",
        Zoneb3: "vide",
        Zonec1: "vide",
        Zonec2: "vide",
        Zonec3: "vide"
    };
    for (let i = 0; i < cells.length; i++) { //création d'une boucle
        let cell = cells[i]; //cells [i] pour englober l'ensemble des cases td 
        cell.style.backgroundPosition = "left"; //on positionne l'affichage en fond sur la gauche
        cell.style.pointerEvents = 'auto'; //permet de contrôler les circonstances dans lesquelles un élément graphique peut être une cible, c'est-à-dire recevoir des évènements de la souris.
    }
}

function jouer(zone) { //creation d'une fonction "jouer"
    if (nombreCoup % 2 === 1) {// si nombre de coup divisé par 2 est égal à 1 alors c'est une croix sinon c'est un rond
        document.getElementById(zone).style.backgroundPosition = "center"; //on cible l'ensemble des td (table)
        emplacement[zone] = "croix";
    } else {
        document.getElementById(zone).style.backgroundPosition = "right";
        emplacement[zone] = "rond";
    }
    document.getElementById(zone).style.pointerEvents = 'none';
    nombreCoup++;
    checkWin(); 

    if (nombreCoup === 9 && typeof gagnant === 'undefined') {
        document.getElementById("titre").textContent = "Pas de gagnant";
        document.getElementById("rejouer").style.display = "initial";
    }
}

function checkWin() {
    if (verifEgalite(emplacement["Zonea1"], emplacement["Zonea2"], emplacement["Zonea3"]) || verifEgalite(emplacement["Zoneb1"], emplacement["Zoneb2"], emplacement["Zoneb3"]) || verifEgalite(emplacement["Zonec1"], emplacement["Zonec2"], emplacement["Zonec3"]) || verifEgalite(emplacement["Zonea1"], emplacement["Zoneb1"], emplacement["Zonec1"]) || verifEgalite(emplacement["Zonea2"], emplacement["Zoneb2"], emplacement["Zonec2"]) || verifEgalite(emplacement["Zonea3"], emplacement["Zoneb3"], emplacement["Zonec3"]) || verifEgalite(emplacement["Zonea1"], emplacement["Zoneb2"], emplacement["Zonec3"]) || verifEgalite(emplacement["Zonea3"], emplacement["Zoneb2"], emplacement["Zonec1"])) {
        if (gagnant === 'croix') {
            document.getElementById("titre").textContent = "Les croix ont gagné";
        } else {
            document.getElementById("titre").textContent = "Les ronds ont gagné";
        }
        document.getElementById("rejouer").style.display = "initial";
        for (let i = 0; i < cells.length; i++) {
            cells[i].style.pointerEvents = 'none';
        }
    }
}

function verifEgalite(zone1, zone2, zone3) {
    if (zone1 === zone2 && zone1 === zone3 && zone1 !== 'vide') {
        gagnant = zone1;
        return true;
    } else {
        return false;
    }
}