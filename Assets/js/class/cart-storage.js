class Cart extends Storage {

    constructor(key) {
        super();
        super.setKeyStorage(key);
        super.getList();
        this.totalPrice = 0;
    }

    // Méthode pour calculer le prix total du panier
    setTotalPrice(price) {
        this.totalPrice += (price / 100);
    }

    // Evènement sur le bouton d'ajout au panier
    // Enregistrement des informations dans le localStorage (string d'objets)
    addToCart(camera) {
        const stringProductObject = JSON.stringify(camera);
        this.listArray.push(stringProductObject);
        localStorage.setItem(this.keyStorage, JSON.stringify(this.listArray));
    }

    // Evènement sur le bouton de suppression du panier
    clearCart() {
        if (this.listLength && this.listLength >= 1) {
            this.listArray.splice(0, this.listLength);
            localStorage.setItem(this.keyStorage, JSON.stringify(this.listArray));
            window.location.reload();
        }else{
            alert('Votre panier est déjà vide !');
        }
    }

    // Evènement sur le bouton de suppression d'un article du panier
    removeInCart(arrayId) {
        this.listArray.splice(arrayId, 1);
        localStorage.setItem(this.keyStorage, JSON.stringify(this.listArray));
        window.location.reload();

    }

    // Affichage d'une ligne de produit
    printRowProduct(product, productId) {
        let formatedPrice = product.price / 100;
        document.querySelector('.cart-table__product').innerHTML += `<tr>
                                                                        <td>${product.name}</td>
                                                                        <td>${product.lense}</td>
                                                                        <td>${formatedPrice}€</td>
                                                                        <td>
                                                                            <button class="clearProduct" id="${productId}" onclick="cart.removeInCart(${productId})">Suppr</button>
                                                                        </td>
                                                                    </tr>`
    };
    
    // Affichage en cas de panier vide
    printEmptyRowProduct() {
        document.querySelector('.cart-table__product').innerHTML += `<tr>
                                                                        <td colspan="4">Aucun produit sélectionné</td>
                                                                    </tr>`
    };

    // Vérification de la validité des éléments du formulaire
    checkContactForm(form) {
        let valid = true;
        for(let input of form) {
            valid &= input.reportValidity();
            if (!valid) {
                break;
            }
        }
        return valid;
    }

}