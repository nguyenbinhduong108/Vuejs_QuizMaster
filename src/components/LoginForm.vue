<template>
    <div class="fixed inset-0 bg-black/50 z-30">
        <div class="bg-white w-[400px] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-3 absolute rounded">
            <div class="text-right absolute top-0 right-0">
                <v-btn icon="fa-solid fa-close" variant="flat" @click="closeForm"></v-btn>
            </div>
            <v-form v-if="typeForm === 'loginForm'">
                <div class="font-bold text-3xl text-center pb-3">Login</div>
                <v-row>
                    <v-col>
                        <v-text-field label="Email" prepend-inner-icon="fa-solid fa-at" hide-details="auto"></v-text-field>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col>
                        <v-text-field label="Password" prepend-inner-icon="fa-solid fa-lock"
                            hide-details="auto"></v-text-field>
                        <div class="text-right text-[#f44336] hover:cursor-pointer" @click="changeForgetForm">
                            Forget password?
                        </div>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col>
                        <v-btn block color="#f44336">Login</v-btn>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <div class="flex justify-center">
                            Not a member?
                            <div class="text-[#f44336] hover:cursor-pointer" @click="changeSignUpForm">Signup now</div>
                        </div>
                    </v-col>
                </v-row>
            </v-form>

            <v-form v-else-if="typeForm === 'signUpForm'">
                <div class="font-bold text-3xl text-center pb-3">Sign Up</div>
                <v-row>
                    <v-col>
                        <v-text-field label="User" prepend-inner-icon="fa-solid fa-user" hide-details="auto"></v-text-field>
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
                        <v-btn block color="#f44336">Sign up</v-btn>

                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <div class="flex justify-center">
                            Already have an account?
                            <div class="text-[#f44336] hover:cursor-pointer" @click="changeLoginForm">Login</div>
                        </div>
                    </v-col>
                </v-row>

            </v-form>

            <v-form v-else>
                <div class="font-bold text-3xl text-center pb-3">Porget password</div>
                <v-row>
                    <v-col>
                        <v-text-field label="Email" prepend-inner-icon="fa-solid fa-at" hide-details="auto"></v-text-field>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col>
                        <v-text-field label="New password" prepend-inner-icon="fa-solid fa-lock"
                            hide-details="auto"></v-text-field>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col>
                        <v-btn block color="#f44336">Reset password</v-btn>
                    </v-col>
                </v-row>
            </v-form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue"

const typeForm = ref('loginForm');

const emits = defineEmits([
    'closeForm',
])

function changeForgetForm() {
    typeForm.value = 'forgetForm';
}

function changeSignUpForm() {
    typeForm.value = 'signUpForm';
}

function changeLoginForm() {
    typeForm.value = 'loginForm';
}

function closeForm() {
    emits('closeForm');
}

</script>

<style scoped></style>