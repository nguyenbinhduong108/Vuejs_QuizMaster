import type { questionProps } from "@/apis/questionApi";
import questionApi from "@/apis/questionApi";
import { defineStore } from "pinia";

const useQuestionStore = defineStore("question", {
  state: () => ({
    question: {
      id: "",
      name: "",
      image: "",
      timer: 0,
      turn: 0,
      quantity: 0,
      account: {
        id: "",
        username: "",
      },
      category: {
        id: "",
        name: "",
        image: "",
      },
      createdAt: "",
      updatedAt: "",
      deletedAt: "",
    } as questionProps,

    questionId: "",
  }),

  actions: {
    resetQuestion() {
      this.question = {
        id: "",
        name: "",
        image: "",
        timer: 0,
        turn: 0,
        quantity: 0,
        level: 0,
        isHot: false,
        account: {
          id: "",
          username: "",
        },
        category: {
          id: "",
          name: "",
          image: "",
        },
        createdAt: "",
        updatedAt: "",
        deletedAt: "",
      };
    },

    async setQuestion(questionId: string) {
      // this.resetQuestion();

      try {
        const response = await questionApi.getQuestionByQuestionId(questionId);
        const question = response.data;

        this.question = question;
      } catch (error) {
        console.error("Error setting question:", error);
      }
    },
  },
});

export default useQuestionStore;
