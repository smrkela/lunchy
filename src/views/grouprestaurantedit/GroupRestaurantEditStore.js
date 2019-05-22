import editStore from "../../store/editStore";

const groupRestaurantInitializer = () => ({ name: "", description: "" });

const insertGroupRestaurantFactory = (state, rootState) => {

    const userId = rootState.user.uid;

    const group = {
        ...state.item,
        author: userId,
        created: new Date().getTime(),
    };

    return group;
}

const updateGroupRestaurantFactory = (state, rootState) => ({ ...state.item });

const state = editStore.state({ groupId: null });

const mutations = {
    loadPending(state, { itemId, groupId }) {
        state.groupId = groupId;
        editStore.mutations.loadPending(state, itemId);
    },
    loadComplete: editStore.mutations.loadComplete,
    savePending: editStore.mutations.savePending,
    saveComplete: editStore.mutations.saveComplete,
    updateItem: editStore.mutations.updateItem
}

const actions = {
    async load({ commit, state, rootState }, { itemId, groupId }) {

        commit("loadPending", { itemId, groupId });

        if (itemId) {
            const response = await httpService.get("group-restaurants/" + groupId + "/" + itemId);
            commit("loadComplete", response.data);
        } else {
            commit("loadComplete", groupRestaurantInitializer(state, rootState));
        }
    },
    save: editStore.actions.save((state) => "group-restaurants/" + state.groupId, insertGroupRestaurantFactory, updateGroupRestaurantFactory),
    updateItem: editStore.actions.updateItem
}


export default {
    namespaced: true,
    state,
    mutations,
    actions
};