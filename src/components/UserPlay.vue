<template>
    <div class="w-[60vw] flex flex-col justify-between p-2 ">
        <div class=""></div>
        <div class="flex flex-col gap-5">
            <div class="text-white font-bold text-center text-2xl py-4">{{ answers[index].title }}</div>
            <div class="w-full h-[200px] rounded overflow-hidden">
                <v-img :src="answers[index].image" cover></v-img>
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
</template>

<script setup lang="ts">
import type { answerProps } from '@/apis/answerApi';
import useAnswerStore from '@/stores/answer';
import { ref } from 'vue';

const isStopClick = ref(false);
const answers = useAnswerStore().answers;
const index = ref(0);

function nextAnswer() {
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

</script>

<style scoped>
.answer-base {
    @apply text-white font-bold text-center bg-slate-400 p-2 rounded cursor-pointer hover:bg-slate-500 active:bg-slate-700;
}

.answer-correct {
    @apply !bg-green-500;
}

.answer-error {
    @apply !bg-red-500;
}
</style>