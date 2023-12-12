<template>
    <div class="flex flex-col items-center h-full">
        <div class="grid grid-cols-2 w-full text-white text-center font-bold min-h-[56px]">
            <div>
                <div class="text-xs">Câu số</div>
                <div class="text-base">{{ index + 1 }} / {{ quatity }}</div>
            </div>
            <div>
                <div class="text-xs">Thời gian còn loại</div>
                <div class="text-base">{{ formatTime }}</div>
            </div>
        </div>
        <div class="w-[60vw] flex flex-1 flex-col justify-between p-2 ">
            <div class="flex flex-col gap-5">
                <div class="text-white font-bold text-center text-2xl py-4">{{ answers[index].title }}</div>
                <div class="w-full h-[250px] rounded overflow-hidden bg-amber-500">
                    <v-img :src="answers[index].image" height="100%" cover></v-img>
                </div>
                <div class="relative grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div class="absolute inset-0 cursor-not-allowed" v-if="isStopClick"></div>
                    <div class="answer-base" ref="answerA" @click="handleAnswerClick('answerA')">
                        {{ answers[index].answerA }}
                    </div>
                    <div class="answer-base" ref="answerB" @click="handleAnswerClick('answerB')">
                        {{ answers[index].answerB }}
                    </div>
                    <div class="answer-base" ref="answerC" @click="handleAnswerClick('answerC')">
                        {{ answers[index].answerC }}
                    </div>
                    <div class="answer-base" ref="answerD" @click="handleAnswerClick('answerD')">
                        {{ answers[index].answerD }}
                    </div>
                </div>
            </div>
            <v-btn color="blue" @click="nextAnswer">Next</v-btn>
        </div>
    </div>

    <div class="fixed inset-0 w-screen h-screen bg-black/50 z-50">
        <div class="absolute bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded overflow-hidden">
            <v-img src="https://quizz.coccoc.com/_next/image?url=%2Fimages%2Flost.png&w=1920&q=75" width="500px" height="500px"></v-img>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { answerProps } from '@/apis/answerApi';
import useAnswerStore from '@/stores/answer';
import useQuestionStore from '@/stores/question';
import { ref, computed, onMounted, onUnmounted } from 'vue';


const isStopClick = ref(false);
const answerStore = useAnswerStore();
const questionStore = useQuestionStore();


const answers = answerStore.answers;
const quatity = ref(questionStore.question.quantity);
const index = ref(0);

const icon = ref('@/assets/lost.png');
const text = ref('');

// chọn đáp án
function nextAnswer() {
    if(index.value + 1 === quatity.value){

        return;
    }
    index.value++;
    [answerA, answerB, answerC, answerD].forEach(answer => {
        if (answer.value) {
            answer.value.classList.remove('answer-correct', 'answer-error');
        }
    });
    isStopClick.value = false;
}
const answerA = ref<HTMLElement>();
const answerB = ref<HTMLElement>();
const answerC = ref<HTMLElement>();
const answerD = ref<HTMLElement>();

function handleAnswerClick(answerKey: keyof answerProps) {
    let currentAnswer = null;

    switch (answerKey) {
        case 'answerA':
            currentAnswer = answerA.value;
            break;
        case 'answerB':
            currentAnswer = answerB.value;
            break;
        case 'answerC':
            currentAnswer = answerC.value;
            break;
        case 'answerD':
            currentAnswer = answerD.value;
            break;
    }

    if (answers[index.value][answerKey] === answers[index.value].trueAnswer) {
        currentAnswer?.classList.add('answer-correct')
        answerStore.addPoint();
    } else {
        currentAnswer?.classList.add('answer-error');

        const correctAnswer = getAnswerElement();
        correctAnswer?.classList.add('answer-correct')
    }
    isStopClick.value = true;
}

function getAnswerElement() {
    const trueAnswer = answers[index.value].trueAnswer;

    switch (trueAnswer) {
        case answers[index.value].answerA:
            return answerA.value;
        case answers[index.value].answerB:
            return answerB.value;
        case answers[index.value].answerC:
            return answerC.value;
        case answers[index.value].answerD:
            return answerD.value;
    }
}

// tính thời gian

const time = ref<number>(questionStore.question.timer);
const timer = ref();

let formatTime = computed(() => {
    const minutes = Math.floor(time.value / 60);
    const seconds = time.value % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
})

function startTimer() {
    timer.value = setInterval(() => {
        if (time.value > 0) {
            time.value--;
        } else {
            clearInterval(timer.value);
            alert('Đã hết thời gian!');
        }
    }, 1000);
};

function stopTimer() {
    clearInterval(timer.value);
};

onMounted(() => {
    startTimer();
})

onUnmounted(() => {
    stopTimer()
})
</script>

<style scoped>
.answer-base {
    @apply text-white font-bold text-center bg-slate-400 p-2 rounded cursor-pointer hover:bg-slate-500 active:bg-slate-700 transition-all;
}

.answer-correct {
    @apply !bg-green-500;
}

.answer-error {
    @apply !bg-red-500;
}
</style>