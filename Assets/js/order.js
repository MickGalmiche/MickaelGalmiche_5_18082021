// Recherche de la commande avec le paramètre de requête URL
let url = new URL(document.location.href);
let params = new URLSearchParams(url.search);
let idOrder = params.get('orderId');
let order = new Order('order');

if (!idOrder) {

    // Récupération du template de la commande
    let template = document.querySelector('#order-invalid');
    let host = document.querySelector('.main-order');
    let clone = document.importNode(template.content, true);
    host.appendChild(clone);

    document.querySelector('.order-msg__title').textContent = "Aucune commande";

    order.listArray.forEach( orderArrayItem => {
        let orderItem = JSON.parse(orderArrayItem);

        // Création de l'url+ID de commande
        let queryOrderLink = new URLSearchParams();
        queryOrderLink.append('orderId', orderItem.orderId)
        queryOrderLink.toString();

        document.querySelector('.order-list__items').innerHTML += `<li>
                                                                    <a href='order.html?${queryOrderLink}'>Commande n°${orderItem.orderId}</a>
                                                                </li>`

        /* document.querySelector('.order-list__items').appendChild(listItem);
        document.querySelector('.order-list__items li').appendChild(listItemLink).setAttribute('href', `order.html?${queryOrderLink}`);
        document.querySelector('.order-list__items li a').textContent = `Commande n° ${orderItem.orderId}` */
    })

} else {
    document.querySelector('.order-msg__title').textContent = "Merci pour votre commande !";

    // Récupération du template de la commande
    let template = document.querySelector('#order-valid');
    let host = document.querySelector('.main-order');
    let clone = document.importNode(template.content, true);
    host.appendChild(clone);

    document.getElementById('order-number').textContent = idOrder;
    
    order.listArray.forEach( orderArrayItem => {
        let orderItem = JSON.parse(orderArrayItem);
        if (orderItem.orderId == idOrder) {
            let products = orderItem.products;        
            products.forEach( product => {
                order.printRowOrder(product);
            })
            
            let contact = orderItem.contact;
            order.printDelivery(contact);
            
        }
    });
}

