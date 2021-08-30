let url = new URL(document.location.href);
let params = new URLSearchParams(url.search);
let idProduct = params.get('id');
let urlApi = `http://localhost:3000/api/cameras/${idProduct}`

fetch(urlApi)
    .then( data => data.json())
    .then(jsonCamera => {
        let camera = new Camera(jsonCamera);
        console.log(camera);
        let formatedPrice = camera.getFormatedPrice(camera.price);
        document.querySelector('.product-main').innerHTML += `<figure class="product-card">
                                                                <img class="product-card__img" src="${camera.imageUrl}" alt="">
                                                                <figcaption class="product-card__info product">
                                                                    <h3 class="product__name">${camera.name}</h3>
                                                                    <p class="product__description">${camera.description}</p>
                                                                    <p class="product__options">
                                                                        <label for="options">Choisir un objectif : </label>
                                                                        <select name="productOptions" id="options">                                                                          
                                                                        </select>
                                                                    </p>
                                                                    <p class="product__price">Prix : ${formatedPrice}€</p>
                                                                    <button id="addToCart" class="product__add-to-cart" type="button">Add to cart</button>
                                                                </figcaption>
                                                            </figure>`
        
        const lenses = camera.lenses;
        lenses.forEach(lense => {
            document.querySelector('.product__options > select').innerHTML += `<option value="${lense}">${lense}</option>`            
        });

        camera.lense = document
                        .querySelector('select[name="productOptions"]')
                        .addEventListener("change", function(event) {
                            camera.lense = event.target.value;
                        })


        const addToCart = document.getElementById("addToCart");
        addToCart.addEventListener("click", ()=>{

            const stringProductObject = JSON.stringify(camera);
            let productsList;
            let storageProductsList = localStorage.getItem('listProducts');

            if(!storageProductsList) {
                productsList = [];
            }
            
            productsList = JSON.parse(storageProductsList);
            productsList.push(stringProductObject);
            let stringProductsList = JSON.stringify(productsList);
            localStorage.setItem('listProducts', stringProductsList);

            


            // let products;
            // let storageProducts = localStorage.getItem('listProducts');
            // if (storageProducts){
            //     products = JSON.parse(storageProducts);
            // }else{
            //     products = [];
            // }
            
            // products.push(idProduct);
            // let listProducts = JSON.stringify(products);
            // localStorage.setItem('listProducts', listProducts);
        })

        /* console.log(localStorage.getItem('listProducts'));
        console.log(localStorage); */
    });