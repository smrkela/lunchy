import httpService from "../services/HttpService";

export default class UsersApi {

    static async loadUser(userId) {

        const userResponse = await httpService.get("users/" + userId);

        return { ...userResponse.data, uid: userId };
    }

}