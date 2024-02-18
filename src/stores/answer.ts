import { defineStore } from "pinia";
import type { answerProps } from "@/apis/answerApi";
import answerApi from "@/apis/answerApi";

const useAnswerStore = defineStore("answer", {
  state: () => ({
    answers: [] as Array<answerProps>,
    point: 0,
    totalTimer: "",
  }),

  actions: {
    async setAnswers(questionId: string) {
      try {
        const response = await answerApi.getByQuestionId(questionId);
        const answers = response.data;

        this.answers = answers;
      } catch (error) {
        console.error("Error setting answers:", error);
      }
    },

    addPoint() {
      this.point++;
    },

    resetAnswer() {
      this.answers = [];
      this.point = 0;
      this.totalTimer = "";
    },

    resetPoint() {
      this.point = 0;
      this.totalTimer = "";
    },
  },
});

export default useAnswerStore;
