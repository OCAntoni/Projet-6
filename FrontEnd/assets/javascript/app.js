async function genererProjets () {
const reponse = await fetch("http://localhost:5678/api/works");
const projet = await reponse.json();
console.log(reponse);
console.log(projet);
    
    for (let i = 0; i < projet.lenght;i ++){
        const gallery = document.querySelector(".gallery");
        const projets = projet[i];
        const imageProjet = document.createElement("img");
        const nomProjet = document.createElement("figcaption");

        projets.appendChild(projets)
        projets.appendChild(projet);
        projets.appendChild(imageProjet);
        projets.appendChild(nomProjet);
    };
    genererProjets(projet);
};