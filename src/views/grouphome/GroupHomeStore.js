import httpService from "../../services/HttpService";
import FirebaseUtils from "../../utils/FirebaseUtils";

const state = {
    group: {},
    loading: false
};

const mutations = {
    loadPending(state) {
        state.group = {};
        state.loading = true;
    },
    loadComplete(state, payload) {
        state.group = payload.group;
        state.loading = false;
    }
};

const actions = {
    async load({ commit, rootState }, groupId) {
        commit("loadPending");
        const response = await httpService.get("groups/" + groupId);
        commit("loadComplete", { group: response.data });
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
}