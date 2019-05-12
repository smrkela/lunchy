import Vue from "vue";
import Router from "vue-router";
import HomePage from "./views/home/HomePage.vue";
import store from "./store";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage
    },
    {
      path: "/about",
      name: "about",
      component: () => import("./views/About.vue")
    },
    {
      path: "/signin",
      name: "signin",
      component: () => import("./views/Signin.vue")
    },
    {
      path: "/register",
      name: "register",
      component: () => import("./views/register/RegisterPage.vue")
    },
    {
      path: "/user-home",
      name: "userHome",
      component: () => import("./views/userhome/UserHomePage.vue")
    },
    {
      path: "/groups",
      name: 'groups',
      component: () => import("./views/groups/GroupsPage.vue"),
      meta: {
        authRequired: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {

  if (to.matched.some(record => record.meta.authRequired)) {
    if (!store.state.isAuthenticated) {
      next({ path: "/signin" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;