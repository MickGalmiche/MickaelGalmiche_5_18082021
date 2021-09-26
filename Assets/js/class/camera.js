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
            // document.querySelector('.product__options > select').innerHTML += `<option value="${lense}">${lense}</option>`
            
            document.querySelector('.product__options').innerHTML += `<div class="product-options__item">
                                                                        <input type="radio" name="selectedLense" value="${lense}" id="${lense}"></input>
                                                                        <label for="${lense}">${lense}</label>
                                                                    </div>`
        });

    }

    verifySelectLense() {
        let inputs = document.querySelectorAll('input[name="selectedLense"]');
        let value;
        for (let input of inputs) {
            if (input.checked) {
                value = input.value;
                break;
            }
        }
        return value;
    }

    // Création de la propriété Lense grâce à un évènement sur l'input
    setLense(event) {
        this.lense = event;
    }
}
