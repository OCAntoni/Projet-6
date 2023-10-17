async function genererProjets () {
const projet = await fetch("http://localhost:5678/api/works").then(projet => projet.json());
console.log(projet);
    
    for (let i = 0; i < projet.lenght; i ++){
        const gallery = document.querySelector(".gallery").innerHTML = "";
        const projets = projet[i];
        const test = document.createElement("figure");
        const imageProjet = document.createElement("img");
        const nomProjet = document.createElement("figcaption").innerHTML = "";

        gallery.appendChild(test);
        test.appendChild(projets);
        test.appendChild(imageProjet);
        test.appendChild(nomProjet);
    };
};

genererProjets();