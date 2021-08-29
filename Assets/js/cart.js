let listProducts = localStorage.getItem('listProducts');
let totalPriceProducts = 0;
listProducts = JSON.parse(listProducts);
listProducts.forEach(product => {
    fetch(`http://localhost:3000/api/cameras/${product}`)
        .then( data => data.json())
        .then(jsonCamera => {
            let camera = new Camera(jsonCamera);
            totalPriceProducts += camera.price;
            console.log(totalPriceProducts);
            document.querySelector('.cartProduct').innerHTML += `<tr>
                                                                    <td>${camera.name}</td>
                                                                    <td>${camera.price}</td>
                                                                </tr>`
            document.querySelector('.totalPriceProducts').textContent = totalPriceProducts;
        })
});


const clearCart = document.getElementById("clearCart");
clearCart.addEventListener("click", ()=>{
    localStorage.removeItem('listProducts');
})
