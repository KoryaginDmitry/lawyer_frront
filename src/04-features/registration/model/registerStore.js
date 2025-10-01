import { defineStore } from 'pinia'
import registerConfig from '../requestConfig'

export const useRegisterStore = defineStore('register', {
    state: () => ({
        loading: false,
        error: null,
        backendErrors: {},
    }),

    actions: {
        async register(payload) {
            this.loading = true
            this.error = null
            this.backendErrors = {}

            try {
                const res = await fetch(registerConfig.POSTReg.url, {
                    method: registerConfig.POSTReg.type.toUpperCase(),
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify(payload),
                })

                const data = await res.json()

                if (!res.ok) {
                    if (data.errors) this.backendErrors = data.errors
                    else this.error = data.message || 'Ошибка регистрации'
                    throw new Error(this.error || JSON.stringify(data.errors))
                }

                return data
            } catch (e) {
                this.error = e.message
                throw e
            } finally {
                this.loading = false
            }
        },

        clearBackendErrors() {
            this.backendErrors = {}
        },

        setBackendErrors(errors) {
            this.backendErrors = errors
        }
    }
})