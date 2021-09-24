class Order extends Storage {

    constructor(key) {
        super();
        super.setKeyStorage(key);
        super.getList();
    }

    // Evènement sur le bouton de commande
    // Enregistrement des informations dans le localStorage (string d'objets)
    registerOrder(order) {
        const stringOrderObject = JSON.stringify(order);
        this.listArray.push(stringOrderObject);
        localStorage.setItem(this.keyStorage, JSON.stringify(this.listArray));
    };

    // Affichage d'une ligne de produit dans la page de commande
    printRowOrder(product) {
        document.querySelector('.order-table__body').innerHTML += `<tr>
                                                                        <td>${product.name}</td>
                                                                        <td>${product.price/100}€</td>
                                                                    </tr>`
    };

    // Affichage des coordonnées dans la page de commande
    printDelivery(contact) {
        document.querySelector('.delivery__infos').innerHTML += `<li>${contact.firstName} ${contact.lastName}</li>
                                                                <li>${contact.address}</li>
                                                                <li>${contact.city}</li>
                                                                <li>${contact.email}</li>`
    }
}