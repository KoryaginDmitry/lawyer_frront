import { defineStore } from "pinia";
import loginConfig from "@/04-features/login/requestConfig.js";
import router from "@/01-app/router";

export const useUserStore = defineStore("user", {
    state: () => ({
        id: "",
        name: "",
        email: "",
        telegram: "",
        avatar: "",
        currentPlan: null,
        token: null,         // токен
        loading: false,
        error: null,
        backendErrors: {},
    }),

    getters: {
        isAuth: (state) => !!state.token && !!state.email,
        isSubscriptionActive: (state) =>
            !!state.currentPlan && !!state.currentPlan.id,
    },

    actions: {
        setUser(user) {
            this.id = user.id || "";
            this.name = user.name || "";
            this.email = user.email || "";
            this.telegram = user.telegram_account || "";
            this.avatar = user.avatar || "";
            this.currentPlan = user.current_plan || null;
        },

        clearUser() {
            this.id = "";
            this.name = "";
            this.email = "";
            this.telegram = "";
            this.currentPlan = null;
            this.avatar = "";
            this.token = null;
            this.error = null;
            this.backendErrors = {};
        },

        async login(payload) {
            this.loading = true;
            this.error = null;
            this.backendErrors = {};

            try {
                const res = await fetch(loginConfig.POSTLogin.url, {
                    method: loginConfig.POSTLogin.type.toUpperCase(),
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                });

                const data = await res.json();

                if (!res.ok) {
                    if (data.errors) this.backendErrors = data.errors;
                    else this.error = data.message || "Ошибка логина";
                    throw new Error(this.error || JSON.stringify(data.errors));
                }

                // сохраняем токен и профиль
                this.token = data.token;
                this.setUser(data.data);

                return data;
            } catch (e) {
                console.error("Login error:", e);
                throw e;
            } finally {
                this.loading = false;
            }
        },

        async checkAuth() {
            if (!this.token) {
                this.clearUser();
                return false;
            }
            try {
                const res = await fetch(loginConfig.GETUser.url, {
                    headers: { Authorization: `Bearer ${this.token}` },
                });
                if (!res.ok) {
                    // токен больше не валиден или пользователь удалён
                    this.clearUser();
                    return false;
                }
                const data = await res.json();
                this.setUser(data.data);
                return true;
            } catch (e) {
                console.error("Auth check error:", e);
                this.clearUser();
                return false;
            }
        },

        logout() {
            this.clearUser();
            router.push({ name: "HomePage" });
        },
    },

    persist: {
        key: "user-store",
        storage: localStorage,
        paths: ["token", "id", "name", "email", "telegram", "avatar", "currentPlan"]
    }
});