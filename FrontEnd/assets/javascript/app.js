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
    console.log(popupImg);
    console.log(galerie);

        galerie.forEach((galerie) => {
           const div = document.querySelector(".img2")
           const imagePopup = document.createElement("img");
           const trash = document.createElement("i");

           imagePopup.src = galerie.iamageUrl

           div.appendChild(imagePopup);
           imagePopup.appendChild(trash);
           popupImg.appendChild(div);
        });
};
genererGalerie();