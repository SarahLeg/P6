//Gestion de la modale

overlay = document.querySelector('.overlay');
overlay.style.display='none';
modale = document.getElementById("modale");
//la modale ne s'affichera pas sans event (click modifier)
modale.style.display='none';
modale1 = document.getElementById("modale1");
modale2 = document.getElementById("modale2");
//la modale 2 ne s'affichera pas sans event
modale2.style.display='none';
closeModale = document.querySelector('.closeBtn');
backBtn = document.querySelector(".backBtn");
addPicture = document.getElementById("addPicture");

const galleryAdmin = document.querySelector('.modale__gallery');

displayWorksAdmin = () => {
    galleryAdmin.innerHTML ="";
    works.forEach( w => {
        let img = document.createElement('img');
        img.classList.add('modale__img');
        img.src = w.imageUrl;
        img.alt = w.title;
        let deleteIcon = document.createElement('span');
        deleteIcon.addEventListener('click', () => {
            deleteWork(w.id);
        })
        deleteIcon.classList.add('fa-trash');
        deleteIcon.classList.add('fa-solid');
        deleteIcon.style.cursor = 'pointer';
        let divImgIcon = document.createElement('article');
        galleryAdmin.appendChild(divImgIcon);
        divImgIcon.appendChild(deleteIcon);
        divImgIcon.appendChild(img);
    })
}

modifyBtn = document.getElementById('modify');

modifyBtn.addEventListener('click', () => {
    galleryAdmin.innerHTML='';
    modale.style.display='inline';
    overlay.style.display='inline';
    displayWorksAdmin();
})

closeModale.addEventListener('click', () => {
    modale.style.display='none';
    modale2.style.display='none';
    overlay.style.display='none';
})

backBtn.addEventListener('click', () => {
    modale2.style.display='none';
    modale1.style.display='inline';
})

//à voir comment display l'une et pas l'autre et rendre closeModale fonctionnelle dans les deux cas
addPicture.addEventListener('click', () => {
    modale1.style.display='none';
    modale2.style.display='inline';
})

deleteWork = (id) => {
    fetch("http://localhost:5678/api/works/" + id, {
        method: "DELETE",
        //en-tête ou je renseigne l'autorisation d'erreur qu'on avait stocké sur la session, c'était pour ça qu'on l'a stocké
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      })
      .then(()=>{
        works = works.filter((w) => w.id != id)
        displayWorks();
        displayWorksAdmin();
      })
}

//documentation de l'ajout
//on aura une méthode fetch un peu comme la suppression mais au lieu on aura post avec le token
//on doit récup image (file ici image) titre (title) et category (id)
//le form de connexion ne fonctionne pas ici
//étudier la méthode "fetch post image"
//dans un premier temps en testant les ajouts mets juste des numéros
//dans mon formulaire d'envoi 
//3 append append image append title append category (voir image bureau)
//mettre des id sur les input comme pour le form email+password

// addWork = () => {
//     const formData = new formData();
//     formData.append('title');
//     formData.append('category');
//     formData.append('file', document.querySelector('input[type="file"]').files[0]);
//     fetch("http://localhost:5678/api/works/", {
//         method: "POST",
//         body: formData,
//         headers: {
//             Authorization: sessionStorage.getItem("token"),
//         }
//     })
// }

addWorkForm = document.getElementById('addWorkForm');
const imageFile = document.getElementById('imageFile');
const imageTitle = document.getElementById('imageTitle');
const imageCategory = document.getElementById('imageCategory');

addWorkForm.addEventListener('submit', () => {
    const newWork = {
        file:imageFile.value,
        title:imageTitle.value,
        category:imageCategory.value
    }
    fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: { 

        },
        body: JSON.stringify(newWork),
    })
    .then((response) => {

    })

})