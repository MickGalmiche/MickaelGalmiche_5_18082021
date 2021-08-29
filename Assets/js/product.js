let url = new URL(document.location.href);
let params = new URLSearchParams(url.search);
let idProduct = params.get('id');

fetch(`http://localhost:3000/api/cameras/${idProduct}`)
    .then( data => data.json())
    .then(jsonCamera => {
        let camera = new Camera(jsonCamera);
        document.querySelector('.product-main').innerHTML += `<figure class="product-card">
                                                                <img class="product-card__img" src="${camera.imageUrl}" alt="">
                                                                <figcaption class="product-card__info product">
                                                                    <h3 class="product__name">${camera.name}</h3>
                                                                    <p class="product__description">${camera.description}</p>
                                                                    <p class="product__options">
                                                                        <label for="options">Options disponibles : </label>
                                                                        <select name="productOptions" id="options">                                                                            
                                                                        </select>
                                                                    </p>
                                                                    <p class="product__price">Prix : ${camera.price}</p>
                                                                    <button id="addToCart" class="product__add-to-cart" type="button">Add to cart</button>
                                                                </figcaption>
                                                            </figure>`
        
        const lenses = camera.lenses;
        lenses.forEach(lense => {
            document.querySelector('.product__options > select').innerHTML += `<option value="${lense}">${lense}</option>`            
        });

        const addToCart = document.getElementById("addToCart");
        addToCart.addEventListener("click", ()=>{

            let storageProducts = localStorage.getItem('listProducts');
            let products;
            if (storageProducts){
                products = JSON.parse(storageProducts);
            }else{
                products = [];
            }

            products.push(idProduct);
            let listProducts = JSON.stringify(products);
            localStorage.setItem('listProducts', listProducts);
        })

        const clearCart = document.getElementById("clearCart");
        clearCart.addEventListener("click", ()=>{
            localStorage.removeItem('listProducts');
        })

        console.log(localStorage.getItem('listProducts'));
        console.log(localStorage);
    });