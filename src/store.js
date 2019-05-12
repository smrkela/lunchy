import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import firebase from "firebase";
import router from "@/router";

import groupsStore from "./views/groups/GroupsStore";
import groupEditStore from "./views/groupedit/GroupEditStore";
import registerStore from "./views/register/RegisterStore";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Groups: groupsStore,
    GroupEdit: groupEditStore,
    Register: registerStore
  },
  state: {
    user: null,
    isAuthenticated: false
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setIsAuthenticated(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
    }
  },
  getters: {
    isAuthenticated(state) {
      return state.user !== null && state.user !== undefined;
    }
  },
  actions: {
    setUser({ commit }, user) {
      commit("setUser", user);

      if (user)
        router.push("/user-home");
      else
        router.push("/");

    },
    setIsAuthenticated({ commit }, isAuthenticated) {
      commit("setIsAuthenticated", isAuthenticated);
    },
    userLogin({ commit }, { email, password }) {
      firebase.auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => {
          commit('setUser', user);
          commit('setIsAuthenticated', true);
          router.push("/user-home");
        })
        .catch(() => {
          commit('setUser', null);
          commit('setIsAuthenticated', false);
          router.push("/");
        });
    },
    userSignOut({ commit }) {
      firebase
        .auth()
        .signOut()
        .then(() => {
          commit('setUser', null);
          commit('setIsAuthenticated', false);
          router.push('/');
        })
        .catch(() => {
          commit('setUser', null);
          commit('setIsAuthenticated', false);
          router.push('/');
        });
    }

  }
});
