class Storage {
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
}