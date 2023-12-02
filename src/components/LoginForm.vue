<template>
    <div class="fixed inset-0 bg-black/50 z-30">
        <div class="bg-white w-[50vw] min-w-[250px] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] absolute p-3 rounded">
            <div class="font-bold text-3xl text-center pb-3">Login</div>
            <v-form>
                <v-row>
                    <v-col>
                        <v-text-field label="Email" prepend-inner-icon="fa-solid fa-at"></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-text-field label="Password" prepend-inner-icon="fa-solid fa-lock"></v-text-field>
                    </v-col>
                </v-row><v-row>
                    <v-col>
                        <v-text-field label="Username" prepend-inner-icon="fa-solid fa-user"></v-text-field>
                    </v-col>
                </v-row>
            </v-form>
            <div>
                <v-btn>Login</v-btn>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped></style>