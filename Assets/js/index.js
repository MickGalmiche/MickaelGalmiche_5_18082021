const urlApi = 'http://localhost:3000/api/cameras'

// Requête API pour la liste de produits
fetch(urlApi)
    .then(responseApi)
    .then(data => data.json())
    .then(jsonListCamera => {

        // Récupération du template de la carte Produit
        let template = document.querySelector('#product-list-item');
        let host = document.querySelector('#product-list');
        
        // Boucle listant chaque produit et créant un objet
        // Injection des valeurs de l'objet dans le template
        for(let jsonCamera of jsonListCamera) {
            let camera = new Camera(jsonCamera);
            camera.printCameraCard(template, host);
        }
    })
    .catch(error => {
        document.getElementById('product-list').innerHTML = '<p>Aucun article disponible !</p>';
        console.log(`${error.status} : ${error.statusText} - Mauvaise requête API`);
    })

function responseApi(response) {
    if (!response.ok) {
        // throw Error(response.statusText);
        return Promise.reject({
            status: response.status,
            statusText: response.statusText
        })
    } else {
        return response;
    }
}

/* function responseApi(response) {
    let contentType = response.headers.get('content-type');
    if (contentType.includes('application/json')) {
        return responseJsonApi(response);
    } else if (contentType.includes('text/html')) {
        return responseTextApi(response);
    } else {
        throw new Error(`Désolé, content-type ${contentType} non supporté`);
    }
}

function responseJsonApi(response) {
    return response.json()
        .then(json => {
            if (response.ok) {
                return json;
            } else {
                return Promise.reject(Object.assign({}, json, {
                    status: response.status,
                    statusText: response.statusText,
                    err: text
                }))
            }
        })
} */