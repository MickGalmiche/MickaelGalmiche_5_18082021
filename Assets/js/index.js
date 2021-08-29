fetch('http://localhost:3000/api/cameras')
    .then( data => data.json())
    .then(jsonListCamera => {
        for(let jsonCamera of jsonListCamera) {
            let camera = new Camera(jsonCamera);
            document.querySelector('.product-list').innerHTML += `<article class="product-list__item">
                                                                    <a href="product.html?${camera.getQueryUrl()}">
                                                                        <figure class="product-item">
                                                                            <img class="product-item__img" src="${camera.imageUrl}" alt="">
                                                                            <figcaption class="product-item__caption product-caption">
                                                                                <h3 class="product-caption__name">${camera.name}</h3>
                                                                                <p class="product-caption__description">${camera.description}</p>
                                                                                <p class="product-caption__price">${camera.price}</p>
                                                                            </figcaption>
                                                                        </figure>
                                                                    </a>
                                                                </article>`
        }
    });