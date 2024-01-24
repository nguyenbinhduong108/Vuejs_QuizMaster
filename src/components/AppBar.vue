<template>
  <div class="bg-primary-10 flex flex-row h-[50px] justify-between items-center px-4 fixed z-20 inset-0 shadow-lg">
    <div class="text-white font-bold text-lg cursor-pointer" @click="backToHome">
      QuizMaster
    </div>

    <div class="flex items-center">
      <v-btn variant="text" icon="fa-solid fa-search" color="#fff"></v-btn>
      <v-btn variant="text" icon="fa-solid fa-gear" color="#fff"></v-btn>
      <v-menu v-if="account.id">
        <template v-slot:activator="{ props }">
          <v-avatar v-bind="props" size="36px" alt="Avatar" class="overflow-hidden">
            <v-img :src="account.avatar" alt="Avatar"></v-img>
          </v-avatar>
        </template>
        <v-list>
          <v-list-item v-for="(item, index) in items" :key="index" :value="index">
            <v-list-item-title @click="item.func">{{
              item.title
            }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-btn v-else variant="flat"
        className='rounded-lg bg-secondary-10 px-4 py-2 hover:-translate-y-0.5 hover:shadow-elevation-1 outline-none border-none'
        @click="showForm">
        Đăng nhập
      </v-btn>
    </div>

    <LoginForm v-if="isShowForm" @closeForm="closeForm"></LoginForm>
  </div>
</template>

<script setup lang="ts">

import LoginForm from "@/components/LoginForm.vue";

import { ref } from "vue";
import useAccountStore from "@/stores/account";
import router from "@/router";
import { computed } from "vue";

const accountStore = useAccountStore();
const account = computed(() => accountStore.account);
const isShowForm = ref(false);

const items = ref([
  { title: "Thông tin", func: yourInfo },
  { title: "Cài đặt", func: setting },
  { title: "Đăng xuất", func: logout },
]);

function yourInfo() {
  console.log("yourInfo");
}

function setting() {
  console.log("setting");
}

function logout() {
  accountStore.logout();
  router.push("/");
}

function backToHome() {
  router.push("/");
}

function showForm() {
  isShowForm.value = true;
}

function closeForm() {
  isShowForm.value = false;
}
</script>
