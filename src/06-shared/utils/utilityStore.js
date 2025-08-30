import { defineStore } from "pinia";

export const useUtilityStore = defineStore("utility", {
    state: () => ({
        windowWidth: 0,
        isSidebarOpen: true,
    }),
    actions: {
        // updateBodyOverflow() {
        //     if (!this.isSidebarOpen && this.isWindowTabletSize) {
        //         document.body.style.overflow = "hidden";
        //     } else {
        //         document.body.style.overflow = "";
        //     }
        // },
    },
    getters: {
        isWindowPhoneSize(state) {
            return state.windowWidth < 575.98;
        },
        isWindowTabletSize(state) {
            return state.windowWidth < 767.98;
        },
        isWindowTabletMaxSize(state) {
            return state.windowWidth < 991.98;
        },
        isWindowLaptopSize(state) {
            return state.windowWidth < 1199.98;
        },
        isWindowLaptopMaxSize(state) {
            return state.windowWidth < 1399.98;
        },
        isWindowDesktopSize(state) {
            return state.windowWidth < 1699.98;
        },
    },
});
