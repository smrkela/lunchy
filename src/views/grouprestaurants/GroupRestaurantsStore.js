import listStore from "../../store/listStore";

const state = listStore.state();

const mutations = {
    loadPending: listStore.mutations.loadPending,
    loadComplete: listStore.mutations.loadComplete,
    showInsertDialog: listStore.mutations.showInsertDialog,
    closeDialog: listStore.mutations.closeDialog,
    showEditDialog: listStore.mutations.showEditDialog
}

const actions = {
    load: listStore.actions.load((state, groupId, rootState) => "group-restaurants/" + groupId),
    showInsertDialog: listStore.actions.showInsertDialog,
    closeDialog: listStore.actions.closeDialog,
    showEditDialog: listStore.actions.showEditDialog,
    dialogSaved({ commit, state, dispatch }) {
        dispatch("closeDialog");
        dispatch("load", state.params);
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
};