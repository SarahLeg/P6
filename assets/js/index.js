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
//addeventlistener avec click et if id=

let works = [];
const gallery = document.querySelector('.gallery');

//toujours mieux de fetch dans une fonction
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
    //fonction for each pour créer les <button>
    categories.forEach( category => {
        //chaque filtre est un <button> on utilise createElement car on va utiliser un addeventlistener dessus plus tard
        const filtre = document.createElement('button');
        //on définit le texte dans l'élément comme correspondant au contenu de name DANS category = category.name
        filtre.textContent = category.name;
        //on insère chaque filtre dans le parent filtresContainer étant la div avec la class filtres
        filtresContainer.appendChild(filtre);
    })
}

//je déclenche la fonction qui appelle aussi displayFiltres, les images s'affichent correctement
getCategory();

//je déclares filtres 
const filtres = document.querySelectorAll('.filtres');

//je crée une fonction qui va s'occuper de cacher les éléments dont l'id ne corresponds pas à la catégorie
displayById = (id) => {
    filtres.forEach(filtre => {
        if (filtre.id === categoryId) {
            //défini la propriété CSS block à l'élément 'filtre' avec la propriété DOM 'style'
            //https://developer.mozilla.org/fr/docs/Web/API/HTMLElement/style
            filtre.style.display = 'block';
        }
        else {
            //cacher les autres éléments
            filtre.style.display = 'none';
        }
    });
};

//et pour chaque élément de filtres, au click, je vais invoquer cette fonction
filtres.forEach(filtre => {
    filtre.addEventListener('click', () => {
        displayById();
        console.log(categories.id);
    });
});

//comment je compare les deux id ?? et je dois utiliser categoryId ou categories.id ou category.id ??