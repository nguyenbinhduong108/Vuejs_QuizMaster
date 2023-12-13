<template>
    <div class="flex flex-col items-center h-full">
        <div class="grid grid-cols-2 w-full text-white text-center font-bold min-h-[56px]">
            <div>
                <div class="text-xs">Câu số</div>
                <div class="text-base">{{ index + 1 }} / {{ quantity }}</div>
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

    <div
        v-if="isShowResult" 
        class="fixed mt-[50px] flex justify-center p-8 inset-0 w-screen h-screen bg-[#2B2B6E] z-10">
            <div class="flex flex-col items-center justify-evenly p-5 gap-4 w-full md:w-[60vw] h-full">
                <div class="w-[150px] h-[150px]">
                    <v-img :src="icon"></v-img>
                </div>
                <div class="text-white text-2xl text-center font-bold">
                    {{ text }}  
                </div>
                <div class="bg-white w-full rounded p-4">
                    <v-row class="text-center text-xl whitespace-nowrap">
                        <v-col>Câu đúng: {{ answerStore.point}} / {{ quantity }}</v-col>
                        <v-col>Thời gian: {{ calculateUsedTime(totalElapsedTime) }}</v-col>
                    </v-row>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 w-full gap-1">
                    <div>
                        <v-btn @click="repLay" color="green" prepend-icon="fa-solid fa-rotate-right" block>Chơi lại</v-btn>
                    </div>
                    <div>
                        <v-btn @click="homePage" color="yellow" prepend-icon="fa-solid fa-home" block>Trang chủ</v-btn>
                    </div>
                </div>
            </div>
    </div>
</template>

<script setup lang="ts">
import type { answerProps } from '@/apis/answerApi';
import useAnswerStore from '@/stores/answer';
import useQuestionStore from '@/stores/question';
import { ref, computed, onMounted, onUnmounted } from 'vue';
import resource from '@/helper/resource';
import { useRouter } from 'vue-router';


const isStopClick = ref(false);
const answerStore = useAnswerStore();
const questionStore = useQuestionStore();
const router = useRouter();


const answers = answerStore.answers;
const quantity = ref(questionStore.question.quantity);
const index = ref(0);

//#region chọn đáp án
function nextAnswer() {
    [answerA, answerB, answerC, answerD].forEach(answer => {
        if (answer.value) {
            answer.value.classList.remove('answer-correct', 'answer-error');
        }
    });
    isStopClick.value = false;

    if (index.value + 1 === quantity.value) {
        stopTimer();
        resultForm();
        return;
    }
    index.value++;
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
//#endregion

//#region tính thời gian
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
            totalElapsedTime.value++;
        } else {
            clearInterval(timer.value);
            resultForm();
        }
    }, 1000);
};

function stopTimer() {
    clearInterval(timer.value);
};
//#endregion

//#region tính thời gian đã chơi
const totalElapsedTime = ref(0);
function calculateUsedTime(elapsedTime: number) {
    const usedTime = elapsedTime;
    const usedMinutes = Math.floor(usedTime / 60);
    const usedSeconds = usedTime % 60;

    return `${usedMinutes}:${usedSeconds < 10 ? '0' : ''}${usedSeconds}`;
}
//#endregion

//#region hiển thị bảng kết quả
const icon = ref();
const text = ref('');
const isShowResult = ref(false);
function resultForm() {
    isShowResult.value = true;
    if (answerStore.point < quantity.value / 2) {
        icon.value = resource.icon.lost
        text.value = "Chúc bạn may mắn lần sau!";
    }
    else{
        icon.value = resource.icon.win
        text.value = `Tuyệt quá! Bạn đã chinh phục được câu đố: ${questionStore.question.name}!`
    }
}
//#endregion

//#region button
function repLay(){
    time.value = questionStore.question.timer;
    index.value = 0;
    answerStore.resetPoint();
    isShowResult.value = false;
};

function homePage(){
    answerStore.resetAnswer();
    questionStore.resetQuestion();
    router.push('/user');
};
//#endregion

onMounted(() => {
    startTimer();
})

onUnmounted(() => {
    stopTimer();
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