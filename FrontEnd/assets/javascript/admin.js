//Fonction pour afficher les projets depuis l'API
async function genererProjets () {
    const projets = await fetch("http://localhost:5678/api/works").then(projets => projets.json());
    const gallery = document.querySelector(".gallery");

    gallery.innerHTML = ''
        
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

const redirectionAjout = document.querySelector(".btn_add_photo")
const redirectionPrecedent = document.querySelector(".retour")

const close1 = document.querySelector(".echap-ajout");
const close2 = document.querySelector(".echap");

//Pour la popup1 popup ajout
lien.addEventListener("click",() => {
    popup1.classList.remove("hidden");
    });

    redirectionPrecedent.addEventListener("click",() => {
        popup2.classList.remove("hidden");
        popup1.classList.add("hidden");
    });

close1.addEventListener("click",() => {
    popup1.classList.add("hidden");
});

//Pour la popup2 popup mofication
lien2.addEventListener("click", () => {
    popup2.classList.remove("hidden");
});

redirectionAjout.addEventListener("click", () => {
    popup1.classList.remove("hidden");
    popup2.classList.add("hidden");
});

close2.addEventListener("click", () => {
    popup2.classList.add("hidden");
});

//Fermeture des modales quand on clique ailleurs 
const body = document.querySelector(".body");
console.log(body);
body.click(function (event) 
{
   if(!$(event.target).closest('#popup-ajout').length && !$(event.target).is('#popup-ajout')) {
   popup1.classList.add("hidden")
   }     
});

//Fonction pour supprimer les images de la popup2
function supprImg (id) {
    fetch ("http://localhost:5678/api/works/" + id, {
        method: "DELETE",
        headers: { Authorization: "Bearer " + localStorage.getItem("token")},
    }) .then (res => res.json)
        .then ((res) => {
            genererGalerie()
            genererProjets()
        });
};

//Fonction pour générer les images depuis l'api sur la popup2
async function genererGalerie () {
    const galerie = await fetch ("http://localhost:5678/api/works").then(galerie => galerie.json());
    const popupImg = document.querySelector(".popup_img");

    popupImg.innerHTML = ''

        galerie.forEach((galerie) => {
            const div = document.createElement("div");
            const imagePopup = document.createElement("img");
            const trash = document.createElement("i");
            trash.setAttribute("data-id", galerie.id)

            imagePopup.src = galerie.imageUrl;
            trash.classList.add("fa-solid", "fa-trash-can","trash");

            //Suppresion photo avec la poubelle
            trash.addEventListener("click",(event) => {
                let id = event.target.getAttribute("data-id")
                supprImg(id)
            console.log("test ok !");
            });

           div.appendChild(imagePopup);
           div.appendChild(trash);
           popupImg.appendChild(div);
        });
};
genererGalerie();

//fonction pour générer les catégories d'ajoiut de la popup1 via l'API
async function genererCategories () {
    const request  = await fetch("http://localhost:5678/api/categories");
    const data = await request.json();
    const selectCategories = document.getElementById("categorie")

    data.forEach((category) =>{
        let option = `<option value="${category.id}">${category.name}</option>`

        selectCategories.innerHTML += option
    });
};
genererCategories();


//changer l'image de base par l'image choisie lors de l'ajout de projet
const bouton3 = document.getElementById("ajouter");
const image = document.getElementById("placeholder")
const here = document.getElementById("here");
const change = document.getElementById("change");
console.log(here);
console.log(change);

bouton3.addEventListener("change",(event) => {
    image.src = URL.createObjectURL(event.target.files[0])
});

bouton3;addEventListener("click",() => {
    here.classList.add("hidden")
    change.classList.remove("hidden")
})

//Fonction ajout photo popup1
async function ajouterProjet () {
    const image = document.getElementById("ajouter");
    const titre = document.getElementById("titre");
    const categorie = document.getElementById("categorie");

    const formData = new FormData();
    formData.append("title", titre.value);
    formData.append("category", categorie.value);
    formData.append("image", image.files[0]);
    console.log(titre.value);
    console.log(image.files[0]);
    console.log(categorie.value);

    try {
        const response = await fetch ("http://localhost:5678/api/works", {
        method: "POST",
        headers: { Authorization: "Bearer " + localStorage.getItem("token")},
        body: formData,
    });
    } catch(error) {
        console.log(error);
    };
};

//Ajout photo popup1
const submit = document.getElementById("submit");

submit.addEventListener("submit",(event) => {
    event.preventDefault();
    ajouterProjet();
});

//Deconnexion du mode admin
const logout = document.getElementById("logout");

logout.addEventListener("click", () => {
    if (localStorage.getItem("token")) {
        localStorage.removeItem("token");
        window.location.href = "/frontend/login.html";
    };
});