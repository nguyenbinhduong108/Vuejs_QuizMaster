<template>
    <div class="w-screen h-screen relative bg-gradient-to-r from-[#FFBB5C] to-[#E25E3E]">
        <div
            class="bg-white flex gap-1 w-[70vw] absolute translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] rounded p-3">
            <div class="flex-1">
                <div class="text-center text-4xl font-bold">Sign Up</div>
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
                        <v-text-field label="User name" prepend-inner-icon="fa-solid fa-user"
                            hide-details="auto"></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-btn block>Sign Up</v-btn>
                    </v-col>
                </v-row>
            </div>
            <div class="flex flex-1 justify-center items-center">
                <div class="rounded-full w-72 h-72 bg-slate-400" @click="chooseAvatar">
                    <v-img :src="account.avatar"></v-img>
                </div>
                <input type="file" ref="fileInput" style="display: none;" @change="handleFileChange" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import imgurApi from '@/apis/imgurApi'
import type { accountBody } from '@/apis/accountApi'

const account = ref<accountBody>({
    email: '',
    username: '',
    password: '',
    avatar: 'https://i.imgur.com/t9Y4WFN.jpg',
    isAdmin: false,
})

const fileInput = ref();

function chooseAvatar() {
    fileInput.value.click();
};

async function handleFileChange(event: any) {
    try {
        console.log(1)
        const file = event.file[0];
        console.log(1)

        if (!file) {
            console.warn('Không có file đc chọn');
            return;
        }
        const formData = new FormData();
        formData.append('avatar', file);
        const response = await imgurApi.upload(formData);

        const imgUrl = response.data;

        if (imgUrl) {
            account.value.avatar = imgUrl;
            console.log('Upload thành công:', imgUrl);
        } else {
            console.warn('Phản hồi không hợp lệ từ API Imgur');
        }
    } catch (error) {
        console.error('Có lỗi khi upload:', error);
    }
}

</script>

<style scoped></style>
