<template>
  <!-- app bar -->
  <AppBar :account="store.account"></AppBar>

  <!-- main -->
  <div class="bg-slate-600 mt-[50px] h-[calc(100vh-50px)]">
    <RouterView></RouterView>
  </div>
</template>

<script setup lang="ts">
import useAccountStore from "@/stores/account";
import AppBar from "@/components/AppBar.vue";
import { RouterView } from "vue-router";

const store = useAccountStore();
</script>
