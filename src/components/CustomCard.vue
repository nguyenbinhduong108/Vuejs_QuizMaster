<template>
    <v-card v-for="question in questions" :key="question.id" color="rgb(156, 163, 175)" min-height="100%" :min-width="350">
        <v-card-title class="text-white text-center">
            {{ question.name }}
        </v-card-title>

        <v-container>
            <v-row class="grid grid-cols-2 relative">
                <v-col>
                    <v-row>
                        <v-card-item class="w-full text-white !overflow-hidden">
                            <v-icon icon="fa-solid fa-clock"></v-icon>
                            {{ question.timer }}s
                        </v-card-item>
                    </v-row>
                    <v-row>
                        <v-card-item class="w-full text-white !overflow-hidden">
                            <v-icon icon="fa-solid fa-chart-simple"></v-icon>
                            {{ question.turn }} lượt chơi
                        </v-card-item>
                    </v-row>

                    <v-row>
                        <v-card-item class="w-full text-white !overflow-hidden">
                            <v-icon icon="fa-solid fa-chess"></v-icon>
                            {{ question.quantity }} câu hỏi
                        </v-card-item>
                    </v-row>

                    <v-row>
                        <v-card-actions class="w-full">
                            <v-btn variant="elevated" color="#f44336" block
                                @click="selecteddCardOnClick(question.id)">Start</v-btn>
                        </v-card-actions>
                    </v-row>
                </v-col>
                <v-col class="relative">
                    <div class="absolute w-full h-full inset-0 overflow-hidden rounded">
                        <v-img :src="question.image" width="100%" height="100%" cover></v-img>
                    </div>
                </v-col>
            </v-row>
        </v-container>
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