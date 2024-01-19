<template>
    <v-container
    fluid
    class="inset-0 w-screen h-screen sm:px-20 md:px-40 bg-[#2B2B6E] z-10 flex flex-col justify-center items-center"
  >
    <v-col class="w-[150px] h-[150px]">
      <v-img :src="icon"></v-img>
    </v-col>
    <v-row>
      <v-col class="text-white text-2xl text-center font-bold">
        {{ text }}
      </v-col>
    </v-row>
    <v-col>
      <v-row class="text-center text-xl whitespace-nowrap bg-white rounded p-4">
        <v-col>Câu đúng: {{ answerStore.point }} / {{ quantity }}</v-col>
        <v-col>Thời gian: {{ answerStore.totalTimer }}</v-col>
      </v-row>
      <v-row>Hạng 1</v-row>
      <v-row>Hạng 1</v-row>
      <v-row>Hạng 1</v-row>
    </v-col>
    <v-col class="grid grid-cols-1 md:grid-cols-2 w-full gap-1">
      <v-btn
        @click="repLay"
        color="green"
        prepend-icon="fa-solid fa-rotate-right"
        block
      >
        Chơi lại
      </v-btn>
      <v-btn
        @click="homePage"
        color="yellow"
        prepend-icon="fa-solid fa-home"
        block
      >
        Trang chủ
      </v-btn>
    </v-col>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import useAnswerStore from '@/stores/answer';
import useQuestionStore from '@/stores/question';
import useAccountStore from '@/stores/account';
import resource from '@/helper/resource';
import router from "@/router";


const accountStore = useAccountStore();
const questionStore = useQuestionStore();
const answerStore = useAnswerStore();
const quantity = ref(questionStore.question.quantity);

const icon = ref();
const text = ref("");
function resultForm() {
  if (answerStore.point < quantity.value / 2) {
    icon.value = resource.icon.lost;
    text.value = "Chúc bạn may mắn lần sau!";
  } else {
    icon.value = resource.icon.win;
    text.value = `Tuyệt quá! Bạn đã chinh phục được câu đố: ${questionStore.question.name}!`;
  }
}

//#region button
function repLay() {
  answerStore.resetPoint();
  router.push({
    name: 'play',
    params: {
        questionId: questionStore.question.id
    }
  });
}

function homePage() {
  answerStore.resetAnswer();
  questionStore.resetQuestion();
  router.push({
    name: "user",
    params: {
        id: accountStore.account.id,
    }
  });
}
//#endregion

onBeforeMount(() => {
    resultForm();
})

</script>