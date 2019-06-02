import editStore from "../../store/editStore";
import httpService from "../../services/HttpService";
import GroupsApi from "../../api/GroupsApi";

const groupInitializer = () => ({ name: "", description: "", color: "cyan" });

const insertGroupFactory = (state, rootState) => {

    const userId = rootState.user.uid;

    const group = {
        ...state.item,
        author: userId,
        created: new Date().getTime()
    };

    return group;
}

const updateGroupFactory = (state, rootState) => ({ ...state.item });

const state = editStore.state();

const mutations = {
    loadPending: editStore.mutations.loadPending,
    loadComplete: editStore.mutations.loadComplete,
    savePending: editStore.mutations.savePending,
    saveComplete: editStore.mutations.saveComplete,
    updateItem: editStore.mutations.updateItem
}

const actions = {
    load: editStore.actions.load("groups", groupInitializer),
    async save({ commit, state, rootState }) {

        commit("savePending");

        let response;

        if (state.isInsert) {
            const group = insertGroupFactory(state, rootState);

            response = await GroupsApi.insertGroup(group);
        }
        else {
            const group = updateGroupFactory(state, rootState);
            response = await httpService.put("groups/" + state.itemId, group);
        }

        commit("saveComplete", response.data);
    },
    updateItem: editStore.actions.updateItem
}


export default {
    namespaced: true,
    state,
    mutations,
    actions
};