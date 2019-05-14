import HomePage from "../views/home/HomePage.vue";

export default [
    {
        path: "/",
        name: "home",
        component: HomePage
    },
    {
        path: "/about",
        name: "about",
        component: () => import("../views/About.vue")
    },
    {
        path: "/signin",
        name: "signin",
        component: () => import("../views/signin/SigninPage.vue"),
        meta: {
            authNotSupported: true
        }
    },
    {
        path: "/register",
        name: "register",
        component: () => import("../views/register/RegisterPage.vue"),
        meta: {
            authNotSupported: true
        }
    },
    {
        path: "/user-home",
        name: "userHome",
        component: () => import("../views/userhome/UserHomePage.vue"),
        meta: {
            authRequired: true
        }
    },
    {
        path: "/groups",
        name: 'groups',
        component: () => import("../views/groups/GroupsPage.vue"),
        meta: {
            authRequired: true
        }
    },
    {
        path: "/user-profile",
        name: 'userProfile',
        component: () => import("../views/userprofile/UserProfilePage.vue"),
        meta: {
            authRequired: true
        }
    }
];