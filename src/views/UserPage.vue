<template>
  <div class="!w-screen !h-screen overflow-hidden">
    <!-- app bar -->
    <AppBar :account="store.account"></AppBar>

    <!-- main -->
    <div class="bg-slate-600 !pt-[50px] h-screen">
      <RouterView></RouterView>
    </div>
  </div>
</template> 

<script setup lang="ts">
import useAccountStore from "@/stores/account";
import AppBar from "@/components/AppBar.vue";
import { RouterView } from "vue-router";

const store = useAccountStore();
</script>

<style scoped>

</style>
