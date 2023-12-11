<template>
    <!-- app bar -->
    <UserAppBar :account="store.account"></UserAppBar>

    <!-- main -->
    <div class="bg-slate-600 mt-[50px] h-[calc(100vh-50px)] flex justify-center">
        <RouterView></RouterView>
    </div>
</template>

<script setup lang="ts">
import useAccountStore from '@/stores/account';
import UserAppBar from '@/components/UserAppBar.vue';
import { RouterView } from 'vue-router';

const store = useAccountStore();
</script>