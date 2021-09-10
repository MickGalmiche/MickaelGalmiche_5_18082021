let cart = new Cart();
cart.setKeyStorage('listProducts');
cart.getList();
let productsData = [];
let productId = 0;

if (cart.listLength >= 1) {
    cart.listArray.forEach(arrayItem => {
        let product = JSON.parse(arrayItem);
        cart.printRowProduct(product, productId);
        productId++;
        cart.setTotalPrice(product.price);
        productsData.push(product._id);
    })
}else{
    cart.printEmptyRowProduct();
}

document.querySelector('.totalPriceProducts').textContent = `${cart.totalPrice}€`;

/* function removeProduct(id) {
    //let removeProductId = productsData[id - 1];
    cart.removeInCart(id);
} */

document
    .getElementById("clearCart")
    .addEventListener("click", () => {
        cart.clearCart();
    });

document
    .getElementById("order-form")
    .addEventListener("submit", async function(event) {
        event.preventDefault();

        const url = "http://localhost:3000/api/cameras/order";
        const form = event.target;
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

        fetch(url, fetchOptions)
            .then(response => response.json())
            .then(response => {

                // Stockage de la commande dans une key ORDER
                let order = new Order();
                order.setKeyStorage('order');
                order.getList();
                order.registerOrder(response);

                console.log(localStorage.getItem('order'));
                
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

                // Suppresion du panier à l'envoi des infos à l'API + Reload de la page
                cart.clearCart();
                window.location.href=`order.html?${queryUrl}`;

                //localStorage.removeItem(`order_${orderId}`);
            });
    });



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