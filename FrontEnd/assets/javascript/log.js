const email = document.getElementById("mail");
const mdp = document.getElementById("mot-de-passe");
const connexion = document.querySelector(".connect button");
const errorEmail = document.querySelector(".mail-error");
const errorMdp =document.querySelector(".mdp-error");
console.log(mdp);
console.log(email);
console.log(connexion);
console.log(errorMdp);
console.log(errorEmail);

function verifierMail (id) {
    if (id.email.match([a-zA-z0-9._-]+@[a-z]+\.[a-z]+)){
    return;
    console.log("Test OK");

    } else {
        console.log("Conditions non remplies");
    };
};

connexion.addEventListener("click",() => {
    if (email.value.length <= 1) {
        const p = document.createElement("p");
        p.innerHTML = "Veuillez saisir votre e-mail";
        errorEmail.appendChild(p);
        console.log(p);
    };

    if(mdp.value.length <= 1) {
        const p = document.createElement("p");
        p.innerHTML ="Veuillez saisisr votre mot de passe";
        errorMdp.appendChild(p);
        console.log(p);
    }
});