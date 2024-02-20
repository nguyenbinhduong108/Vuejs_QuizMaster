<template>
  <v-container fluid class="fixed inset-0 bg-gradient-to-r from-[#9c9cc9] to-[#7070c2]">
    <v-btn variant="flat" icon @click="backToLandingPage">
      <v-icon color="white" icon="fa-solid fa-arrow-left"></v-icon>
    </v-btn>
    <v-container fluid v-if="isSignUpForm"
      class="bg-white flex gap-1 w-[70vw] absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 rounded p-3 overflow-hidden">
      <v-row>
        <v-col>
          <v-row class="text-center text-4xl font-bold">
            <v-col>Đăng ký</v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field v-model:model-value="account.username" label="Tên tài khoản"
                prepend-inner-icon="fa-solid fa-user" hide-details="auto">
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field v-model:model-value="account.email" label="Email" prepend-inner-icon="fa-solid fa-at"
                hide-details="auto">
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field v-model:model-value="account.password" label="Mật khẩu" prepend-inner-icon="fa-solid fa-lock"
                hide-details="auto" :type="isShowPassword ? 'text' : 'password'" :append-inner-icon="isShowPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'
                  " @click:append-inner="isShowPassword = !isShowPassword">
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field v-model:model-value="confirmPassword" :error="!checkConfirmPassword" label="Nhập lại mật khẩu"
                prepend-inner-icon="fa-solid fa-lock" hide-details="auto"
                :type="isShowConfirmPassword ? 'text' : 'password'" :append-inner-icon="isShowConfirmPassword
                  ? 'fa-solid fa-eye-slash'
                  : 'fa-solid fa-eye'
                  " @click:append-inner="
    isShowConfirmPassword = !isShowConfirmPassword
    ">
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn @click="createAccount" block color="#7070c2">Đăng ký</v-btn>
              <div class="text-center mt-2">
                Bạn đã có tài khoản?
                <span @click="loginForm" class="font-bold whitespace-nowrap cursor-pointer text-[#7070c2]">Đăng nhập
                  ngay</span>
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-col>
          <UploadImage v-model:model-value="account.avatar"></UploadImage>
        </v-col>
      </v-row>
    </v-container>

    <LoginForm @signUp="signUpForm" @closeForm="signUpForm" v-else></LoginForm>
  </v-container>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import LoginForm from "@/components/LoginForm.vue";
import imgurApi from "@/apis/imgurApi";
import accountApi from "@/apis/accountApi";
import type { accountBody } from "@/apis/accountApi";
import useAccountStore from "@/stores/account";
import UploadImage from "@/components/UploadImage.vue";
import router from "@/router";

const account = ref<accountBody>({
  email: "",
  username: "",
  password: "",
  avatar: "https://i.imgur.com/t9Y4WFN.jpg",
});
const confirmPassword = ref<string>("");
const checkConfirmPassword = computed(() => {
  if (account.value.password != confirmPassword.value) {
    return false;
  }
  return true;
});

const accountStore = useAccountStore();

const fileInput = ref();
const isShowLoading = ref(false);
const isSignUpForm = ref(true);
const isShowPassword = ref(false);
const isShowConfirmPassword = ref(false);

function chooseAvatar() {
  fileInput.value.click();
}

async function handleFileChange(event: any) {
  try {
    const file = (event.target as HTMLInputElement)?.files?.[0];

    if (!file) {
      return;
    }
    isShowLoading.value = true;
    const formData = new FormData();
    formData.append("avatar", file);
    const response = await imgurApi.upload(formData);
    account.value.avatar = response.data;
    isShowLoading.value = false;
  } catch (error) {
    console.error("Error uploading image:", error);
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
    if (checkConfirmPassword.value === false) {
      console.log("Vui lòng xác nhận chính xác mật khẩu");
      return;
    }
    const response = (await accountApi.registerAccount(account.value)).data;
    accountStore.login(response);
    router.push("/user");
  } catch (error) {
    console.error(error);
  }
}
</script>
<style scoped></style>
