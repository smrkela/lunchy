import firebase from "firebase";
import httpService from "../../services/HttpService";

const state = {
    user: {},
    saving: false
};

const mutations = {
    loadPending(state) {
        state.user = { firstName: "", lastName: "", email: "", password: "" }
    },
    loadComplete(state) {

    },
    updateProps(state, updatedProps) {
        state.user = Object.assign(state.user, updatedProps);
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
    save({ commit, state, dispatch }) {
        firebase.auth()
            .createUserWithEmailAndPassword(state.user.email, state.user.password)
            .then(data => {
                const userId = data.user.uid;
                const userProfile = {
                    firstName: state.user.firstName,
                    lastName: state.user.lastName
                }
                httpService.put("users/" + userId, userProfile)
                    .then(data => {
                        dispatch('setUser', { ...state.user, uid: userId }, { root: true });
                        dispatch('setIsAuthenticated', true, { root: true });
                    });
            })
            .catch(() => {
                dispatch('setUser', null, { root: true });
                dispatch('setIsAuthenticated', false, { root: true });
            });
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};