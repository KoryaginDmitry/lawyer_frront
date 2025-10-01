import { defineStore } from "pinia";
import loginConfig from "@/04-features/login/requestConfig.js";

export const useUserStore = defineStore("user", {
    state: () => ({
        id: "",
        name: "",
        email: "",
        telegram: "",
        avatar: "",
        token: null,         // токен
        loading: false,
        error: null,
        backendErrors: {},
    }),
    getters: {
        isAuth: (state) => !!state.token && !!state.email,
    },
    actions: {
        setUser(user) {
            this.id = user.id || "";
            this.name = user.name || "";
            this.email = user.email || "";
            this.telegram = user.telegram_account || "";
            this.avatar = user.avatar || "";
        },
        clearUser() {
            this.id = "";
            this.name = "";
            this.email = "";
            this.telegram = "";
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
                throw e;
            } finally {
                this.loading = false;
            }
        },

        logout() {
            this.clearUser();
            this.$router.push({ name: "HomePage" });
        },
    },
    persist: {
        key: "user-store",
        storage: localStorage,
        paths: ["token", "id", "name", "email", "telegram", "avatar"]
    }
});