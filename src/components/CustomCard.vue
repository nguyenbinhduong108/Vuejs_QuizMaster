<template>
    <v-card v-for="question in questions" :key="question.id" color="rgb(156, 163, 175)" :min-width="350" class="pr-2">
        <v-card-title class="text-white text-center">
            {{ question.name }}
        </v-card-title>
        <div class="flex items-center flex-nowrap">
            <div class="flex-1">
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
                    <v-btn variant="elevated" color="#f44336" block @click="selcetCardOnClick(question.id)">Start</v-btn>
                </v-card-actions>
            </div>

            <div class="w-[160px] h-[160px] rounded overflow-hidden">
                <v-img :src="question.image" width="100%" height="100%" cover></v-img>
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

function selcetCardOnClick(message: string) {
    emits("click", message);
}

</script>