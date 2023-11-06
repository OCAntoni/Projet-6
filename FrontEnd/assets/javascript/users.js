//Fonction pour afficher les projets depuis l'API
async function genererProjets (categoryId = null) {
let projets = await fetch("http://localhost:5678/api/works").then(projets => projets.json());
const gallery = document.querySelector(".gallery");
gallery.innerHTML = ''

    if (categoryId) {
        projets = projets.filter((project) => {
            return project.categoryId == categoryId
        })
    }
    
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


//Fonction pour generer les filtres en utilisant l'API
async function genererCategories() {
    const categories = await fetch ("http://localhost:5678/api/categories").then(categories => categories.json());
    const filtres = document.querySelector(".filtres");

    categories.forEach((category) => {
        let button = `<button class="btn-categories" data-id="${category.id}">${category.name}</button>`
        filtres.innerHTML += button;
    });
};

// Puis on ajoute la classe css au bouton actif + on filtres les projets selons leurs Id
genererCategories().then(() => {
    const buttons = document.querySelectorAll(".btn-categories")
    console.log(buttons)

    buttons.forEach((button) => {
        button.addEventListener("click", (event) => {
          buttons.forEach((button) => {
            //suppression de la classe sur tout les bouttons au click
            button.classList.remove("active");
          });
          //puis ajout de la classe uniquement sur le boutton cliquer
          button.classList.add("active")
            let categoryId = event.target.getAttribute("data-id")
            genererProjets(categoryId);
        });
    });
});