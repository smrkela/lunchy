import httpService from "../../services/HttpService";
import FirebaseUtils from "../../utils/FirebaseUtils";

const state = {
    items: [],
    loading: false,
    dialogVisible: false,
    dialogEditing: false,
    dialogLoading: false,
    itemId: null
}

const mutations = {
    loadPending(state, payload) {
        state.loading = true;
    },
    loadComplete(state, payload) {
        state.items = payload;
        state.loading = false;
    },
    showInsertDialog(state, payload) {
        state.itemId = null;
        state.dialogEditing = false;
        state.dialogVisible = true;
    },
    closeDialog(state) {
        state.dialogVisible = false;
    },
    showEditDialog(state, itemId) {
        state.itemId = itemId;
        state.dialogEditing = true;
        state.dialogVisible = true;
    }
}

const actions = {
    async load({ commit, rootState }) {
        commit("loadPending");
        const data = await httpService.get("groups", `?orderBy="members/userId"&equalTo${rootState.user.uid}`);
        commit("loadComplete", FirebaseUtils.toArray(data.data))
    },
    showInsertDialog({ commit }) {
        commit("showInsertDialog");
    },
    closeDialog({ commit }) {
        commit("closeDialog");
    },
    showEditDialog({ commit }, itemId) {
        commit("showEditDialog", itemId);
    },
    dialogSaved({ commit, dispatch }) {
        dispatch("closeDialog");
        dispatch("load");
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
};