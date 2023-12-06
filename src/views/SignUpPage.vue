<template>
    <div class="w-screen h-screen relative bg-gradient-to-r from-[#FFBB5C] to-[#E25E3E]">
        <div
            class="bg-white flex gap-1 w-[70vw] absolute translate-x-[-50%] translate-y-[-50%] top-1/2 left-1/2 rounded p-3 overflow-hidden">
            <div class="flex-1">
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
                        <v-text-field label="Password" prepend-inner-icon="fa-solid fa-lock"
                            hide-details="auto"></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-text-field label="Confirm password" prepend-inner-icon="fa-solid fa-lock"
                            hide-details="auto"></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-btn block>Sign Up</v-btn>
                        <div>Already have an account?<span class="font-bold underline whitespace-nowrap">Login here</span>
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
    </div>
</template>

<script setup lang="ts">
import Loading from '@/components/Loading.vue';
import { ref } from 'vue'
import imgurApi from '@/apis/imgurApi'
import type { accountBody } from '@/apis/accountApi'
import { fa } from 'vuetify/iconsets/fa';

const account = ref<accountBody>({
    email: '',
    username: '',
    password: '',
    avatar: 'https://i.imgur.com/t9Y4WFN.jpg',
    isAdmin: false,
})

const fileInput = ref();
const isShowLoading = ref(false);

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

</script>
<style scoped>
.lds-dual-ring {
    display: inline-block;
    width: 80px;
    height: 80px;
  }
  .lds-dual-ring:after {
    content: " ";
    display: block;
    width: 64px;
    height: 64px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid #fff;
    border-color: #fff transparent #fff transparent;
    animation: lds-dual-ring 1.2s linear infinite;
  }
  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
