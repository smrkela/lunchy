import httpService from "../../services/HttpService";

const state = {
    loading: false,
    group: {},
    members: [],
    newMemberEmail: "",
    loadingNewMember: false
}

const mutations = {
    loadPending(state, group) {
        state.group = group;
        state.loading = true;
    },
    loadComplete(state, payload) {
        state.members = payload.members;
        state.loading = false;
    },
    emailInput(state, emailValue) {
        state.newMemberEmail = emailValue;
    },
    addMemberPending(state) {
        state.loadingNewMember = true;
    },
    addMemberComplete(state) {
        // TODO: add new member to the existing members array
        state.loadingNewMember = false;
    }
}

const actions = {
    async load({ commit }, group) {
        commit("loadPending", group);
        const members = group.members;
        // We load each member as a user
        const promises = members.map(it => httpService.get("users/" + it.userId));

        const result = await Promise.all(promises);

        const loadedMembers = result.map(it => it.data);

        // Add user id to each loaded member
        loadedMembers.forEach((it, index) => it.userId = members[index].userId);

        commit("loadComplete", { members: loadedMembers });
    },
    dialogSaved({ commit, state, dispatch }) {
        dispatch("closeDialog");
        dispatch("load", state.params);
    },
    emailInput({ commit }, emailValue) {
        commit("emailInput", emailValue);
    },
    async addMember({ commit, state }) {
        commit("addMemberPending");
        const email = state.newMemberEmail;
        const response = await httpService.get("users", `?orderBy="email"&equalTo="${email}"`);
        
        const user = response.data;

        console.log("USER: ", user);
        //const result = httpService.get("users")
        //commit("addMemberComplete");
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
};