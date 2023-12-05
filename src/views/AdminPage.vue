<template>
    <div >
        <!-- app bar -->
        <UserAppBar :account="store.account"></UserAppBar>

        <!-- option -->
        <div class="flex flex-col sm:flex-row mt-[50px] p-4 gap-2 ">
            <div class="flex-1 bg-slate-500 p-4 rounded-xl">
                <div class="text-center text-white font-bold">Welcome {{ store.account.username }}</div>
                <div class="text-center">
                    <v-btn rounded="pill" variant="elevated" color="white" class="font-bold">Create a quiz</v-btn>
                </div>
            </div>
            <div class="flex-1 bg-slate-500 p-4 rounded-xl">
                <div class="text-center text-white font-bold">Try our ChatGPT powered</div>
                <div class="text-center">
                    <v-btn rounded="pill" variant="elevated" color="white" class="font-bold">AI quiz generator</v-btn>
                </div>
            </div>
        </div>

        <!-- body -->
        <div>
            <v-card></v-card>
        </div>

        <!-- footer -->
        <Footer></Footer>
    </div>
</template>

<script setup lang="ts">
import UserAppBar from '@/components/UserAppBar.vue';
import Footer from '@/components/Footer.vue';
import useAccountStore from '@/stores/account';

const store = useAccountStore();
</script>