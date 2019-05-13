import firebase from "firebase";
import httpService from "../../services/HttpService";

const state = {
    user: {},
    saving: false
};

const mutations = {
    loadPending(state) {
        state.user = { email: "", password: "" }
        state.saving = false;
    },
    loadComplete(state) {

    },
    updateProps(state, updatedProps) {
        state.user = Object.assign(state.user, updatedProps);
    },
    savePending(state) {
        state.saving = true;
    }
};

const actions = {
    load({ commit }) {
        commit("loadPending");
        commit("loadComplete");
    },
    updateProps({ commit }, updatedProps) {
        commit("updateProps", updatedProps);
    },
    async save({ commit, state, dispatch }) {

        commit("savePending");

        try {
            const signInResponse = await firebase.auth().signInWithEmailAndPassword(state.user.email, state.user.password);
            const userResponse = await httpService.get("users/" + signInResponse.user.uid);

            dispatch('setUser', { ...userResponse.data, uid: signInResponse.user.uid }, { root: true });
        }
        catch (error) {

            console.log("Error signing in:", error);

            dispatch('setUser', null, { root: true });
        }

    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};