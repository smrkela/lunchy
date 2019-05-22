import editStore from "../../store/editStore";

const groupInitializer = () => ({ name: "", description: "", color: "cyan" });

const insertGroupFactory = (state, rootState) => {

    const userId = rootState.user.uid;

    const group = {
        ...state.item,
        author: userId,
        created: new Date().getTime(),
        members: [{ userId: userId, author: userId, created: new Date().getTime() }],
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
    save: editStore.actions.save("groups", insertGroupFactory, updateGroupFactory),
    updateItem: editStore.actions.updateItem
}


export default {
    namespaced: true,
    state,
    mutations,
    actions
};