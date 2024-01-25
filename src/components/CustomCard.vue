<template>
  <v-card
    v-for="question in questions"
    :key="question.id"
    color="#fff"
    class="flex-shrink-0 basis-[450px]"
    :class="{ 'flex-grow': flexGrow }"
    @click="selecteddCardOnClick(question.id)"
  >
    <v-container class="p-4">
      <v-row>
        <v-col class="w-25">
          <div class="w-100 h-100 overflow-hidden rounded">
            <v-img
              :src="question.image"
              width="100%"
              height="100%"
              cover
            ></v-img>
          </div>
        </v-col>
        <v-col class="w-full">
          <v-row class="p-2 flex flex-col gap-2">
            <div class="bg-primary-20 rounded-xl px-3 text-sm text-slate-500">
              {{ question.category.name }}
            </div>
            <div class="w-full text-black !overflow-hidden line-clamp-2">
              {{ question.name }}
            </div>
            <div class="w-full text-black !overflow-hidden">
              {{ question.quantity }} câu hỏi - {{ question.turn }} lượt chơi
            </div>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script setup lang="ts">
import type { questionProps } from "@/apis/questionApi";

const props = defineProps({
  questions: Array<questionProps>,
  flexGrow: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(["click"]);

function selecteddCardOnClick(questionId: string) {
  emits("click", questionId);
}
</script>
