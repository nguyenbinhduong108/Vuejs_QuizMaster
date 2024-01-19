<template>
  <!-- game play -->
  <v-container
    fluid
    class="bg-slate-600 h-screen sm:px-20 md:px-40 flex flex-col justify-between"
  >
    <!-- header -->
    <v-row class="grid grid-cols-2 w-full text-white text-center font-bold">
      <v-col>
        <v-row class="text-xs justify-center">Câu số</v-row>
        <v-row class="text-base justify-center"
          >{{ index + 1 }} / {{ quantity }}
        </v-row>
      </v-col>
      <v-col>
        <v-row class="text-xs justify-center">Thời gian còn loại</v-row>
        <v-row class="text-base justify-center">{{ formatTime }}</v-row>
      </v-col>
    </v-row>

    <!-- title -->
    <v-row>
      <v-col class="text-white font-bold text-center text-2xl">
        {{ answers[index].title }}
      </v-col>
    </v-row>

    <!-- image -->
    <v-row
      class="overflow-hidden hidden sm:flex sm:justify-center sm:items-center"
    >
      <v-img :src="answers[index].image"></v-img>
    </v-row>

    <!-- answer -->
    <v-row>
      <v-col class="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <div
          class="answer-base"
          ref="answerA"
          @click="handleAnswerClick('answerA')"
        >
          {{ answers[index].answers[0] }}
        </div>
        <div
          class="answer-base"
          ref="answerB"
          @click="handleAnswerClick('answerB')"
        >
          {{ answers[index].answers[1] }}
        </div>
        <div
          class="answer-base"
          ref="answerC"
          @click="handleAnswerClick('answerC')"
        >
          {{ answers[index].answers[2] }}
        </div>
        <div
          class="answer-base"
          ref="answerD"
          @click="handleAnswerClick('answerD')"
        >
          {{ answers[index].answers[3] }}
        </div>
      </v-col>
    </v-row>

    <!-- next button -->
    <v-row>
      <v-col>
        <v-btn color="blue" @click="nextAnswer" block>Next</v-btn>
      </v-col>
    </v-row>
  </v-container>

  <!-- result -->
  <v-container
    fluid
    v-if="isShowResult"
    class="fixed inset-0 w-screen sm:px-20 md:px-40 bg-[#2B2B6E] z-10 flex flex-col justify-center items-center"
  >
    <v-col>
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
        <v-col>Thời gian: {{ calculateUsedTime(totalElapsedTime) }}</v-col>
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
import useAnswerStore from "@/stores/answer";
import useQuestionStore from "@/stores/question";
import { ref, computed, onMounted, onUnmounted, onBeforeMount } from "vue";
import resource from "@/helper/resource";
import router from "@/router";
import * as _ from "lodash";
import useAccountStore from "@/stores/account";

const isStopClick = ref(false);
const answerStore = useAnswerStore();
const questionStore = useQuestionStore();
const accountStore = useAccountStore();

const answers = answerStore.answers;
const quantity = ref(questionStore.question.quantity);
const index = ref(0);

//#region chọn đáp án
function nextAnswer() {
  [answerA, answerB, answerC, answerD].forEach((answer) => {
    if (answer.value) {
      answer.value.classList.remove("answer-correct", "answer-error");
    }
  });

  if (index.value + 1 === quantity.value) {
    stopTimer();
    resultForm();
    return;
  }
  index.value++;
  isStopClick.value = false;
  answers[index.value].answers = _.shuffle(answers[index.value].answers);
}
const answerA = ref<HTMLElement>();
const answerB = ref<HTMLElement>();
const answerC = ref<HTMLElement>();
const answerD = ref<HTMLElement>();

function handleAnswerClick(answerKey: string) {
  if (isStopClick.value === true) {
    return;
  }

  let currentAnswer = null;

  switch (answerKey) {
    case "answerA":
      currentAnswer = answerA.value;
      break;
    case "answerB":
      currentAnswer = answerB.value;
      break;
    case "answerC":
      currentAnswer = answerC.value;
      break;
    case "answerD":
      currentAnswer = answerD.value;
      break;
  }

  if (currentAnswer?.innerText === answers[index.value].trueAnswer) {
    currentAnswer?.classList.add("answer-correct");
    answerStore.addPoint();
    isStopClick.value = true;
  } else {
    currentAnswer?.classList.add("answer-error");

    const correctAnswer = getAnswerElement();
    correctAnswer?.classList.add("answer-correct");
    isStopClick.value = true;
  }
}

function getAnswerElement() {
  const trueAnswer = answers[index.value].trueAnswer;

  switch (trueAnswer) {
    case answers[index.value].answers[0]:
      return answerA.value;
    case answers[index.value].answers[1]:
      return answerB.value;
    case answers[index.value].answers[2]:
      return answerC.value;
    case answers[index.value].answers[3]:
      return answerD.value;
  }
}
//#endregion

//#region tính thời gian
const time = ref<number>(
  questionStore.question.timer * questionStore.question.quantity
);
const timer = ref();

let formatTime = computed(() => {
  const minutes = Math.floor(time.value / 60);
  const seconds = time.value % 60;
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
});

function startTimer() {
  timer.value = setInterval(() => {
    if (time.value > 0) {
      time.value--;
      totalElapsedTime.value++;
    } else {
      clearInterval(timer.value);
      resultForm();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timer.value);
}
//#endregion

//#region tính thời gian đã chơi
const totalElapsedTime = ref(0);
function calculateUsedTime(elapsedTime: number) {
  const usedTime = elapsedTime;
  const usedMinutes = Math.floor(usedTime / 60);
  const usedSeconds = usedTime % 60;

  return `${usedMinutes}:${usedSeconds < 10 ? "0" : ""}${usedSeconds}`;
}
//#endregion

//#region hiển thị bảng kết quả
const icon = ref();
const text = ref("");
const isShowResult = ref(false);
function resultForm() {
  isShowResult.value = true;
  if (answerStore.point < quantity.value / 2) {
    icon.value = resource.icon.lost;
    text.value = "Chúc bạn may mắn lần sau!";
  } else {
    icon.value = resource.icon.win;
    text.value = `Tuyệt quá! Bạn đã chinh phục được câu đố: ${questionStore.question.name}!`;
  }
}
//#endregion

//#region button
function repLay() {
  stopTimer();
  answers[0].answers = _.shuffle(answers[0].answers);
  index.value = 0;
  answerStore.resetPoint();
  time.value = questionStore.question.timer * questionStore.question.quantity;
  totalElapsedTime.value = 0;
  isShowResult.value = false;
  isStopClick.value = false;
  startTimer();
}

function homePage() {
  answerStore.resetAnswer();
  questionStore.resetQuestion();
  router.push({
    name: "user-content",
    params: { id: accountStore.account.id },
  });
}
//#endregion

onBeforeMount(() => {
  answers[0].answers = _.shuffle(answers[0].answers);
});

onMounted(() => {
  // startTimer();
});

onUnmounted(() => {
  stopTimer();
});
</script>

<style scoped>
.answer-base {
  @apply text-white font-bold text-center bg-slate-400 p-2 rounded cursor-pointer hover:bg-slate-500 active:bg-slate-700 transition-all whitespace-nowrap;
}

.answer-correct {
  @apply !bg-green-500;
}

.answer-error {
  @apply !bg-red-500;
}
</style>
