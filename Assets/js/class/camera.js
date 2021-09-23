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

    // Injection des informations du produit dans le template HTML de la page d'accueil
    printCameraCard(template, host) {

        let clone = document.importNode(template.content, true);
        clone.querySelector('a').setAttribute("href", `product.html?${this.getQueryUrl()}`);
        clone.querySelector('.product-item__img').setAttribute("src",this.imageUrl);
        clone.querySelector('.product-caption__name').textContent = this.name;
        clone.querySelector('.product-caption__description').textContent = this.description;
        clone.querySelector('.product-caption__price').textContent = `${this.getFormatedPrice()}€`;
        host.appendChild(clone);

    }

    // Injection des informations du produit dans le template HTML de la page produit
    printCameraFigure() {

        let template = document.querySelector('#product-template');
        let host = document.querySelector('#product-main');
        let clone = document.importNode(template.content, true);
        clone.querySelector('.product-card__img').setAttribute("src", this.imageUrl);
        clone.querySelector('.product__name').textContent = this.name;
        clone.querySelector('.product__description').textContent = this.description;
        clone.querySelector('.product__price').textContent = `Prix ${this.getFormatedPrice()}€`;
        host.appendChild(clone);

    }

    // Injection de l'input de choix d'une personnalisation
    printLenses() {
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
