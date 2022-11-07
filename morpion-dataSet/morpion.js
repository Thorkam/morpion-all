let info = document.getElementById("titre");// getElementById  pour chercher l'ID "titre" dans HTML
document.getElementById("rejouer").style.display = "none";// pareil pour l'ID "rejouer" que l'on ne vaut pas display donc création none
info.textContent = "Super Morpion"; //création texte dans l'objet

window.addEventListener('load', (event) => { //ajout évènement load qui attends que les fichiers html js et css soient chargés
        let getAllCells = Array.from(document.querySelectorAll('td')); //on sélectionne l'ensemble des cellulles
    getAllCells.forEach(cell => { //création boucle
        cell.addEventListener("click", function () { //création évènement click
            jouer(cell.id);
        })
    })
});
document.querySelector("#boutonRejouer").addEventListener("click", function () { // on sélectionne l'ID "boutonRejouer" pour ajouter un évènement click
    document.getElementById("rejouer").style.display = "none"; //sélection "rejouer" qu'on fait disparaître avec le none
    info.textContent = "Super Morpion"; //texte à afficher
    let getAllCells = Array.from(document.querySelectorAll('td')); //on ajoute le tableau
    getAllCells.forEach(cell => { //boucle création avec l'image left et ensuite en auto
        cell.style.backgroundPosition = "left";
        cell.style.pointerEvents = 'auto';
        delete cell.dataset.played;
    })
})
function jouer(zone) { //fonction jouer qui prend en compte "zone"
    let elements = Array.from(document.querySelectorAll('[data-played]'));//création variable elements qui prends en compte le tableau data-played
    let carre = document.getElementById(zone); //Création variable carre qui correspond "à toutes les zones"
    if (elements.length % 2 === 1) { // si elements.lenght / 2 égal 1 alors mets une croix sinon un rond
        carre.style.backgroundPosition = "center";
        carre.dataset.played = "croix";
    } else {
        carre.style.backgroundPosition = "right";
        carre.dataset.played = "rond";
    } 
    carre.style.pointerEvents = 'none'; //pointer désactivé
    if (!checkWin() && Array.from(document.querySelectorAll('[data-played]')).length === 9) { //vérification fonction checkWin si pas ok alors pas de gagnant et on demande de rejouer
        document.getElementById("titre").textContent = "Pas de gagnant";
        document.getElementById("rejouer").style.display = "initial";
    }

}
function checkWin() {//on vérifie que toutes les possibiltés afin de déterminer quelles sont combinaisons gagnante.
    if (
        verifEgalite(document.getElementById("Zonea1").dataset.played, document.getElementById("Zonea2").dataset.played, document.getElementById("Zonea3").dataset.played)
        ||
        verifEgalite(document.getElementById("Zoneb1").dataset.played, document.getElementById("Zoneb2").dataset.played, document.getElementById("Zoneb3").dataset.played)
        ||
        verifEgalite(document.getElementById("Zonec1").dataset.played, document.getElementById("Zonec2").dataset.played, document.getElementById("Zonec3").dataset.played)
        ||
        verifEgalite(document.getElementById("Zonea1").dataset.played, document.getElementById("Zoneb1").dataset.played, document.getElementById("Zonec1").dataset.played)
        ||
        verifEgalite(document.getElementById("Zonea2").dataset.played, document.getElementById("Zoneb2").dataset.played, document.getElementById("Zonec2").dataset.played)
        ||
        verifEgalite(document.getElementById("Zonea3").dataset.played, document.getElementById("Zoneb3").dataset.played, document.getElementById("Zonec3").dataset.played)
        ||
        verifEgalite(document.getElementById("Zonea1").dataset.played, document.getElementById("Zoneb2").dataset.played, document.getElementById("Zonec3").dataset.played)
        ||
        verifEgalite(document.getElementById("Zonea3").dataset.played, document.getElementById("Zoneb2").dataset.played, document.getElementById("Zonec1").dataset.played)
    ) {
        return true;
    } else {
        return false;
    }
}
function verifEgalite(zone1, zone2, zone3) { //vérification égalité pour savoir si le jeu continue à se dérouler
    if (zone1 === zone2 && zone1 === zone3 && zone1 != undefined) {// si les zones sont toutes égales alors il y a un gagnant
        info.textContent = `Les ${zone1} ont gagné`;// les croix ou ronds ont gagané
        document.getElementById("rejouer").style.display = "initial"; //proposition de rejouer
        let getAllCells = Array.from(document.querySelectorAll('td'));
        for (let i = 0; i < getAllCells.length; i++) {
            getAllCells[i].style.pointerEvents = 'none';

        }
        return true;
    } else {
        return false;
    }
}