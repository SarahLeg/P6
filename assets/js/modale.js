const overlay = document.querySelector(".overlay");
overlay.style.display='none';

const modifyBtn = document.getElementById('modify');

const modale = document.getElementById("modale");
modale.style.display='none';

const modale1 = document.getElementById("modale1");

const modale2 = document.getElementById("modale2");
modale2.style.display='none';

const closeModale = document.querySelector(".closeBtn");
const closeModale2 = document.querySelector(".closeBtn2");
const backBtn = document.querySelector(".backBtn");
const addPictureBtn = document.getElementById("addPictureBtn");

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
        deleteIcon.classList.add('fa-trash');
        deleteIcon.classList.add('fa-solid');
        deleteIcon.style.cursor = 'pointer';
        let divImgIcon = document.createElement('article');
        galleryAdmin.appendChild(divImgIcon);
        divImgIcon.appendChild(deleteIcon);
        divImgIcon.appendChild(img);
        deleteIcon.addEventListener('click', () => {
            if (confirm("Êtes-vous sûr(e) de vouloir supprimer cette photo?")) {
            deleteWork(w.id);
            }
        })
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
});

closeModale2.addEventListener('click', () => {
    modale.style.display='none';
    modale2.style.display='none';
    overlay.style.display='none';
    clearForm();
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

//Suppression/ajout travaux

deleteWork = (id) => {
    fetch("http://localhost:5678/api/works/" + id, {
        method: "DELETE",
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
    displayUploadPicture();
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
    if(!imageFile.files[0]){
        return false
    }
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
setAddBtn();

addWorkForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if(isFormValid()) {
        const data = new FormData();
        data.append('title' , imageTitle.value);
        data.append('category' , parseInt(imageCategory.value));
        data.append('image', imageFile.files[0]);
        fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
            accept: "application/json",
            Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
        body: data,
        })
        .then((response) => response.json())
        .then((newWork) => {
            works.push(newWork);
            getWorks();
            displayWorksAdmin();
            modale2.style.display='none';
            modale1.style.display='inline';
            clearForm();
        })
    }
    else
    {
        alert('Tous les champs sont obligatoires');
    }
});

boxCustomFileInput = document.querySelector('.box-custom-file-input');
customFileInput = document.querySelector(".custom-file-input");

displayUploadPicture = () => {
    if(imageFile.files[0]){
        const uploadPicture = document.createElement('img');
        uploadPicture.src = URL.createObjectURL(imageFile.files[0]);
        uploadPicture.classList.add("upload-picture");
        boxCustomFileInput.appendChild(uploadPicture);
        customFileInput.style.display='none';
    }
};

clearForm = () => {
    const uploadPicture = document.querySelector(".upload-picture");
    document.getElementById("addWorkForm").reset();
    boxCustomFileInput.removeChild(uploadPicture);
    customFileInput.style.display='flex';
};


// Select dynamique modale2

let categoriesAdded = false;

displayImageCategories = () => {
    if (!categoriesAdded) {
        categories.forEach(category => {
            const option = document.createElement('option');
            option.textContent = category.name;
            option.value = category.id;
            imageCategory.appendChild(option);
        });
        categoriesAdded = true;
    }
};

imageCategory.addEventListener('click', () => {
    displayImageCategories();
});