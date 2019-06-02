import firebase from "firebase";
import httpService from "../../services/HttpService";
import UsersApi from "../../api/UsersApi";

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
            const user = await UsersApi.loadUser(signInResponse.user.uid);

            dispatch('setUser', user, { root: true });
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