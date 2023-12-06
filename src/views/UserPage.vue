<template>
    <div>{{ account }}</div>
</template>

<script setup lang="ts">
import useAccountStore from '@/stores/account';

const account = useAccountStore().account;
</script>