overlay = document.querySelector(".overlay");
overlay.style.display='none';
modifyBtn = document.getElementById('modify');
modale = document.getElementById("modale");
//la modale ne s'affichera pas sans event (click modifier)
modale.style.display='none';
modale1 = document.getElementById("modale1");
modale2 = document.getElementById("modale2");
//la modale 2 ne s'affichera pas sans event
modale2.style.display='none';
closeModale = document.querySelector(".closeBtn");
closeModale2 = document.querySelector(".closeBtn2");
backBtn = document.querySelector(".backBtn");
addPictureBtn = document.getElementById("addPictureBtn");

const galleryAdmin = document.querySelector('.modale__gallery');

//Affichage mini galerie dans la modale1

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
};

//Gestion d'ouverture/fermeture modales + switch modale1 vers modale2

modifyBtn.addEventListener('click', () => {
    galleryAdmin.innerHTML='';
    modale.style.display='inline';
    modale1.style.display='inline';
    overlay.style.display='inline';
    displayWorksAdmin();
});

backBtn.addEventListener('click', () => {
    modale2.style.display='none';
    modale1.style.display='inline';
});

closeModale.addEventListener('click', () => {
    modale.style.display='none';
    modale2.style.display='none';
    overlay.style.display='none';
    console.log('oui');
});

closeModale2.addEventListener('click', () => {
    modale.style.display='none';
    modale2.style.display='none';
    overlay.style.display='none';
    console.log('oui');
});

overlay.addEventListener('click', () => {
    modale.style.display='none';
    modale2.style.display='none';
    overlay.style.display='none';
});

addPictureBtn.addEventListener('click', () => {
    modale1.style.display='none';
    modale2.style.display='inline';
});

//Suppression/ajout travaux avec conditions (form complet)

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
};

addWorkForm = document.getElementById('addWorkForm');

const imageFile = document.getElementById('imageFile');
imageFile.addEventListener('change' , () => {
    setAddBtn();
});

const imageTitle = document.getElementById('imageTitle');
imageTitle.addEventListener('keyup' , () => {
    setAddBtn();
});

const imageCategory = document.getElementById('imageCategory');
imageCategory.addEventListener('change' , () => {
    setAddBtn();
});

const isFormValid = () => {
    // le ! exprime l'inverse de la conditon
    // 
    if(!imageFile.files[0]){
        return false
    }
    //à chaque return false l'éxécution s'arrête sinon ça continue jusqu'à true
    if(imageTitle.value == ""){
        return false
    }
    if(imageCategory.value =="0"){
        return false
    }
    return true
};

const setAddBtn = () => {
    const addBtn = document.getElementById('ValiderBtn');
    if(isFormValid()){
        addBtn.classList.remove('valider-btn');
    }
    else
    {
        addBtn.classList.add('valider-btn');
    }
};

addWorkForm.addEventListener('submit', (e) => {
    e.preventDefault();
//avec new on instancie un objet du type FormData qu'on appelle data (plus haut formData était une erreur)
    if(isFormValid()) {
        const data = new FormData();
        data.append('title' , imageTitle.value);
        data.append('category' , parseInt(imageCategory.value));
        data.append('image', imageFile.files[0]);
        //bien respecter les noms attendus dans le back end. title category et image
        fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
            accept: "application/json",
            Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
        body: data,
        })
        //on envoie les data direct sans stringify car c'est une image
        .then((response) => response.json())
        .then((newWork) => {
            works.push(newWork);
            // works = works.filter((w) => w.id !=id)
            console.log(newWork.id);
            getWorks();
            displayWorksAdmin();
        })
    }
    else
    {
        alert('Tous les champs sont obligatoires')
    }
});

//select dynamique modale2 

let optionsAdded = false;

displayImageCategories = () => {
    categories.forEach( category => {
        const option = document.createElement('option');
        option.textContent = category.name;
        option.value = category.id;
        imageCategory.appendChild(option);
    })
}

// imageCategory.addEventListener('click', () => {
//     displayImageCategories();
// })