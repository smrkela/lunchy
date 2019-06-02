import httpService from "../../services/HttpService";
import GroupsApi from "../../api/GroupsApi";

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
    addMemberComplete(state, user) {
        state.members.push(user);
        state.newMemberEmail = "";
        state.loadingNewMember = false;
    }
}

const actions = {
    async load({ commit }, group) {
        commit("loadPending", group);
        const groupId = group.id;

        const groupMembers = await httpService.get("group-members/" + groupId);
        const userIds = Object.keys(groupMembers.data);

        // We load each member as a user
        const promises = userIds.map(it => httpService.get("users/" + it));

        const result = await Promise.all(promises);

        const loadedMembers = result.map(it => it.data);

        // Add user id to each loaded member
        loadedMembers.forEach((it, index) => it.userId = userIds[index]);

        commit("loadComplete", { members: loadedMembers });
    },
    dialogSaved({ commit, state, dispatch }) {
        dispatch("closeDialog");
        dispatch("load", state.params);
    },
    emailInput({ commit }, emailValue) {
        commit("emailInput", emailValue);
    },
    async addMember({ commit, state, rootState }) {
        commit("addMemberPending");

        const email = state.newMemberEmail;
        const response = await httpService.get("users", `?orderBy="email"&equalTo="${email}"`);

        const userNode = response.data;
        const userId = Object.keys(userNode)[0];

        if (!userId) {

            // TODO: Show notification in some way that there is no user for the entered email

        } else {

            const user = { ...userNode[userId], userId };

            await GroupsApi.addGroupMember(state.group.id, userId, rootState.user.uid);

            commit("addMemberComplete", user);
        }
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
};