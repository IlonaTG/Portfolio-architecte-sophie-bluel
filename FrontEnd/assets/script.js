
const gallery = document.querySelector(".gallery");

// Appel à l'API avec fetch
fetch("http://localhost:5678/api/works/")
  .then((response) => response.json())
  .then((data) => {
    // Manipulation des données récupérées (work)
    data.forEach((work) => {
      const figure = document.createElement("figure");
      const image = document.createElement("img");
      image.src = work.imageUrl;
      const caption = document.createElement("figcaption");
      caption.textContent = work.title;
      //Ajouter l'image a la gallerie
      gallery.appendChild(figure);
      figure.appendChild(image);
      figure.appendChild(caption);
      });
    });
  
    //try {
      // Bloc de code où une erreur peut se produire} catch (error) {
      // Bloc de code pour gérer les erreurs capturéesconsole.error("Erreur lors de la récupération des projets:", error);};


const itemsContainer = document.querySelector(".gallery");

// Fonction pour ajouter les travaux à la galerie
async function afficherToutesLesImages() {
  itemsContainer.innerHTML = "";

  // Une requête Fetch pour obtenir les données de l'API
  const response = await fetch("http://localhost:5678/api/works/")
    .then((response) => response.json())
    .then((data) => {
      data.forEach(element => {
        const figure = document.createElement("figure");
        // Créer une image pour le projet
        const image = document.createElement("img");
        image.src = element.imageUrl;
        
        // Créer un nom pour afficher le nom du projet
        const caption = document.createElement("figcaption");
        caption.textContent = element.title;
   
        figure.appendChild(image);
        figure.appendChild(caption);
        itemsContainer.appendChild(figure);
      });
    });
}

// Fonction de tri par catégorie
async function trierParCategorie(categorie) {
  // Effacer les éléments actuels dans le conteneur
  itemsContainer.innerHTML = "";

  // Effectuer une requête Fetch pour obtenir les données de l'API
  const response = await fetch("http://localhost:5678/api/works/")
    .then((response) => response.json())
    .then((data) => {
      // Filtrer les éléments en fonction de la catégorie sélectionnée
      const elementsFiltres = data.filter(
        (element) => element.category.name === categorie
      );

      // Parcourir les éléments filtrés et les ajouter au conteneur
      elementsFiltres.forEach((element) => {
        const figure = document.createElement("figure");
        const image = document.createElement("img");
        image.src = element.imageUrl;
        const caption = document.createElement("figcaption");
        caption.textContent = element.title;

        figure.appendChild(image);
        figure.appendChild(caption);
        itemsContainer.appendChild(figure);
      });
    });
}

// Ajouter des écouteurs d'événements pour les boutons de tri
const tousBtn = document.createElement("button");
tousBtn.textContent = "Tous";
tousBtn.addEventListener("click", afficherToutesLesImages);
document.querySelector(".filters").appendChild(tousBtn);

const objetsBtn = document.createElement("button");
objetsBtn.textContent = "Objets";
objetsBtn.addEventListener("click", () => trierParCategorie("Objets"));
document.querySelector(".filters").appendChild(objetsBtn);

const appartementsBtn = document.createElement("button");
appartementsBtn.textContent = "Appartements";
appartementsBtn.addEventListener("click", () => trierParCategorie("Appartements"));
document.querySelector(".filters").appendChild(appartementsBtn);

const hotelsBtn = document.createElement("button");
hotelsBtn.textContent = "Hotels & restaurants";
hotelsBtn.addEventListener("click", () => trierParCategorie("Hotels & restaurants"));
document.querySelector(".filters").appendChild(hotelsBtn);

//Les changement en mode logIn
const log = document.querySelector(".log");
const banner = document.querySelector(".edition-banner");
const modif = document.querySelector(".mesProjets-changing");
const container = document.querySelector(".edition-container");
const filtres = document.querySelector(".filters");

function editionActive() {
  if (localStorage.login) {
    (log.innerText = "logout"), (banner.style = "display:flex;");
    filtres.style = "display:none";
  } else {
    banner.style = "display:none;";
    modif.style = "display:none;";
    container.style = "display:none";
  }
}
editionActive();

log.addEventListener("click", () => {
  localStorage.removeItem("login");
  localStorage.removeItem("token");
  log.innerText = "login";
  localStorage.clear;
});


// Sélection du lien "Modifier"
const modifierLink = document.querySelector('.mesProjets-changing');

// Sélection du modal et de ses éléments
const modalContainer = document.getElementById('modal-container');
const closeModalBtn = document.querySelector('.fa-xmark');
const imageContainer = document.querySelector('.image-container');

// Ajout d'un écouteur d'événements pour ouvrir le modal au clic sur le lien "Modifier"
modifierLink.addEventListener('click', () => {
    modalContainer.style.display = 'block'; // Afficher le modal
    afficherToutesLesImages(); // Afficher les images dans le modal (fonction déjà définie)
});

// Ajout d'un écouteur d'événements pour fermer le modal en cliquant sur la croix
closeModalBtn.addEventListener('click', () => {
    modalContainer.style.display = 'none'; // Cacher le modal
});

// Fonction pour afficher toutes les images dans le modal (similaire à votre fonction existante)
async function afficherToutesLesImages() {
    imageContainer.innerHTML = ''; // Effacer le contenu actuel du modal

    // Une requête Fetch pour obtenir les données de l'API
    const response = await fetch('http://localhost:5678/api/works/')
        .then((response) => response.json())
        .then((data) => {
            data.forEach((element) => {
                const image = document.createElement('img');
                image.src = element.imageUrl;
                imageContainer.appendChild(image); // Ajouter l'image au conteneur du modal
            });
        });
}


// Fonction pour fermer le modal en cliquant dehors de la modal
function fermerModal(event) {
    if (event.target === modalContainer) {
        modalContainer.style.display = 'none'; // Cacher le modal si le clic est en dehors de celui-ci
    }
}

// Ajout d'un gestionnaire d'événements pour fermer le modal lors d'un clic en dehors de celui-ci
window.addEventListener('click', fermerModal);


