module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:vue/vue3-recommended",
        "prettier", // чтобы Prettier не конфликтовал с ESLint
    ],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    rules: {
        "vue/multi-word-component-names": "off", // чтобы <App.vue> не ругался
    },
};