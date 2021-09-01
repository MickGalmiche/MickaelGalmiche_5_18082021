class Cart {

    constructor() {
        this.totalPrice = 0;
    }

    // Création de la liste de produits à partir d'un string (stocké dans le Local Storage)
    getArrayList(stringList) {
        this.productsListArray = JSON.parse(stringList);
        this.productsListLength = this.productsListArray.length;
    }

    // Initialisation de la propriété keyStorage pour l'accès au Local Storage
    setKeyStorage(key) {
        this.keyStorage = key;
    }

    // Création de la key dans le Local Storage
    createKeyStorage() {
        localStorage.setItem(this.keyStorage, '')
    }

    // Méthode initialisant le contenu du Local Storage avec la liste de produits
    getProductsList() {
        this.productsList = localStorage.getItem(this.keyStorage);
        if(!this.productsList) {
            this.createKeyStorage(this.keyStorage);
            this.productsListArray = [];
        }else{
            this.getArrayList(this.productsList);
        }
    }

    // Méthode pour calculer le prix total du panier
    setTotalPrice(price) {
        this.totalPrice += (price / 100);
    }

    // Evènement sur le bouton d'ajout au panier
    // Enregistrement des informations dans le localStorage (string d'objets)
    addToCart(camera) {
        const stringProductObject = JSON.stringify(camera);
        this.productsListArray.push(stringProductObject);
        localStorage.setItem(this.keyStorage, JSON.stringify(this.productsListArray));
    }

    // Evènement sur le bouton de suppression du panier
    clearCart() {
        if (this.productsListLength && this.productsListLength >= 1) {
            this.productsListArray.splice(0, this.productsListLength);
            localStorage.setItem(this.keyStorage, JSON.stringify(this.productsListArray));
            window.location.reload();
        }else{
            alert('Votre panier est déjà vide !');
        }
    }

    // Affichage d'une ligne de produit
    getRowProduct(product) {
        let formatedPrice = product.price / 100;
        document.querySelector('.cart-table__product').innerHTML += `<tr>
                                                                        <td>${product.name}</td>
                                                                        <td>${product.lense}</td>
                                                                        <td>${formatedPrice}€</td>
                                                                        <td>
                                                                            <button class="clearProduct">Suppr</button>
                                                                        </td>
                                                                    </tr>`
    };
    
    // Affichage en cas de panier vide
    getEmptyRowProduct() {
        document.querySelector('.cart-table__product').innerHTML += `<tr>
                                                                        <td colspan="2">Aucun produit sélectionné</td>
                                                                    </tr>`
    };
}