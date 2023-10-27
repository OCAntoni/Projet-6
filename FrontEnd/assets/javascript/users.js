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

//Filtres les images par catégories
const btnFiltres1 = document.querySelector(".btnFiltres1");
const btnFiltres2 = document.querySelector(".btnFiltres2");
const btnFiltres3 = document.querySelector(".btnFiltres3");
const btnFiltres4 = document.querySelector(".btnFiltres4");


btnFiltres1.addEventListener("click",() => {
    btnFiltres1.classList.add("active")
    genererProjets();
});

btnFiltres2.addEventListener("click",() => {
    btnFiltres2.classList.add("active")
    btnFiltres2.element.getAttribute("categoryId");
    genererProjets(categoryId === 1)
});

btnFiltres3.addEventListener("click",() => {
    btnFiltres3.classList.add("active")
    btnFiltres3.element.getAttribute("categoryId");
    genererProjets(categoryId === 2);
});

btnFiltres4.addEventListener("click",() => {
    btnFiltres4.classList.add("active")
    btnFiltres4.element.getAttribute("categoryId");
    genererProjets(categoryId === 3);
});