let cart = new Cart('listProducts');
let productsData = [];
let productId = 0;

// Affichage des produits du panier
if (cart.listLength >= 1) {
    cart.listArray.forEach(arrayItem => {
        let product = JSON.parse(arrayItem);
        cart.printRowProduct(product, productId);
        productId++;
        cart.setTotalPrice(product.price);
        productsData.push(product._id);
    })
} else {
    cart.printEmptyRowProduct();
}

// Ajout du montant total du panier
document.querySelector('.totalPriceProducts').textContent = `${cart.totalPrice}€`;

// Event de suppression de la totalité des articles du panier
document
    .getElementById("clearCart")
    .addEventListener("click", () => {
        cart.clearCart();
    });

// Event de soumission de la commande avec envoie au banckend
document
    .getElementById("order-form")
    .addEventListener("submit", async function(event) {
        event.preventDefault();

        const url = "http://localhost:3000/api/cameras/order";
        const form = event.target;

        // Vérification de la présence d'article avant l'envoi
        // Mise en forme des données demandés par le banckend
            /* 
            //formatage de la requête de commande
             {
            	"contact": {
            		"firstName": "Test",
            		"lastName": "Test",
            		"address": "Test",
            		"city": "Test",
            		"email": "test@test.fr"
            		},
            	"products": [
            		"5be1ed3f1c9d44000030b061",
            		"5be1ef211c9d44000030b062"
            		]
            } */
        if (cart.listLength == 0) {
            alert('Votre panier est vide');
        } else if (cart.listLength >= 1 && cart.checkContactForm(document.querySelectorAll(".order-form input"))) {

            const formData = new FormData(form);
            let contactData = Object.fromEntries(formData.entries());
            
            const fetchOptions = {
                method: form.method,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    contact: contactData,
                    products: productsData
                }),
            };

            // Requête API POST
            fetch(url, fetchOptions)
                .then(response => response.json())
                .then(response => {

                    // Stockage de la commande dans une key ORDER
                    let order = new Order('order');
                    order.registerOrder(response);

                    // Alternative de stockage de commande
                    // localStorage.setItem(`order_${orderId}`, responseData);

                    // Alternative de stockage des infos de commande dans l'URL
                    /* let queryBlob = new Blob([responseData], {type : 'application/json'});
                    let queryBlobUrl = URL.createObjectURL(queryBlob);
                    console.log(queryBlobUrl); */

                    // Création de l'url+ID de commande
                    let orderId = response.orderId;
                    let queryUrl = new URLSearchParams();
                    queryUrl.append('orderId', orderId);
                    queryUrl.toString();

                    // Suppresion du panier à l'envoi des infos à l'API + Renvoi vers la page de commande
                    cart.clearCart();
                    window.location.href=`order.html?${queryUrl}`;

                    //localStorage.removeItem(`order_${orderId}`);
                });
        }
    });
