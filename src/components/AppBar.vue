<template>
  <div class="bg-primary-10 flex flex-row h-[50px] justify-between items-center px-4 fixed z-20 inset-0 shadow-lg">
    <div class="text-white font-bold text-lg cursor-pointer" @click="backToHome">
      <svg width="94" height="36" viewBox="0 0 94 36" fill="none" xmlns="http://www.w3.org/2000/svg" class="ml-4">
        <path
          d="M40.391 18.4535C40.391 19.2581 40.5893 19.904 40.9859 20.3913C41.3826 20.8785 41.9718 21.1222 42.7537 21.1222C43.513 21.1222 44.0909 20.8785 44.4875 20.3913C44.8955 19.904 45.0995 19.2581 45.0995 18.4535C45.0995 17.6376 44.8955 16.986 44.4875 16.4987C44.0909 16.0114 43.513 15.7678 42.7537 15.7678C41.9718 15.7678 41.3826 16.0114 40.9859 16.4987C40.5893 16.986 40.391 17.6376 40.391 18.4535ZM48.924 18.4535C48.924 19.4507 48.7314 20.3516 48.3461 21.1562C47.9721 21.9494 47.4622 22.6237 46.8163 23.1789L48.3837 25.2906C48.7476 25.7809 48.3976 26.4766 47.787 26.4766H45.6468C45.1276 26.4766 44.646 26.2055 44.3765 25.7617L43.6546 24.5728C43.5073 24.5954 43.36 24.6124 43.2127 24.6238C43.0654 24.6351 42.9124 24.6408 42.7537 24.6408C41.9038 24.6408 41.0993 24.4878 40.34 24.1818C39.5921 23.8759 38.9349 23.4509 38.3683 22.907C37.813 22.363 37.371 21.7114 37.0424 20.9522C36.7138 20.193 36.5495 19.36 36.5495 18.4535C36.5495 17.5469 36.7138 16.7197 37.0424 15.9718C37.371 15.2125 37.813 14.5609 38.3683 14.017C38.9349 13.4731 39.5921 13.0481 40.34 12.7421C41.0993 12.4362 41.9038 12.2832 42.7537 12.2832C43.615 12.2832 44.4196 12.4362 45.1675 12.7421C45.9154 13.0481 46.567 13.4731 47.1222 14.017C47.6775 14.5609 48.1138 15.2125 48.4311 15.9718C48.7597 16.7197 48.924 17.5469 48.924 18.4535Z"
          fill="#1D1D49"></path>
        <path
          d="M50.2173 13.6018C50.2173 12.9862 50.7164 12.4872 51.332 12.4872H52.8593C53.4749 12.4872 53.9739 12.9862 53.9739 13.6018V19.2694C53.9739 19.7907 54.0872 20.2213 54.3139 20.5612C54.5518 20.9012 54.9541 21.0712 55.5207 21.0712C56.0987 21.0712 56.5066 20.9012 56.7446 20.5612C56.9939 20.2213 57.1185 19.7907 57.1185 19.2694V13.6018C57.1185 12.9862 57.6176 12.4872 58.2332 12.4872H59.7605C60.3761 12.4872 60.8751 12.9862 60.8751 13.6018V19.2694C60.8751 20.1533 60.7334 20.9352 60.4501 21.6151C60.1668 22.2837 59.7759 22.8446 59.2773 23.2979C58.79 23.7399 58.2121 24.0742 57.5435 24.3008C56.8862 24.5274 56.1836 24.6408 55.4357 24.6408C54.6878 24.6408 53.9909 24.5274 53.345 24.3008C52.7104 24.0742 52.1608 23.7399 51.6962 23.2979C51.2316 22.8446 50.8689 22.2837 50.6083 21.6151C50.3477 20.9352 50.2173 20.1533 50.2173 19.2694V13.6018Z"
          fill="#1D1D49"></path>
        <path
          d="M62.5027 13.6018C62.5027 12.9862 63.0017 12.4872 63.6173 12.4872H65.1616C65.7772 12.4872 66.2762 12.9862 66.2762 13.6018V23.4072C66.2762 24.0227 65.7772 24.5218 65.1616 24.5218H63.6173C63.0017 24.5218 62.5027 24.0227 62.5027 23.4072V13.6018Z"
          fill="#1D1D49"></path>
        <path
          d="M86.5816 14.5994C86.5816 15.0701 86.4243 15.5274 86.1347 15.8986L81.7542 21.5131H84.3251C85.5714 21.5131 86.5816 22.5234 86.5816 23.7696C86.5816 24.185 86.2449 24.5218 85.8295 24.5218H79.6921C78.5216 24.5218 77.5727 23.5729 77.5727 22.4024C77.5727 21.9359 77.7266 21.4825 78.0105 21.1124L82.3321 15.4788H79.8164C78.5772 15.4788 77.5727 14.4743 77.5727 13.2351C77.5727 12.822 77.9075 12.4872 78.3206 12.4872H84.4695C85.636 12.4872 86.5816 13.4328 86.5816 14.5994Z"
          fill="#1D1D49"></path>
        <path
          d="M76.7233 14.5994C76.7233 15.0701 76.566 15.5274 76.2764 15.8986L71.8959 21.5131H74.4668C75.7131 21.5131 76.7233 22.5234 76.7233 23.7696C76.7233 24.185 76.3866 24.5218 75.9712 24.5218H69.8338C68.6632 24.5218 67.7144 23.5729 67.7144 22.4024C67.7144 21.9359 67.8682 21.4825 68.1522 21.1124L72.4738 15.4788H69.9581C68.7189 15.4788 67.7144 14.4743 67.7144 13.2351C67.7144 12.822 68.0492 12.4872 68.4623 12.4872H74.6111C75.7777 12.4872 76.7233 13.4328 76.7233 14.5994Z"
          fill="#1D1D49"></path>
        <path
          d="M26.6411 26.5592C21.7053 31.3436 13.8255 31.2208 9.04107 26.285C4.25667 21.3491 4.37944 13.4693 9.31529 8.68492C14.2511 3.90052 22.131 4.02329 26.9154 8.95914C31.6998 13.895 31.577 21.7748 26.6411 26.5592ZM12.9421 12.4265C10.0726 15.2079 10.0013 19.7888 12.7827 22.6582C15.564 25.5276 20.1449 25.599 23.0144 22.8176C25.8838 20.0362 25.9552 15.4553 23.1738 12.5859C20.3924 9.71649 15.8115 9.64511 12.9421 12.4265Z"
          fill="url(#:R9dja:)"></path>
        <path
          d="M25.4488 30.4402H30.1727C30.6925 30.4402 31.1898 29.9123 31.1672 29.4303C31.1672 28.8614 30.9002 28.6262 30.7186 28.4663L30.6925 28.4433L19.3913 17.3573C19.0297 16.9671 18.4194 16.9671 18.0578 17.3573C17.7639 17.6557 17.7187 18.0918 17.8995 18.459C17.8995 18.459 23.3015 28.7188 23.731 29.5221C24.1604 30.3254 25.0871 30.4402 25.4488 30.4402Z"
          fill="#FEAE01"></path>
        <defs>
          <radialGradient id=":R9dja:" cx="0.9" cy="0.7" r="3.5" gradientUnits="userSpaceOnUse"
            gradientTransform="translate(17.9782 17.6221) rotate(45) scale(12.3478)">
            <stop offset="0.000304476" stop-color="#654FF3"></stop>
            <stop offset="0.0118157" stop-color="#654FF3" stop-opacity="0"></stop>
            <stop offset="0.245174" stop-color="#664FF3"></stop>
          </radialGradient>
        </defs>
      </svg>
    </div>

    <div class="flex items-center">
      <div v-if="!account.isAdmin">
        <v-btn variant="text" icon="fa-solid fa-search" color="#fff" @click="onClickShowSearch"></v-btn>
      </div>
      <!-- <v-btn variant="text" icon="fa-solid fa-gear" color="#fff"></v-btn> -->
      <v-menu v-if="account.id">
        <template v-slot:activator="{ props }">
          <v-avatar v-bind="props" size="36px" alt="Avatar" :image="account.avatar">
          </v-avatar>
        </template>
        <v-list class="mt-2">
          <v-list-item v-for="(item, index) in items" :key="index" :value="index">
            <v-list-item-title @click="item.func">{{
              item.title
            }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-btn v-else variant="flat"
        className='rounded-lg bg-secondary-10 px-4 py-2 hover:-translate-y-0.5 hover:shadow-elevation-1 outline-none border-none font-semibold'
        @click="showForm">
        Đăng nhập
      </v-btn>
    </div>

    <LoginForm v-if="isShowForm" @closeForm="closeForm"></LoginForm>
    <Search v-if="isShowSearch" @closeSearch="onClickCloseSearch"></Search>
  </div>
</template>

<script setup lang="ts">

import LoginForm from "@/components/LoginForm.vue";
import Search from "./Search.vue";

import { ref } from "vue";
import useAccountStore from "@/stores/account";
import router from "@/router";
import { computed } from "vue";

const isShowSearch = ref<boolean>(false);
const accountStore = useAccountStore();
const account = computed(() => accountStore.account);
const isShowForm = ref(false);

const items = ref([
  { title: "Thông tin", func: yourInfo },
  { title: "Cài đặt", func: setting },
  { title: "Đăng xuất", func: logout },
]);

function onClickShowSearch(){
  isShowSearch.value = true; 
}

function onClickCloseSearch(){
  isShowSearch.value = false
}

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
