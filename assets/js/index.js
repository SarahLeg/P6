//VERSION DU PROJET AVEC NOTES (format cours)


//en théorie
//récupérer les données fetch
//identifier/déclarer les conteneurs HTML concernés .gallery const/queryselector
//mettre en relation les deux+afficher les données sur la gallery ou dans la gallery puis innerhtml ou appendchild


//en pratique
//déclarer les variables
//on prévoit une fonction pour 
//déclarer une variable category vide
//prévoir une fonction getcategory
//tester de manière statique les boutons de filtres et ensuite les supprimer et les créer dynamiquement
//et ensuite fonction displayfiltres avec createElement
//addeventlistener avec click

const isLogin = sessionStorage.getItem("token") ? true : false;

let works = [];
const gallery = document.querySelector('.gallery');

//toujours fetch dans une fonction
getWorks = () => {
    fetch("http://localhost:5678/api/works")
    .then((rep) => rep.json())
    //la flèche ici est return (bcp plus simple)
    .then((data) => {
        //on check ce qu'il y a dedans
        //console.log(data)
        //on va stocker data dans works, car data c'est la réponse de la promesse, il faut que les fonctions y aient accès
        works = data;
        //une fois qu'il a placé les data, ils les affichent grâce à display
        displayWorks();
    })
}

//afficher les travaux encore une fonction avec un nom évident
displayWorks = () => {
    gallery.innerHTML="";
    works.forEach( w => {
        //check ce qu'il y a dans le tableau mais pareil que console log data donc on prévise un élément
        //console.log(w.title)
        //la plupart du temps innerHTML est plus simple à utiliser mais limité car pour une utilisation simple (pas besoin de cliquer sur les images)
        //interpolation, voir premier js
        gallery.innerHTML += 
        `
        <figure>
        <img src="${w.imageUrl}" alt="${w.title}">
        <figcaption>${w.title}</figcaption>
        </figure>
        `
        //il faut rendre la photo et le test dynamique à partir de w
        //on prends les noms exacts du backend
    })
}

//j'appelle getWorks pour exécuter
getWorks();

let categories = [];
const filtresContainer = document.querySelector('.filtres');

getCategory = () => {
    //fetch les categories qui ont "name" et "id" (id qui va sevir pour filtrer ensuite)
    fetch("http://localhost:5678/api/categories")
    //traduit en json
    .then((rep) => rep.json())
    .then((data) => {
    //stocké dans un tableau
    categories = data;
    //appel de la fonction pour afficher les bouttons filtres
    displayFiltres();
    })
}

//création d'une fonction qui va afficher les filtres de category
displayFiltres = () => {
    document.getElementById('BtnTous').addEventListener('click', (event) => {
        displayById(0);
        activeFiltresStyle(event.target);
        //event.target sont les paramètres de l'evenement + cible donc il sait sur quoi tu as cliqué (voir chatGPT)
    })
    //fonction for each pour créer les <button>
    categories.forEach( category => {
        //chaque filtre est un <button> on utilise createElement car on va utiliser un addeventlistener dessus plus tard
        const filtre = document.createElement('button');
        //on définit le texte dans l'élément comme correspondant au contenu de name DANS category = category.name
        filtre.textContent = category.name;
        //on insère chaque filtre dans le parent filtresContainer étant la div avec la class filtres
        filtresContainer.appendChild(filtre);
        filtre.addEventListener('click', (event) => {
            displayById(category.id);
            //ici le paramètre peut être filtre car on vient de le déclarer pas besoin de paramètres
            activeFiltresStyle(filtre);
            })
        //changer la couleur des boutons cliqués retirer aux autres éléments et attribuer au bouton cliqué (mettre la class sur le bouton)
    })
}

const activeFiltresStyle = (btn) => {
    const activeBtn = document.querySelector(".activeBtn");
    activeBtn.classList.remove('activeBtn');
    btn.classList.add('activeBtn');
}

//je déclenche la fonction qui appelle aussi displayFiltres, les images s'affichent correctement
getCategory();

//je déclares filtres 
const filtres = document.querySelectorAll('.filtres');

displayById = (id) => {
    //nettoie tout ce qui existe
    gallery.innerHTML ="";
    //même boucle que works mais avec une condition w doit être = à id pour que ça marche
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
        //on aurait aussi pu utiliser else mais beaucoup plus long || id===0 est une meilleure pratique
        // else if (id===0){
        //     gallery.innerHTML +=
        //     `
        //     <figure>
        //     <img src="${w.imageUrl}" alt="${w.title}">
        //     <figcaption>${w.title}</figcaption>
        //     </figure>
        //     `
        // }
        //else if est pertinant s'il y a un autre traitement, si on en répte pas le code
    })
};

// Gestion Affichage Admin / Public

LoginBtn = document.getElementById('LoginBtn');
//je déclare la bouton modifier


LoginBtn.addEventListener('click', ()=> {
    //si on est co et qu'on clique dessus c'est qu'on veut déco
    if(isLogin) {
        //clean sessionstorage -> déco
        sessionStorage.clear();
        //retour sur la page d'accueil
        window.location.replace('./index.html')
    }
    else
    {
        //click->déco->page d'accueil
        window.location.replace('./login.html')
    }
})

if(isLogin){
    filtresContainer.style.display='none';
    LoginBtn.innerHTML ="logout"
}
else
{
    LoginBtn.innerHTML ="login"
    //le bouton modifier ne s'affiche que si logged in
    modifyBtn.style.display='none';
}