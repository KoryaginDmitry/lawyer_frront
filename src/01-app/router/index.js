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
            import("@/02-pages/help-page/ui/HelpPage.vue"),
    },
    {
        path: "/referral",
        name: "ReferralPage",
        component: () =>
            import("@/02-pages/referral-page/ui/ReferralPage.vue"),
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
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;