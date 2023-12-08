import { defineStore } from "pinia";
import type { answerProps } from '@/apis/answerApi'
import answerApi from "@/apis/answerApi";

const useAnswerStore = defineStore('answer', {
    state: () => ({
        answers: [] as answerProps[],
        point: 0,
    }),

    getters: {
        
    },

    actions: {
        async setAnswers(questionId: string): Promise<void> {
            try {
                const response = await answerApi.getByQuestionId(questionId);
                const answers = response.data;

                this.answers = answers;
            } catch (error) {
                console.error('Error setting answers:', error);
            }
        },
    },
})

export default useAnswerStore;