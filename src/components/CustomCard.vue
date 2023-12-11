<template>
    <v-card v-for="question in questions" :key="question.id" color="rgb(156, 163, 175)" height="236px" :min-width="350">
        <v-card-title class="text-white text-center">
            {{ question.name }}
        </v-card-title>
        <div class="grid grid-cols-2 items-center flex-nowrap">
            <div>
                <v-card-item class="text-white">
                    <v-icon icon="fa-solid fa-clock"></v-icon>
                    {{ question.timer }}s
                </v-card-item>
                <v-card-item class="text-white">
                    <v-icon icon="fa-solid fa-chart-simple"></v-icon>
                    {{ question.turn }} lượt chơi
                </v-card-item>
                <v-card-item class="text-white">
                    <v-icon icon="fa-solid fa-chess"></v-icon>
                    {{ question.quantity }} câu hỏi
                </v-card-item>
                <v-card-actions>
                    <v-btn variant="elevated" color="#f44336" block @click="selecteddCardOnClick(question.id)">Start</v-btn>
                </v-card-actions>
            </div>

            <div class="overflow-hidden w-full h-full p-2">
                <v-img :src="question.image" class="rounded" width="100%" height="100%" cover></v-img>
            </div>
        </div>
    </v-card>
</template>

<script setup lang="ts">
const props = defineProps([
    'questions',
]);

const emits = defineEmits([
    'click'
]);

function selecteddCardOnClick(questionId: string) {
    emits("click", questionId);
}

</script>