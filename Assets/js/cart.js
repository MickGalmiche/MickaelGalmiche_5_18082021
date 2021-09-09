let cart = new Cart();
cart.setKeyStorage('listProducts');
cart.getProductsList();
let productsData = [];
let productId = 0;

if (cart.productsListLength >= 1) {
    cart.productsListArray.forEach(arrayItem => {
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
                let orderId = response.orderId;
                let responseData = JSON.stringify(response);
                localStorage.setItem(`order_${orderId}`, responseData);

                let queryUrl = new URLSearchParams();
                queryUrl.append('orderId', orderId);
                queryUrl.toString();

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
