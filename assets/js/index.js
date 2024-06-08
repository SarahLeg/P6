//mentorat


//en théorie
//récupérer les données fetch
//identifier/déclarer les conteneurs HTML concernés .gallery const/queryselector
//mettre en relation les deux+afficher les données sur la gallery ou dans la gallery puis innerhtml ou appendchild


//en partique
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

let category = [];
const filtres = document.querySelector('.filtres');

getCategory = () => {
    fetch("http://localhost:5678/api/categories")
    .then((rep) => rep.json())
    .then((data) => {
    categories = data;
    displayFiltres ();
    })
}

displayFiltres = () => {
    category.forEach( )
}