import Vue from "vue";
import Router from "vue-router";
import store from "../store";
import routes from "./routes";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: routes
});

router.beforeEach((to, from, next) => {

  if (to.matched.some(record => record.meta.authRequired)) {
    if (!store.state.isAuthenticated) {
      next({ path: "/signin" });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.authNotSupported)) {
    if (store.state.isAuthenticated) {
      next({ path: "/user-home" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;