// Recherche de la commande avec le paramètre de requête URL
let url = new URL(document.location.href);
let params = new URLSearchParams(url.search);
let idOrder = params.get('orderId');

console.log(idOrder);
if (!idOrder) {
    alert('Aucune commande en cours');
} else {
    document.getElementById('order-number').textContent = idOrder;
    let order = new Order();
    order.setKeyStorage('order');
    order.getList();
    
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

