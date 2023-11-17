const email = document.getElementById("mail");
const mdp = document.getElementById("mdp");
const connexion = document.querySelector(".connect button");
const errorEmail = document.querySelector(".mail-error");
const errorMdp =document.querySelector(".mdp-error");

//Fonction pour définir "syntaxe" email correct 
function verifierMail (email) {
    if (email.match(/[a-zA-z0-9._-]+@[a-z]+\.[a-z]+/)) {
    return true;

    } else {
        return false;
    };
};

//puis connexion vers la page admin avec les messages erreurs
connexion.addEventListener("click",() => {
    if (!verifierMail(email.value)) {
        const errorMail = document.querySelector(".mail-error")
        errorEmail.innerHTML = "Veuillez saisir votre e-mail";
        console.log(errorMail);
    } else {
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
            
                if (data.token) {
                localStorage.setItem('token', data.token)
                window.location.href = "admin.html";
                } else {
                    alert("Votre email ou votre mot de passe est incorrect !")
                }
            })
    };
});