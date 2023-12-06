<template>
    <div class="w-screen h-screen relative bg-gradient-to-r from-[#FFBB5C] to-[#E25E3E]">
        <v-btn variant="flat" icon @click="backToLandingPage">
            <v-icon color="white" icon="fa-solid fa-arrow-left"></v-icon>
        </v-btn>
        <div v-if="isSignUpForm"
            class="bg-white flex gap-1 w-[70vw] absolute translate-x-[-50%] translate-y-[-50%] top-1/2 left-1/2 rounded p-3 overflow-hidden">
            <div class="flex-1 ">
                <div class="text-center text-4xl font-bold">Sign Up</div>
                <v-row>
                    <v-col>
                        <v-text-field label="User name" prepend-inner-icon="fa-solid fa-user"
                            hide-details="auto"></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-text-field label="Email" prepend-inner-icon="fa-solid fa-at" hide-details="auto"></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-text-field 
                            label="Password" 
                            prepend-inner-icon="fa-solid fa-lock" 
                            hide-details="auto"
                            :type="isShowPassword ? 'text' : 'password'"
                            :append-inner-icon="isShowPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"
                            @click:append-inner="isShowPassword = !isShowPassword">
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-text-field 
                            label="Confirm password" 
                            prepend-inner-icon="fa-solid fa-lock" 
                            hide-details="auto"
                            :type="isShowConfirmPassword ? 'text' : 'password'"
                            :append-inner-icon="isShowConfirmPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"
                            @click:append-inner="isShowConfirmPassword = !isShowConfirmPassword">
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-btn @click="createAccount" block color="#f44336">Sign Up</v-btn>
                        <div class="text-center">
                            Already have an account?
                            <span @click="loginForm" class="font-bold underline whitespace-nowrap cursor-pointer">Login
                                here</span>
                        </div>
                    </v-col>
                </v-row>
            </div>
            <div class="flex relative flex-1 justify-center items-center bg-slate-400 rounded px-2">
                <div class="rounded-full w-72 h-72 overflow-hidden" @click="chooseAvatar">
                    <v-img :src="account.avatar" width="100%" height="100%" cover></v-img>
                </div>
                <input type="file" ref="fileInput" style="display: none;" @change="handleFileChange" />
                <Loading v-if="isShowLoading"></Loading>
            </div>
        </div>

        <LoginForm @signUp="signUpForm" @closeForm="signUpForm" v-else></LoginForm>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Loading from '@/components/Loading.vue';
import LoginForm from '@/components/LoginForm.vue'
import imgurApi from '@/apis/imgurApi'
import accountApi from '@/apis/accountApi'
import type { accountBody } from '@/apis/accountApi'
import { useRouter } from 'vue-router';

const account = ref<accountBody>({
    email: '',
    username: '',
    password: '',
    avatar: 'https://i.imgur.com/t9Y4WFN.jpg',
})
const confirmPassword = ref('');

const fileInput = ref();
const isShowLoading = ref(false);
const isSignUpForm = ref(true);
const router = useRouter();
const isShowPassword = ref(false);
const isShowConfirmPassword = ref(false);

function chooseAvatar() {
    fileInput.value.click();
};

async function handleFileChange(event: any) {
    try {
        const file = (event.target as HTMLInputElement)?.files?.[0];

        if (!file) {
            return;
        }
        isShowLoading.value = true;
        const formData = new FormData();
        formData.append('avatar', file);

        const response = await imgurApi.upload(formData);
        console.log(response.data);
        account.value.avatar = response.data;
        isShowLoading.value = false;
    } catch (error) {
        console.error('Error uploading image:', error);
    }
}

function loginForm() {
    isSignUpForm.value = false;
}

function signUpForm() {
    isSignUpForm.value = true;
}

function backToLandingPage() {
    router.push("/");
}

async function createAccount() {
    try {
        const data = await accountApi.registerAccount(account.value);
    } catch (error) {
        console.error(error);
    }
}

</script>
<style scoped></style>
