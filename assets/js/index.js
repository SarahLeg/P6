// Récupération et affichage des données back-end

let works = [];
const gallery = document.querySelector('.gallery');

getWorks = () => {
    fetch("http://localhost:5678/api/works")
    .then((rep) => rep.json())
    .then((data) => {
        works = data;
        displayWorks();
    })
}

displayWorks = () => {
    gallery.innerHTML="";
    works.forEach( w => {
        gallery.innerHTML += 
        `
        <figure>
        <img src="${w.imageUrl}" alt="${w.title}">
        <figcaption>${w.title}</figcaption>
        </figure>
        `
    })
}

getWorks();

let categories = [];
const filtresContainer = document.querySelector('.filtres');

getCategory = () => {
    fetch("http://localhost:5678/api/categories")
    .then((rep) => rep.json())
    .then((data) => {
    categories = data;
    displayFiltres();
    })
}

const activeFiltresStyle = (btn) => {
    const activeBtn = document.querySelector(".activeBtn");
    activeBtn.classList.remove('activeBtn');
    btn.classList.add('activeBtn');
}

displayById = (id) => {
    gallery.innerHTML ="";
    works.forEach( w => {
        if(w.categoryId === id || id === 0)
        {
        gallery.innerHTML +=
        `
        <figure>
        <img src="${w.imageUrl}" alt="${w.title}">
        <figcaption>${w.title}</figcaption>
        </figure>
        `
        }
    })
}

displayFiltres = () => {
    const BtnTous = document.createElement('button');
    BtnTous.id = 'BtnTous';
    BtnTous.textContent='Tous';
    BtnTous.classList.add('activeBtn');
    filtresContainer.appendChild(BtnTous);
    BtnTous.addEventListener('click', (event) => {
        displayById(0);
        activeFiltresStyle(event.target);
    })
    categories.forEach( category => {
        const filtre = document.createElement('button');
        filtre.textContent = category.name;
        filtresContainer.appendChild(filtre);
        filtre.addEventListener('click', (event) => {
            displayById(category.id);
            activeFiltresStyle(filtre);
            })
    })
}

getCategory();


// Gestion Affichage Admin / Public

const isLogin = sessionStorage.getItem("token") ? true : false;
LoginBtn = document.getElementById('LoginBtn');

LoginBtn.addEventListener('click', ()=> {
    if(isLogin) {
        sessionStorage.clear();
        window.location.replace('./index.html')
    }
    else
    {
        window.location.replace('./login.html')
    }
})

const editModeBar = document.querySelector('.edit-mode')

if(isLogin){
    filtresContainer.style.display='none';
    LoginBtn.innerHTML ="logout"
    editModeBar.style.display='block';
}
else
{
    LoginBtn.innerHTML ="login"
    modifyBtn.style.display='none';
    editModeBar.style.display='none';
}