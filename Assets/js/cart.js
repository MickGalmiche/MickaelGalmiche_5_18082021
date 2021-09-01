let cart = new Cart();
cart.setKeyStorage('listProducts');
cart.getProductsList();

if (cart.productsListLength >= 1) {
    cart.productsListArray.forEach(arrayItem => {
        let product = JSON.parse(arrayItem);
        cart.getRowProduct(product);
        cart.setTotalPrice(product.price);
    })
}else{
    cart.getEmptyRowProduct();
}

document.querySelector('.totalPriceProducts').textContent = `${cart.totalPrice}€`;

document
    .getElementById("clearCart")
    .addEventListener("click", () => {
        cart.clearCart();
    })