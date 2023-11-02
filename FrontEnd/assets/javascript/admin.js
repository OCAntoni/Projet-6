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

//Ouverture et fermeture des 2x popup 
const lien = document.getElementById("popup-ajout-open");
const lien2 = document.getElementById("popup-open");

const popup1 = document.querySelector(".popup-ajout");
const popup2 = document.querySelector(".popup");

const close1 = document.querySelector(".echap-ajout");
const close2 = document.querySelector(".echap");

//Pour la popup1 popup ajout
lien.addEventListener("click",() => {
    popup1.classList.remove("hidden");
    });

close1.addEventListener("click",() => {
    popup1.classList.add("hidden");
});

//Pour la popup2 popup mofication
lien2.addEventListener("click", () => {
    popup2.classList.remove("hidden");
});

close2.addEventListener("click", () => {
    popup2.classList.add("hidden");
});

//Fonction pour supprimer les images de la popup2
function supprImg () {
    fetch ("http://localhost:5678/api/works", {
        method: "DELETE",
        headers: { Authorization:"token"},
    }) .then (res => res.json)
        .then (res => console.log(res));
};

//Fonction pour générer les images depuis l'api sur la popup2
async function genererGalerie () {
    const galerie = await fetch ("http://localhost:5678/api/works").then(galerie => galerie.json());
    const popupImg = document.querySelector(".popup_img");
    
    console.log(galerie);

        galerie.forEach((galerie) => {
            const div = document.createElement("div");
            const imagePopup = document.createElement("img");
            const trash = document.createElement("i");

            imagePopup.src = galerie.imageUrl;
            trash.classList.add("fa-solid", "fa-trash-can","trash");

            //Suppresion photo avec la poubelle
            trash.addEventListener("click",()=>{
                supprImg()
            console.log("test ok !");
            });

           div.appendChild(imagePopup);
           div.appendChild(trash);
           popupImg.appendChild(div);
        });
};
genererGalerie();

//Fonction ajout photo popup2
// A SUIVRE !!


//Ajout photo popup2
const btnAjout = document.querySelector(".btn_add_photo");
console.log(btnAjout);

btnAjout.addEventListener("click",() => {
    console.log("test ok !");
});