<template>
    <div class="bg-[#f44336] flex flex-row h-[50px] justify-between items-center px-4 fixed z-20 inset-0 shadow-lg">
        <div class="text-white font-bold text-lg cursor-pointer">QuizMaster</div>

        <div class="flex items-center">
            <v-btn variant="text" icon="fa-solid fa-gear" color="#fff"></v-btn>
            <v-btn variant="text" icon="fa-solid fa-bell" color="#fff"></v-btn>
            <v-menu v-if="account">
                <template v-slot:activator="{ props }">
                    <v-avatar v-bind="props" size="36px" alt="Avatar" class="overflow-hidden">
                        <v-img :src="account.avatar" alt="Avatar"></v-img>
                    </v-avatar>
                </template>
                <v-list>
                    <v-list-item v-for="(item, index) in items" :key="index" :value="index">
                        <v-list-item-title @click="item.func">{{ item.title }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>

            <v-btn v-else variant="flat" append-icon="fa-solid fa-arrow-right" color="#fff" @click="showForm">
                Sign in
            </v-btn>
        </div>
    </div>
</template>

<script setup lang="ts">
const emits = defineEmits([
    'showForm'
])

function showForm() {
    emits('showForm')
}

import { ref } from 'vue';
import useAccountStore from '@/stores/account';
import { useRouter } from 'vue-router'


const accountStore = useAccountStore();
const router = useRouter();
const prop = defineProps([
    'account'
])

const items = ref([
    { title: 'Thông tin', func: yourInfo },
    { title: 'Cài đặt', func: setting },
    { title: 'Đăng xuất', func: logout },
])

function yourInfo(){
    console.log('yourInfo');
}

function setting(){
    console.log('setting');
}

function logout(){
    accountStore.logout();
    router.push('/')
}
</script>