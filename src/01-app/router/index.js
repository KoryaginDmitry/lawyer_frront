import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {
        path: "/",
        name: "HomePage",
        component: () =>
            import("@/02-pages/main-page/ui/MainPage.vue"),
    },
    {
        path: "/help",
        name: "HelpPage",
        component: () =>
            import("@/02-pages/faq-page/ui/FaqPage.vue"),
    },
    {
        path: "/subs",
        name: "SubsPage",
        component: () =>
            import("@/02-pages/subs-page/ui/SubsPage.vue"),
    },
    {
        path: "/chat",
        name: "ChatPage",
        component: () =>
            import("@/02-pages/chat-page/ui/ChatPage.vue"),
    },
    {
        path: "/profile",
        name: "ProfilePage",
        component: () =>
            import("@/02-pages/profile-page/ui/ProfilePage.vue"),
    },
    {
        path: "/login",
        name: "LoginPage",
        component: () =>
            import("@/02-pages/login-page/ui/LoginPage.vue"),
    },
    {
        path: "/reset-password",
        name: "ResetPass",
        component: () =>
            import("@/02-pages/reset-pass/ui/ResetPass.vue"),
    },
    {
        path: "/registration",
        name: "RegPage",
        component: () =>
            import("@/02-pages/reg-page/ui/RegPage.vue"),
    },
    {
        path: "/verify-email/:id/:hash",
        name: "VerifyEmailPage",
        component: () =>
            import("@/02-pages/verify-page/ui/VerifyPage.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;