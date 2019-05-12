export default class FirebaseUtils {

    static toArray(data, idPropName = "id") {

        if (!data)
            return [];

        const result = [];

        for (let key in data) {

            result.push({ ...data[key], [idPropName]: key })
        }

        return result;
    }

}