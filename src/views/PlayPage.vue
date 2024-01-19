<template>
  <v-container
    fluid
    class="bg-slate-600 min-h-screen max-h-screen sm:px-20 md:px-40 flex flex-col justify-center"
  >
    <!-- header -->
    <v-row
      class="text-white text-center font-bold"
    >
      <v-col>
        <div class="text-xs justify-center">
            Câu số
        </div>
        <div class="text-base justify-center">
            {{ index + 1 }} / {{ quantity }}
        </div>
      </v-col>
      <v-col>
        <div class="text-xs justify-center">
            Thời gian còn lại
        </div>
        <div class="text-base justify-center">
            {{ formatTime }}
        </div>
      </v-col>
    </v-row>

    <!-- title -->
    <v-row>
      <v-col class="text-white font-bold text-center text-2xl">
        {{ answers[index].title }}
      </v-col>
    </v-row>

    <!-- ! fix image -->
    <!-- image -->
    <v-row class="overflow-hidden hidden sm:flex">
        <v-col>
            <v-img :src="answers[index].image"></v-img>
        </v-col>
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
</template>

<script setup lang="ts">
import useAnswerStore from "@/stores/answer";
import useQuestionStore from "@/stores/question";
import { ref, computed, onMounted, onUnmounted, onBeforeMount } from "vue";
import router from "@/router";
import * as _ from "lodash";

const isStopClick = ref(false);
const answerStore = useAnswerStore();
const questionStore = useQuestionStore();

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
      stopTimer();
    }
  }, 1000);
}

function stopTimer() {
  answerStore.totalTimer = calculateUsedTime(totalElapsedTime.value);
  router.push({ name: "result" });
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

onBeforeMount(() => {
  answers[0].answers = _.shuffle(answers[0].answers);
});

onMounted(() => {
  //   startTimer();
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
