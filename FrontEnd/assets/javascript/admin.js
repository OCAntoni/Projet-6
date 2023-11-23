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

//annulation des autres evenement au click par defaut
popup1.addEventListener("click",(e) => {
    e.stopPropagation();
});

popup2.addEventListener("click",(e) => {
    e.stopPropagation();
});

//Pour la popup1 popup ajout
lien.addEventListener("click",() => {
    popup1.classList.remove("hidden");
    popup2.classList.add("hidden");
    });

    redirectionPrecedent.addEventListener("click",() => {
        popup2.classList.remove("hidden");
        popup1.classList.add("hidden");
    });

close1.addEventListener("click",() => {
    popup1.classList.add("hidden");
});

//Pour la popup2 popup modfier
lien2.addEventListener("click", () => {
    popup2.classList.remove("hidden");
    popup1.classList.add("hidden");
});

redirectionAjout.addEventListener("click", () => {
    popup1.classList.remove("hidden");
    popup2.classList.add("hidden");
});

close2.addEventListener("click", () => {
    popup2.classList.add("hidden");
});

//Fermeture des popup quand on clique ailleurs 
document.addEventListener("click", (e) => {
    if (!popup1.classList.contains("hidden") && e.target != lien) {
        popup1.classList.add("hidden");
    };
});

document.addEventListener("click", (e) => {
    if (!popup2.classList.contains("hidden") && e.target != lien2) {
        popup2.classList.add("hidden");
    };
});

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
            });

           div.appendChild(imagePopup);
           div.appendChild(trash);
           popupImg.appendChild(div);
        });
};
genererGalerie();


//Fonction pour supprimer les images de la popup2
function supprImg (id) {
    const reponse = fetch ("http://localhost:5678/api/works/" + id, {
        method: "DELETE",
        headers: { Authorization: "Bearer " + localStorage.getItem("token")},
    }) .then (res => res.json)
        .then ((res) => {
            genererGalerie()
            genererProjets()
        });
};


//fonction pour générer les catégories d'ajout de la popup1 via l'API
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


//popup1, changer l'image de base par l'image choisie lors de l'ajout de projet
const bouton3 = document.getElementById("ajouter");
const image = document.getElementById("placeholder");
const champ2 = document.getElementById("titre");
const champ3 = document.getElementById("categorie");
const btnAjout = document.querySelector(".btn-ajout");
const supr = document.getElementById("supr");
const supr2 =document.getElementById("supr2");

bouton3.addEventListener("change",(event) => {
    verifierChamps()
    image.src = URL.createObjectURL(event.target.files[0])
    image.style.width = "130px"
    image.style.height = "100%";
    supr.classList.add("hidden");
    supr2.classList.add("hidden");
});

champ2.addEventListener("change",verifierChamps);

champ3.addEventListener("change",verifierChamps);

// fonction pour verifier si champ remplie afin d'ajouter la classe css sur boutton d'envoi
function verifierChamps () {
    console.log(bouton3.value);
    console.log(champ2.value);
    console.log(champ3.value);
    if (bouton3.value != "" && champ2.value != "" && champ3.value != "") {
        btnAjout.classList.add("active")
    } else {
        btnAjout.classList.remove("active")
    }
};
verifierChamps();

//Fonction ajout projet popup1
async function ajouterProjet (event) {
    event.preventDefault();

    const imageInput = document.getElementById("ajouter");
    const titre = document.getElementById("titre");
    const categorie = document.getElementById("categorie");
    
    const formData = new FormData();
    formData.append("title", titre.value);
    formData.append("category", categorie.value);
    formData.append("image", imageInput.files[0]);

    try {
        const response = await fetch ("http://localhost:5678/api/works", {
        method: "POST",
        headers: { Authorization: "Bearer " + localStorage.getItem("token")},
        body: formData,
    });

    if(response.status === 201) {
        popup1.classList.add("hidden");
        alert("Félicitations, votre projet à été correctement ajouté !");
        genererProjets();
        genererGalerie();
        titre.value="";
        categorie.value="";
        image.src = "./assets/icons/picture-svgrepo-com1.svg";
        image.style.removeProperty("height");
        image.style.removeProperty("width");
        supr.classList.remove("hidden");
        supr2.classList.remove("hidden");
    } else {
        alert("Veuillez remplir tous les champs !")
    };
    
    } catch(error) {
        console.log(error);
    };
};

//supprimer le rechargement de la page lors de l'ajout de nouveau projet
const submit = document.getElementById("submit");

submit.addEventListener("submit",(event) => {
    event.preventDefault();
    ajouterProjet(event);
});

//Deconnexion du mode admin
const logout = document.getElementById("logout");

logout.addEventListener("click", () => {
    if (localStorage.getItem("token")) {
        localStorage.removeItem("token");
        window.location.href = "login.html";
    };
});