<template>
  <div class="fixed inset-0 bg-black/50 z-30">
    <div
      class="bg-white w-[50vw] max-w-[500px] min-w-[250px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3 absolute rounded">
      <div class="text-right absolute top-0 right-0">
        <v-btn icon="fa-solid fa-close" variant="flat" @click="closeForm"></v-btn>
      </div>
      <v-form v-if="typeForm === 'loginForm'">
        <div class="font-bold text-3xl text-center pb-3">Đăng nhập</div>
        <v-row>
          <v-col>
            <v-text-field placeholder="example@gmail.com" label="Email" prepend-inner-icon="fa-solid fa-at"
              hide-details="auto" v-model:model-value="account.email"></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-text-field v-model:model-value="account.password" label="Password" prepend-inner-icon="fa-solid fa-lock"
              hide-details="auto" :type="isShowPassword ? 'text' : 'password'" :append-inner-icon="isShowPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'
                " @click:append-inner="isShowPassword = !isShowPassword">
            </v-text-field>
            <div class="text-right text-[#f44336] hover:cursor-pointer" @click="changeForgetForm">
              Quên mật khẩu?
            </div>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-btn block color="#f44336" @click="loginAccount">Đăng nhập</v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <div class="flex justify-center gap-2">
              Chưa có tài khoản?
              <div class="text-[#f44336] cursor-pointer" @click="changeSignUpForm">
                Đăng ký ngay
              </div>
            </div>
          </v-col>
        </v-row>
      </v-form>

      <v-form v-else>
        <div class="font-bold text-3xl text-center pb-3">Quên mật khẩu</div>
        <v-row>
          <v-col>
            <v-text-field label="Email" prepend-inner-icon="fa-solid fa-at" hide-details="auto"></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-text-field label="New password" prepend-inner-icon="fa-solid fa-lock" hide-details="auto"></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-btn block color="#f44336">Đặt lại mật khẩu</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from "vue";
import accountApi from "@/apis/accountApi";
import useAccountStore from "@/stores/account";
import { useRoute, useRouter } from "vue-router";

const accountStore = useAccountStore();
const router = useRouter();
const route = useRoute();

const typeForm = ref("loginForm");
const account = ref({
  password: "",
  email: "",
  username: "",
  avatar: "https://i.imgur.com/t9Y4WFN.jpg",
  isAdmin: false,
});
const isShowPassword = ref(false);

const emits = defineEmits(["closeForm", "signUp"]);

function changeForgetForm() {
  typeForm.value = "forgetForm";
}

function changeSignUpForm() {
  if (route.path !== "/signup") {
    router.push("/signup");
  } else {
    emits("signUp");
  }
}

function closeForm() {
  emits("closeForm");
}

async function loginAccount() {
  try {
    if (account.value.email !== "" && account.value.password !== "") {
      const data = (
        await accountApi.loginAccount(
          account.value.email,
          account.value.password
        )
      ).data;
      accountStore.login(data);
      // Chuyển hướng đến trang user hoặc admin tùy thuộc vào isAdmin
      if (accountStore.isAdmin) {
        router.push({
          name: 'admin-content',
          params: {
            id: data.id,
          },
        });
      } else {
        // router.push("/");
      }
      closeForm();
    }
  } catch (error) {
    console.log("Lỗi khi đăng nhập: ", error);
  }
}
</script>

<style scoped></style>
