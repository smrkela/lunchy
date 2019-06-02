import "@babel/polyfill";
import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./routing/router";
import store from "./store";
import "./firebase";
import firebase from "firebase";
import UsersApi from "./api/UsersApi";

Vue.config.productionTip = false;

let app;

const initialize = () => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
}

firebase.auth().onAuthStateChanged(async fbUser => {

  if (fbUser) {
    const user = await UsersApi.loadUser(fbUser.uid);
    store.commit("setUser", user);
  } else {
    store.commit("setUser", null);
  }

  initialize();
});