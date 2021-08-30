class Camera {
    constructor(jsonCamera) {
        jsonCamera && Object.assign(this, jsonCamera);
    }

    getFormatedPrice(price) {
        return (price/100);
    }

    getQueryUrl() {
        let queryUrl = new URLSearchParams();
        queryUrl.append('id', this._id);
        return queryUrl.toString();
    }
}
