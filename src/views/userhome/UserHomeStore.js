import httpService from "../../services/HttpService";
import FirebaseUtils from "../../utils/FirebaseUtils";

const state = {
    groups: [],
    loading: false
};

const mutations = {
    loadPending(state) {
        state.groups = [];
        state.loading = true;
    },
    loadComplete(state, payload) {
        state.groups = payload.groups;
        state.loading = false;
    }
};

const actions = {
    async load({ commit, rootState }) {
        commit("loadPending");
        const response = await httpService.get("groups", `?orderBy="members/userId"&equalTo"${rootState.user.uid}"`);
        commit("loadComplete", { groups: FirebaseUtils.toArray(response.data) });
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
}