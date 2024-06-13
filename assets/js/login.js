//on prevent le chargement de la page qui est le comportement normal de submit (je ne sais pas pourquoi)
const LoginForm = document.getElementById('LoginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

LoginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const user = {
        email:emailInput.value ,
        password:passwordInput.value
    }
    //console.log('user')
})

fetch("https://localhost:5678/api/users/login", {
    method: "POST",
    header: { "Content-Type": "aaplication/json"},
    body: JSON.stringify(user),
})
    .then((responses) => responses.json())
    .then((rep) => {
        console.log(rep)
    })

//si tu mets le bon email et password tu as le token en console