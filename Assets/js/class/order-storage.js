class Order extends Storage {

    // Evènement sur le bouton de commande
    // Enregistrement des informations dans le localStorage (string d'objets)
    registerOrder(order) {
        const stringOrderObject = JSON.stringify(order);
        this.listArray.push(stringOrderObject);
        localStorage.setItem(this.keyStorage, JSON.stringify(this.listArray));
    }
}