import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import firebase from "firebase";
import router from "./routing/router";

import groupsStore from "./views/groups/GroupsStore";
import groupEditStore from "./views/groupedit/GroupEditStore";
import registerStore from "./views/register/RegisterStore";
import signinStore from "./views/signin/SigninStore";
import userProfileStore from "./views/userprofile/UserProfileStore";
import userHomeStore from "./views/userhome/UserHomeStore";
import groupHomeStore from "./views/grouphome/GroupHomeStore";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Groups: groupsStore,
    GroupEdit: groupEditStore,
    Register: registerStore,
    Signin: signinStore,
    UserProfile: userProfileStore,
    UserHome: userHomeStore,
    GroupHome: groupHomeStore
  },
  state: {
    user: null,
    isAuthenticated: false
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      state.isAuthenticated = !!user;
    },

  },
  getters: {
    isAuthenticated(state) {
      return !!state.user;
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
    userSignOut({ commit }) {
      firebase
        .auth()
        .signOut()
        .then(() => {
          commit('setUser', null);
          router.push('/');
        })
        .catch(() => {
          commit('setUser', null);
          router.push('/');
        });
    }

  }
});
