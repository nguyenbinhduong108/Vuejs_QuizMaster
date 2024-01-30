<template>
  <v-card v-for="question in questions" :key="question.id" color="#fff"
    class="w-full lg:w-[400px] xl:w-[430px] max-h-40 rounded-lg overflow-hidden" :class="{ 'flex-grow': flexGrow }"
    @click="selecteddCardOnClick(question.id)">
    <v-container class="p-4">
      <v-row>
        <v-col class="w-25">
          <div class="w-100 max-h-32 overflow-hidden rounded">
            <v-img :src="question.image" width="100%" height="128" cover></v-img>
          </div>
        </v-col>
        <v-col class="w-full">
          <v-row class="p-2 flex flex-col gap-2">
            <div class="flex gap-2">
              <v-chip color="#7070c2" variant="flat" size="small">
                {{ question.category.name }}</v-chip>
              <v-chip v-if="question.level === questionLevel.Easy" color="green" variant="flat" size="small">Dễ</v-chip>
              <v-chip v-if="question.level === questionLevel.Medium" color="yellow" variant="flat" size="small">Trung
                bình</v-chip>
              <v-chip v-if="question.level === questionLevel.Hard" color="pink" variant="flat" size="small">Khó</v-chip>

              <v-chip v-if="question.isHot" color="red" variant="flat" size="small">HOT</v-chip>
            </div>
            <div class="w-full text-black !overflow-hidden line-clamp-2">
              {{ question.name }}
            </div>
            <div class="w-full text-black !overflow-hidden text-sm">
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
import { questionLevel } from "@/helper/enum";
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
