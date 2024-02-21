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
              hide-details="auto" v-model:model-value="account.email" clearable :error-messages="emailErrorMessage"
              :rules="emailRules"></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-text-field v-model:model-value="account.password" label="Mật khẩu" prepend-inner-icon="fa-solid fa-lock"
              hide-details="auto" :type="isShowPassword ? 'text' : 'password'" :append-inner-icon="isShowPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'
                " @click:append-inner="isShowPassword = !isShowPassword" clearable
              :error-messages="passwordErrorMessage" :rules="passwordRules">
            </v-text-field>
            <div class="flex justify-end w-full">
              <div class="text-[#7070c2] hover:cursor-pointer mt-2" @click="changeForgetForm">
                Quên mật khẩu?
              </div>
            </div>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-btn block color="#7070c2" @click="loginAccount">Đăng nhập</v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <div class="flex justify-center gap-2">
              Chưa có tài khoản?
              <div class="text-[#7070c2] cursor-pointer" @click="changeSignUpForm">
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
            <v-text-field v-model="forgetEmail" label="Email" prepend-inner-icon="fa-solid fa-at" hide-details="auto"
              clearable :error-messages="forgetEmailErrorMessage" :rules="emailRules"></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-text-field v-model="newPassword" label="Mật khẩu mới" prepend-inner-icon="fa-solid fa-lock"
              hide-details="auto" clearable :error-messages="newPasswordErrorMessage"
              :rules="newPasswordRules"></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-btn block color="#7070c2" @click="forgetPassword">Đặt lại mật khẩu</v-btn>
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
import { isEmailValid } from "@/helper/helpers";
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

const emailErrorMessage = ref("");
const passwordErrorMessage = ref("");

const forgetEmailErrorMessage = ref("");
const newPasswordErrorMessage = ref("");

const emailRules = [
  (v: any) => !!v || 'Email không được để trống',
  (v: any) => isEmailValid(v) || 'Email không hợp lệ',
]

const passwordRules = [
  (v: any) => !!v || 'Mật khẩu không được để trống',
  (v: any) => v.length >= 6 || 'Mật khẩu phải dài hơn 6 ký tự',
]

const newPasswordRules = [
  (v: any) => !!v || 'Mật khẩu mới không được để trống',
  (v: any) => v.length >= 6 || 'Mật khẩu mới phải dài hơn 6 ký tự',
]

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

const resetErrorMessage = () => {
  emailErrorMessage.value = "";
  passwordErrorMessage.value = "";
  newPasswordErrorMessage.value = "";
}

async function loginAccount() {
  try {
    resetErrorMessage()

    if (account.value.email !== "" && isEmailValid(account.value.email) && account.value.password !== "" && account.value.password.length >= 6) {
      accountApi.loginAccount(
        account.value.email,
        account.value.password
      ).then(response => {
        accountStore.login(response.data)
        // Chuyển hướng đến trang user hoặc admin tùy thuộc vào isAdmin
        if (accountStore.isAdmin) {
          router.push({
            name: 'admin-content',
            params: {
              id: response.data.id,
            },
          });
        }
        closeForm();
      }).catch(error => {
        if (error.response && error.response.status === 500) {
          if (error.response.data.message === "Email này chưa được đăng ký tài khoản") {
            emailErrorMessage.value = error.response.data.message
          }
          else if (error.response.data.message === "Mật khẩu sai") {
            passwordErrorMessage.value = error.response.data.message
            resetErrorMessage()
          }
        } else {
          // Xử lý các lỗi khác
          console.error('Có lỗi xảy ra:', error.message);
        }
      });
    }
  } catch (error) {
    console.log("Lỗi khi đăng nhập: ", error);
  }
}

const forgetEmail = ref("");
const newPassword = ref("");

const forgetPassword = () => {
  try {
    resetErrorMessage()
    if (forgetEmail.value !== "" && isEmailValid(forgetEmail.value) && newPassword.value !== "" && newPassword.value.length >= 6) {
      accountApi.forgetPasswordAccount(
        forgetEmail.value,
        newPassword.value,
      ).then(response => {
        if (response.status === 200) {
          closeForm()
        }
      }).catch(error => {
        if (error.response && error.response.status === 404) {
          if (error.response.data.message === "Không tìm thấy email cần đổi mật khẩu") {
            forgetEmailErrorMessage.value = error.response.data.message
          }
        } else {
          // Xử lý các lỗi khác
          console.error('Có lỗi xảy ra:', error.message);
        }
      })
    }
  } catch (error) {
    console.log("Lỗi khi đặt lại mật khẩu: ", error);
  }
}
</script>

<style scoped></style>
