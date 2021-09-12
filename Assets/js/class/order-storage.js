class Order extends Storage {

    // Evènement sur le bouton de commande
    // Enregistrement des informations dans le localStorage (string d'objets)
    registerOrder(order) {
        const stringOrderObject = JSON.stringify(order);
        this.listArray.push(stringOrderObject);
        localStorage.setItem(this.keyStorage, JSON.stringify(this.listArray));
    };

    printRowOrder(product) {
        document.querySelector('.order-table__body').innerHTML += `<tr>
                                                                        <td>${product.name}</td>
                                                                        <td>${product.price/100}€</td>
                                                                    </tr>`
    };

    printDelivery(contact) {
        document.querySelector('.delivery__infos').innerHTML += `<li>${contact.firstName} ${contact.lastName}</li>
                                                                <li>${contact.address}</li>
                                                                <li>${contact.city}</li>
                                                                <li>${contact.email}</li>`
    }
}