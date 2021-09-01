const urlApi = 'http://localhost:3000/api/cameras'

// Requête API pour la liste de produits
fetch(urlApi)
    .then( data => data.json())
    .then(jsonListCamera => {

        // Boucle listant chaque produit et créant un objet
        for(let jsonCamera of jsonListCamera) {
            let camera = new Camera(jsonCamera);
            camera.getCameraCard();
        }
    });