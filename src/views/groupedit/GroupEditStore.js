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
    save({ commit, state, rootState }) {
        commit("savePending");

        let promise;

        const userId = rootState.user.uid;

        const group = {
            ...state.item
        }

        if (state.isInsert) {
            group.author = userId;
            group.created = new Date().getTime();
            group.members = { userId: userId, author: userId, created: new Date().getTime() };
            promise = httpService.post("groups", group);
        }
        else {
            promise = httpService.put("groups/" + state.itemId, group);
        }

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