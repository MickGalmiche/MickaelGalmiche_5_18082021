let cart = new Cart('listProducts');

const urlApi = 'http://localhost:3000/api/cameras'

// Requête API pour la liste de produits
fetch(urlApi)
    .then(responseApi)
    .then(data => data.json())
    .then(jsonListCamera => {

        // Récupération du template de la carte Produit
        let template = document.querySelector('#product-list-item');
        let host = document.querySelector('#product-list');
        
        // Boucle listant chaque produit et créant un objet
        // Injection des valeurs de l'objet dans le template
        for(let jsonCamera of jsonListCamera) {
            let camera = new Camera(jsonCamera);
            camera.printCameraCard(template, host);
        }
    })
    .catch(error => {
        document.getElementById('product-list').innerHTML = '<p>Aucun article disponible !</p>';
        console.log(`${error.status} : ${error.statusText} - Mauvaise requête API`);
    })

function responseApi(response) {
    if (!response.ok) {
        // throw Error(response.statusText);
        return Promise.reject({
            status: response.status,
            statusText: response.statusText
        })
    } else {
        return response;
    }
}