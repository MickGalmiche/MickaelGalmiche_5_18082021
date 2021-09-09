class Cart {

    constructor() {
        this.totalPrice = 0;
    }

    // Création de la liste de produits à partir d'un string (stocké dans le Local Storage)
    getArrayList(stringList) {
        this.productsListArray = JSON.parse(stringList);
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
        this.productsListLength = this.productsListArray.length;
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

    // Evènement sur le bouton de suppression d'un article du panier
    removeInCart(arrayId) {
        this.productsListArray.splice(arrayId, 1);
        localStorage.setItem(this.keyStorage, JSON.stringify(this.productsListArray));
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
    //removeProduct(${productId})
    
    // Affichage en cas de panier vide
    printEmptyRowProduct() {
        document.querySelector('.cart-table__product').innerHTML += `<tr>
                                                                        <td colspan="4">Aucun produit sélectionné</td>
                                                                    </tr>`
    };
}