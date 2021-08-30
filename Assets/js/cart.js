let totalPriceProducts = 0;
let listProducts = JSON.parse(localStorage.getItem('listProducts'));
let listProductsLength = listProducts.length;
let storage = 'local';

console.log(listProducts);


function getStorageProducts(product) {
    let formatedPrice = product.price / 100;
    totalPriceProducts += formatedPrice;
    document.querySelector('.cart-table__product').innerHTML += `<tr>
                                                                    <td>${product.name}</td>
                                                                    <td>${product.lense}</td>
                                                                    <td>${formatedPrice}€</td>
                                                                    <td>
                                                                        <button class="clearProduct">Suppr</button>
                                                                    </td>
                                                                </tr>`
    document.querySelector('.totalPriceProducts').textContent = `${totalPriceProducts}€`;
};

function getStorageObjectProducts(product) {
    fetch(`http://localhost:3000/api/cameras/${product.id}`)
        .then( data => data.json())
        .then(jsonCamera => {
            let camera = new Camera(jsonCamera);
            let formatedPrice = camera.getFormatedPrice(camera.price);
            totalPriceProducts += formatedPrice;
            document.querySelector('.cart-table__product').innerHTML += `<tr>
                                                                    <td>${camera.name}</td>
                                                                    <td>Non défini</td>
                                                                    <td>${formatedPrice}€</td>
                                                                    <td>
                                                                        <button class="clearProduct">Suppr</button>
                                                                    </td>
                                                                </tr>`
            document.querySelector('.totalPriceProducts').textContent = `${totalPriceProducts}€`;
        });
};



if (listProductsLength >= 1) {
    listProducts.forEach(arrayProduct => {
        
        let product = JSON.parse(arrayProduct);
        
        if (storage == 'local') {
            getStorageProducts(product);
        }else{
            getStorageObjectProducts(product);
        }
    });
}else{
    document.querySelector('.cart-table__product').innerHTML += `<tr>
                                                                    <td colspan="2">Aucun produit sélectionné</td>
                                                                </tr>`
}

const clearCart = document.getElementById("clearCart");
clearCart.addEventListener("click", ()=>{
    /* localStorage.removeItem('listProducts'); */

    listProducts.splice(0, listProductsLength);
    listProducts = JSON.stringify(listProducts);
    localStorage.setItem('listProducts', listProducts);
    window.location.reload();

})
