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

    // Affichage du titre de la page de commande
    printOrderTitle(title) {
        document.querySelector('.order-msg__title').textContent = title;
    }

    // Affichage du template des cards de commande (recap + coordonnées)
    printOrderTemplate(id) {
        let template = document.querySelector(id);
        let host = document.querySelector('.main-order');
        let clone = document.importNode(template.content, true);
        host.appendChild(clone);
    }

    // Affichage d'une ligne de produit dans la page de commande
    printRowOrder(product) {
        document.querySelector('.order-table__body').innerHTML += `<tr>
                                                                        <td>${product.name}</td>
                                                                        <td>${product.price/100}€</td>
                                                                    </tr>`
    };

    // Affichage des coordonnées dans la page de commande
    printDelivery(contact) {
        document.querySelector('.delivery__infos').innerHTML += `<li>Nom : ${contact.firstName} ${contact.lastName}</li>
                                                                <li>Adresse : ${contact.address}</li>
                                                                <li>Ville : ${contact.city}</li>
                                                                <li>Email : ${contact.email}</li>`
    }

    // Affichage d'un lien de commande dans la liste des commandes précédentes
    printOldOrder(url, orderId) {
        document.querySelector('.order-list__items').innerHTML += `<li>
                                                                <a href='order.html?${url}'>Commande n°${orderId}</a>
                                                                </li>`
    }
}