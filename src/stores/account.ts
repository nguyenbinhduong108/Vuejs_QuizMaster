import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { accountProps } from '@/apis/accountApi';

const useAccountStore = defineStore('account', {
    state: () => ({
        account: {
            id: "",
            email: "",
            username: "",
            avatar: "",
            isAdmin: false,
        } as accountProps
    }),
    getters: {
        isAdmin(): boolean {
            return this.account && this.account.isAdmin === true;
        },
    },
    actions: {
        login(account: accountProps) {
            this.account = account;
        },

        logout(){
            this.account = {
                id: "",
                email: "",
                username: "",
                avatar: "",
                isAdmin: false,
            }
        }
    }
})

export default useAccountStore;