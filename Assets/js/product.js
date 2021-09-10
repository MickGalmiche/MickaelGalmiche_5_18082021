// Recherche du produit avec le paramètre de requête URL
let url = new URL(document.location.href);
let params = new URLSearchParams(url.search);
let idProduct = params.get('id');
const urlApi = `http://localhost:3000/api/cameras/${idProduct}`;

// Requête API pour obtenir les information d'un produit
fetch(urlApi)
    .then( data => data.json())
    .then(jsonCamera => {

        // Création de l'objet du produit et application des méthodes (affichage, ajout au panier)
        let camera = new Camera(jsonCamera);
        camera.printCameraFigure();
        camera.printLenses();

        // Intégration du choix d'objectif dans l'objet Camera
        document
            .querySelector('select[name="productOptions"]')
            .addEventListener("change", (event) => {
                camera.setLense(event.target.value);
            })

        // Event d'ajout au panier grâce à la classe Cart
        document
            .getElementById("addToCart")
            .addEventListener("click", () => {
                let cart = new Cart();
                cart.setKeyStorage('listProducts');
                cart.getList();
                cart.addToCart(camera);
            })
    });