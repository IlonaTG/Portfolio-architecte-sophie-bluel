
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
async function ajouterTravauxALaGalerie() {
  itemsContainer.innerHTML = "";

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

    // Ajouter l'image et le nom du projet à la div du projet
   
    figure.appendChild(image);
    figure.appendChild(caption);
    itemsContainer.appendChild(figure);
  });
});
}
