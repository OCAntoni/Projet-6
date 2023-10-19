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

//Fonction pour définir conditions d'accés 
function verifierMail (email) {
    if (email.match(/[a-zA-z0-9._-]+@[a-z]+\.[a-z]+/)) {
    console.log("Test OK");
    return true;

    } else {
        console.log("Conditions non remplies");
        return false;
    };
};

connexion.addEventListener("click",() => {
    if (!verifierMail(email.value)) {
        const errorMail = document.querySelector(".mail-error")
        errorEmail.innerHTML = "Veuillez saisir votre e-mail";
        console.log(errorMail);
    }

    else {
        fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: {"content-type": "application/json; charset=UTF-8"},
            body: JSON.stringify({
                email: email.value,
                password: mdp.value
            })
        }) .then(res => res.json())
            .then(data => {
                console.log(data)
                localStorage.setItem('token', data.token)
                window.location.href = "/frontend/admin.html"
            })
    };
});