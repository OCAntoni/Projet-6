const email = document.getElementById("mail");
const mdp = document.getElementById("mot-de-passe");
const connexion = document.querySelector(".connect button");
const errorEmail = document.querySelector(".mail-error");
const errorMdp =document.querySelector(".mdp-error");

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

function verifierMdp (mdp) {
    if (mdp !== mdp.value) {
        errorMdp.innerHTML = "Votre mot de passe n'est pas valide";
        return false;
    } else {
        return true;
    };
};

connexion.addEventListener("click",() => {
    if (!verifierMail(email.value)) {
        const errorMail = document.querySelector(".mail-error")
        errorEmail.innerHTML = "Veuillez saisir votre e-mail";
        console.log(errorMail);
    }

    if (verifierMdp()) {
        
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