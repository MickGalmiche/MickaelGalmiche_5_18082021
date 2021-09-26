// Recherche de la commande avec le paramètre de requête URL
let url = new URL(document.location.href);
let params = new URLSearchParams(url.search);
let idOrder = params.get('orderId');
let order = new Order('order');

let regex = /^(\w+-){4}\w{12}$/;
// ^\w{8}-(\w{4}-){3}\w{12}$
// \b\w{8}-(\b\w{4}-){3}\b\w{12}

if (!idOrder || !regex.test(idOrder)) {

    // Récupération du template de la commande
    order.printOrderTitle('Aucune commande !');
    order.printOrderTemplate('#order-invalid');

    order.listArray.forEach( orderArrayItem => {
        let orderItem = JSON.parse(orderArrayItem);

        // Création de l'url+ID de commande
        let queryOrderLink = new URLSearchParams();
        queryOrderLink.append('orderId', orderItem.orderId)
        queryOrderLink.toString();
        order.printOldOrder(queryOrderLink, orderItem.orderId);
        
    })

} else if (regex.test(idOrder)) {

    // Récupération du template de la commande
    order.printOrderTitle('Merci pour votre commande !');
    order.printOrderTemplate('#order-valid');
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

