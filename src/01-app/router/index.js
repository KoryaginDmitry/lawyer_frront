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
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;