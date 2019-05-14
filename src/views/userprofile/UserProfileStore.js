import httpService from "../../services/HttpService";

const state = {
    item: {},
    loading: false,
    saving: false,
    saved: false
}

const mutations = {
    loadPending(state) {
        state.item = {};
        state.loading = true;
        state.saved = false;
    },
    loadComplete(state, payload) {
        state.item = payload;
        state.loading = false;
    },
    savePending(state) {
        state.saving = true;
    },
    saveComplete(state, item) {
        state.saving = false;
        state.saved = true;
    },
    updateItem(state, updatedProps) {
        state.item = Object.assign(state.item, updatedProps);
    }
}

const actions = {
    load({ commit, rootState }, itemId) {
        commit("loadPending");
        commit("loadComplete", rootState.user);
    },
    async save({ commit, state, rootState }) {
        commit("savePending");

        const user = { ...state.item };

        //remove user uid as it's no necessary in the object itself
        user.uid = undefined;

        const response = await httpService.put("users/" + state.item.uid, user);

        commit("saveComplete", response.data);
    },
    updateItem({ commit }, updatedProps) {
        commit("updateItem", updatedProps);
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
};