class Storage {

    constructor() {
        this.getCartBadge();
    }

    // Création de la liste de commandes (stocké dans le Local Storage)
    getArrayList(stringList) {
        this.listArray = JSON.parse(stringList);
    }

    // Initialisation de la propriété keyStorage pour l'accès au Local Storage
    setKeyStorage(key) {
        this.keyStorage = key;
    }

    // Création de la key dans le Local Storage
    createKeyStorage() {
        localStorage.setItem(this.keyStorage, '');
    }

    // Méthode initialisant le contenu du Local Storage avec les infos de commande
    getList() {
        this.list = localStorage.getItem(this.keyStorage);
        if(!this.list) {
            this.createKeyStorage(this.keyStorage);
            this.listArray = [];
        }else{
            this.getArrayList(this.list);
        }
        this.listLength = this.listArray.length;
    }

    // Création du badge du nombre de produits dans le panier pour le header
    getCartBadge() {
        /* this.listProducts = localStorage.getItem('listProducts');
        this.cartButton = document.querySelector('.badge-cart');
        if (!this.listProducts) {
            this.cartButton.textContent = 0;
        } else {
            this.getArrayList(this.listProducts);
            this.cartButton.textContent = this.listArray.length;
        } */
        
        this.listProducts = localStorage.getItem('listProducts');
        this.getArrayList(this.listProducts);
        this.cartBadge = document.querySelector('#header-nav-cart a');
        if (this.listArray.length >= 1) {
            let badgeSpan = document.createElement("span");
            this.cartBadge.appendChild(badgeSpan)
            document.querySelector('#header-nav-cart a span').classList.add('badge-cart')
            document.querySelector('.badge-cart').textContent = this.listArray.length;
        }
       
    }
}