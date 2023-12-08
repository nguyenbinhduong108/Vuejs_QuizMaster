<template>
    <div>
        <!-- app bar -->
        <UserAppBar :account="store.account"></UserAppBar>

        <!-- main -->
        <div class="mt-[50px] flex flex-col md:flex-row h-[calc(100vh-50px)]">
            <RouterView></RouterView>
        </div>
    </div>
</template>

<script setup lang="ts">
import useAccountStore from '@/stores/account';
import UserAppBar from '@/components/UserAppBar.vue';
import { ref } from 'vue';
import { RouterView } from 'vue-router';

const store = useAccountStore();
</script>