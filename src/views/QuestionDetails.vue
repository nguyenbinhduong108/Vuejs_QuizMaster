<template>
  <div class="flex flex-col md:flex-row gap-8">
    <div>
      <div>
        <div class="w-100 h-100 overflow-hidden rounded">1</div>
      </div>
    </div>
    <div>2</div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import useQuestionStore from "@/stores/question";
import questionApi, { type questionProps } from "@/apis/questionApi";

import { onBeforeMount, ref } from "vue";

const router = useRouter();

const questions = ref<questionProps[]>([]);
</script>
