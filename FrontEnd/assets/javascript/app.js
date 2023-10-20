//Fonction pour afficher les projets depuis l'API
async function genererProjets () {
const projets = await fetch("http://localhost:5678/api/works").then(projets => projets.json());
const gallery = document.querySelector(".gallery");
    
    projets.forEach((projet) => {
        const figure = document.createElement("figure");
        const imageProjet = document.createElement("img");
        const nomProjet = document.createElement("figcaption");

        imageProjet.src = projet.imageUrl
        nomProjet.innerHTML = projet.title

        figure.appendChild(imageProjet);
        figure.appendChild(nomProjet);
        gallery.appendChild(figure);
    });
};
genererProjets();

//Fonction pour ajouter l'image de projet sur la modale 1
async function genererGalerie () {
    const galerie = await fetch ("http://localhost:5678/api/works").then(galerie => galerie.json());
    const popupImg = document.querySelector(".popup_img");
    
    console.log(galerie);

        galerie.forEach((galerie) => {
           const imagePopup = document.createElement("img");
           const trash = document.createElement("i");

           imagePopup.src = galerie.imageUrl
           trash.classList.add("trash")

           popupImg.appendChild(imagePopup);
           popupImg.appendChild(trash);
        });
};
genererGalerie();

//Filtres les images par catégories 
const btnFiltres1 = document.querySelector(".btnFiltres1")
const btnFiltres2 = document.querySelector(".btnFiltres2")
const btnFiltres3 = document.querySelector(".btnFiltres3")
const btnFiltres4 = document.querySelector(".btnFiltres4")
let id = 

btnFiltres1.addEventListener("click",() => {
    genererProjets();
});

btnFiltres2.addEventListener("click",() => {
    genererProjets(id === 1);
});

btnFiltres3.addEventListener("click",() => {
    genererProjets(id === 2);
});

btnFiltres3.addEventListener("click",() => {
    genererProjets(id === 3);
});