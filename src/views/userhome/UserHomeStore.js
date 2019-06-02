import httpService from "../../services/HttpService";
import FirebaseUtils from "../../utils/FirebaseUtils";
import GroupsApi from "../../api/GroupsApi";

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

        const groups = await GroupsApi.loadByUserId(rootState.user.uid);

        commit("loadComplete", { groups });
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
}