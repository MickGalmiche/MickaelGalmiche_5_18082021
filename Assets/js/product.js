// Recherche du produit avec le paramètre de requête URL
let url = new URL(document.location.href);
let params = new URLSearchParams(url.search);
let idProduct = params.get('id');
const urlApi = `http://localhost:3000/api/cameras/${idProduct}`;
let cart = new Cart('listProducts');

// Requête API pour obtenir les information d'un produit
fetch(urlApi)
    .then(responseApi)
    .then( data => data.json())
    .then(jsonCamera => {

        // Création de l'objet du produit et application des méthodes (affichage via injection des valeurs dans le template)
        let camera = new Camera(jsonCamera);
        camera.printCameraFigure();
        camera.printLenses();

        // Event d'ajout au panier grâce à la classe Cart
        // Vérification du choix d'une personnalisation
        document
            .getElementById("addToCart")
            .addEventListener("click", () => {

                let selectedLense = camera.verifySelectLense();
                if (selectedLense) {
                    camera.setLense(selectedLense);
                    cart.addToCart(camera)
                    if (confirm('Votre article a bien été ajouté au panier !\nSouhaitez-vous confirmer votre commande ?')) {
                        window.location.href='cart.html';
                    } else {
                        window.location.reload();
                    }
                } else {
                    alert("Veuillez choisir un objectif avant d'ajouter un article dans le panier")
                }
            })
    })
    .catch(error => {
        document.getElementById('product-main').innerHTML = '<p>Aucun article disponible !</p>';
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