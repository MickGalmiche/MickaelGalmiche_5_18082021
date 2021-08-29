class Camera {
    constructor(jsonCamera) {
        jsonCamera && Object.assign(this, jsonCamera);
    }

    getFormatedPrice() {

    }

    getQueryUrl() {
        let queryUrl = new URLSearchParams();
        queryUrl.append('id', this._id);
        return queryUrl.toString();
    }
}
