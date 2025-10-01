import {defineStore} from 'pinia'
import registerConfig from '../requestConfig'

export const useRegisterStore = defineStore('register', {
    state: () => ({
        loading: false,
        error: null,
        backendErrors: {},
        tempId: null,
        tempHash: null,
        token: null,
    }),

    actions: {
        async register(payload) {
            this.loading = true
            this.error = null
            this.backendErrors = {}

            try {
                // 1. Регистрация
                const res = await fetch(registerConfig.POSTReg.url, {
                    method: registerConfig.POSTReg.type.toUpperCase(),
                    headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
                    body: JSON.stringify(payload),
                })

                const data = await res.json()

                if (!res.ok) {
                    if (data.errors) this.backendErrors = data.errors
                    else this.error = data.message || 'Ошибка регистрации'
                    throw new Error(this.error || JSON.stringify(data.errors))
                }

                // Сохраняем данные для верификации
                // Сохраняем данные
                this.tempId = data.data.id
                this.tempHash = data.data.hash
                this.token = data.token

                const verificationLink = `${window.location.origin}/verify-email/${this.tempId}/${this.tempHash}`;
                console.log("Ссылка для подтверждения почты:", verificationLink);

                // Отправляем письмо
                const emailRes = await fetch(registerConfig.POSTSendEmail.url, {
                    method: registerConfig.POSTSendEmail.type.toUpperCase(),
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${this.token}`,
                    },
                    body: JSON.stringify({
                        email: payload.email,
                        hash: this.tempHash,
                        id: this.tempId
                    }),
                })

                const emailData = await emailRes.json()
                if (!emailRes.ok) throw new Error(emailData.message || 'Ошибка отправки письма')

                return {registration: data, emailSent: emailData}

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