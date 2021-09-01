class Camera {
    constructor(jsonCamera) {
        jsonCamera && Object.assign(this, jsonCamera);
    }

    // Formatage du prix
    getFormatedPrice() {
        return (this.price/100);
    }

    // Création de l'URL individuel pour un produit
    getQueryUrl() {
        let queryUrl = new URLSearchParams();
        queryUrl.append('id', this._id);
        return queryUrl.toString();
    }

    // Injection du code HTML (card-list) avec les informations du produit
    getCameraCard() {
        document.querySelector('.product-list').innerHTML += `<article class="product-list__item">
                                                                    <a href="product.html?${this.getQueryUrl()}">
                                                                        <figure class="product-item">
                                                                            <img class="product-item__img" src="${this.imageUrl}" alt="">
                                                                            <figcaption class="product-item__caption product-caption">
                                                                                <h3 class="product-caption__name">${this.name}</h3>
                                                                                <p class="product-caption__description">${this.description}</p>
                                                                                <p class="product-caption__price">${this.getFormatedPrice()}€</p>
                                                                            </figcaption>
                                                                        </figure>
                                                                    </a>
                                                                </article>`
    }

    // Injection du code HTML (card-product) avec les informations du produit
    getCameraFigure() {
        document.querySelector('.product-main').innerHTML += `<figure class="product-card">
                                                                <img class="product-card__img" src="${this.imageUrl}" alt="">
                                                                <figcaption class="product-card__info product">
                                                                    <h3 class="product__name">${this.name}</h3>
                                                                    <p class="product__description">${this.description}</p>
                                                                    <p class="product__options">
                                                                        <label for="options">Choisir un objectif : </label>
                                                                        <select name="productOptions" id="options">
                                                                            <option value"">---</option>                                                                          
                                                                        </select>
                                                                    </p>
                                                                    <p class="product__price">Prix : ${this.getFormatedPrice()}€</p>
                                                                    <button id="addToCart" class="product__add-to-cart" type="button">Add to cart</button>
                                                                </figcaption>
                                                            </figure>`
    }

    // Injection de l'input de choix d'une personnalisation
    getLenses() {
        this.lenses.forEach(lense => {
            document.querySelector('.product__options > select').innerHTML += `<option value="${lense}">${lense}</option>`            
        });
    }

    // Création de la propriété Lense grâce à un évènement sur l'input
    setLense(event) {
        this.lense = event;
    }

    /* setChosenLense(camera) { 
        document
            .querySelector('select[name="productOptions"]')
            .addEventListener("change", function(event) {
                camera.lense = event.target.value;
            })
    } */
}
