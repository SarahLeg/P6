//on prevent le chargement de la page qui est le comportement normal de submit (je ne sais pas pourquoi)
const LoginForm = document.getElementById('LoginForm');
//il va chercher les id qui sont dans le html
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

//écouter submit
LoginForm.addEventListener('submit', (event) => {
    //on veut pas que la page se recharge à chaque fois qu'on listen, on va le faire manuelle en js
    event.preventDefault();
    const user = {
        email:emailInput.value ,
        password:passwordInput.value
    }
    //console.log(user)
    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        //json stringify transforme le language js en format texte pour que le backend comprenne (???)
        body: JSON.stringify(user),
    })
    //retranscrire en language que js comprends
        .then((response) => response.json())
        .then((rep) => {
            console.log(rep);
            //stockage de session (qui détruit à la recharge) on peut le voir dans le inspecter->appli
            sessionStorage.setItem("token",rep.token);
            window.location.replace("./index.html");
        });
    //si tu mets le bon email et password tu as le token en console (c'est ce que le backend demande)
})

