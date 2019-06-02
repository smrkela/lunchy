import listStore from "../../store/listStore";
import httpService from "../../services/HttpService";
import FirebaseUtils from "../../utils/FirebaseUtils";
import GroupsApi from "../../api/GroupsApi";

const state = listStore.state({ selectedGroup: null, membersDialogVisible: false });

const mutations = {
    loadPending: listStore.mutations.loadPending,
    loadComplete: listStore.mutations.loadComplete,
    showInsertDialog: listStore.mutations.showInsertDialog,
    closeDialog: listStore.mutations.closeDialog,
    showEditDialog: listStore.mutations.showEditDialog,
    showMembersDialog(state, group) {
        state.selectedGroup = group;
        state.membersDialogVisible = true;
    },
    closeMembersDialog(state) {
        state.selectedGroup = null;
        state.membersDialogVisible = false;
    }
}

const actions = {
    async load({ commit, state, rootState }, payload) {

        commit("loadPending", payload);

        const groups = await GroupsApi.loadByUserId(rootState.user.uid);

        commit("loadComplete", groups);
    },
    showInsertDialog: listStore.actions.showInsertDialog,
    closeDialog: listStore.actions.closeDialog,
    showEditDialog: listStore.actions.showEditDialog,
    dialogSaved: listStore.actions.dialogSaved,
    showMembersDialog({ commit }, group) {
        commit("showMembersDialog", group);
    },
    membersDialogSaved({ commit }) {

    },
    closeMembersDialog({ commit }) {
        commit("closeMembersDialog");
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
};