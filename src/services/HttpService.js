import firebase from "firebase";
import axios from "axios";

const firebaseUrl = "https://lunchy-c657c.firebaseio.com/";

class HttpService {

    get(url, params) {

        const target = firebaseUrl + url + ".json" + (params || "");

        console.log("GET '" + target + "'");

        return this.wrapResult(axios.get(target));
    }

    post(url, data) {

        console.log("POST '" + url + "':", data);

        return this.wrapResult(axios.post(firebaseUrl + url + ".json", data));
    }

    put(url, data) {

        console.log("PUT '" + url + "':", data);

        return this.wrapResult(axios.put(firebaseUrl + url + ".json", data));
    }

    wrapResult(promise) {

        return promise.then(data => {

            console.log("RESULT: ", data);
            return data;
        }).catch(error => {
            console.log("ERROR: ", error);
            return error;
        });
    }
}

export default new HttpService();