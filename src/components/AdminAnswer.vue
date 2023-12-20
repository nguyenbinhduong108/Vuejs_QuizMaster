<template>
  <div class="w-screen h-screen bg-slate-600">
    <div class="w-full h-[80vh]">
      <div class="flex flex-col items-center h-full">
        <div class="w-[60vw] flex flex-1 flex-col justify-between p-2 gap-5">
          <div>
            <v-text-field
              v-model:model-value="answer.title"
              bg-color="white"
              rounded="pill"
              variant="solo"
              :rules="[
                () => !!answer.title || 'Tên bộ câu hỏi không được để trống',
              ]"
              label="Tên câu hỏi"
            ></v-text-field>
          </div>
          <div class="flex flex-col flex-1 gap-5">
            <UploadImage
              v-model:model-value="answer.image"
              rectangle
            ></UploadImage>

            <div class="relative grid grid-cols-1 md:grid-cols-2 gap-2">
              <v-text-field
                v-model:model-value="answer.answerA"
                bg-color="white"
                rounded="pill"
                variant="solo"
                prepend-inner-icon="fa-regular fa-circle"
                :rules="[
                  () => !!answer.answerA || 'Câu trả lời không được để trống',
                ]"
                label="Đáp án A"
              ></v-text-field>
              <v-text-field
                v-model:model-value="answer.answerB"
                bg-color="white"
                rounded="pill"
                variant="solo"
                prepend-inner-icon="fa-regular fa-circle"
                :rules="[
                  () => !!answer.answerB || 'Câu trả lời không được để trống',
                ]"
                label="Đáp án B"
              ></v-text-field>
              <v-text-field
                v-model:model-value="answer.answerC"
                bg-color="white"
                rounded="pill"
                variant="solo"
                prepend-inner-icon="fa-regular fa-circle"
                :rules="[
                  () => !!answer.answerC || 'Câu trả lời không được để trống',
                ]"
                label="Đáp án C"    
              ></v-text-field>
              <v-text-field
                v-model:model-value="answer.answerD"
                bg-color="white"
                rounded="pill"
                variant="solo"
                prepend-inner-icon="fa-regular fa-circle"
                :rules="[
                  () => !!answer.answerD || 'Câu trả lời không được để trống',
                ]"
                label="Đáp án D"
              ></v-text-field>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full h-[20vh] bg-slate-400"></div>
  </div>
</template>

<script setup lang="ts">
import useQuestionStore from "@/stores/question";
import { ref, onBeforeMount } from "vue";
import UploadImage from "./UploadImage.vue";
import { type answerBody } from "@/apis/answerApi";

const questionId = ref();
const questionStore = useQuestionStore();
const answer = ref<answerBody>({
  title: "",
  answerA: "",
  answerB: "",
  answerC: "",
  answerD: "",
  trueAnswer: "",
  image: "https://i.imgur.com/oJN9YcQ.jpg",
});
onBeforeMount(() => {
  questionId.value = questionStore.questionId;
});
</script>
