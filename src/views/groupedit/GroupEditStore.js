import httpService from "../../services/HttpService";

const state = {
    itemId: null,
    item: {},
    loading: false,
    saving: false,
    isInsert: false,
    saved: false
}

const mutations = {
    loadPending(state, itemId) {
        state.itemId = itemId;
        state.item = {};
        state.isInsert = !itemId;
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
    load({ commit }, itemId) {
        commit("loadPending", itemId);
        if (itemId) {
            httpService.get("groups/" + itemId)
                .then(data => commit("loadComplete", data.data));
        } else {
            commit("loadComplete", { name: "", description: "", color: "cyan" });
        }
    },
    save({ commit, state }) {
        commit("savePending");

        let promise;

        if (state.isInsert)
            promise = httpService.post("groups", { ...state.item, author: "Sasa Mrkela" });
        else
            promise = httpService.put("groups/" + state.itemId, state.item);

        promise.then(data => commit("saveComplete", data.data));
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