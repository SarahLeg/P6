const LoginForm = document.getElementById('LoginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

LoginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const user = {
        email:emailInput.value ,
        password:passwordInput.value
    }
    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(user),
    })
    .then((rep) => {
        if(rep.status == 404 || rep.status == 401)
            {
            alert('Identifiants incorrects')
            return
            }
        return rep.json();
    })
    .then((rep) => {
        sessionStorage.setItem("token",rep.token);
        window.location.replace("./index.html");
    })
    .catch ((e) => {
        console.log('Erreur backend')
    })
})