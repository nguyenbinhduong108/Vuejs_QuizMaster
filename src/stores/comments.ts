import type { commentsProps } from "@/apis/commentsApi";
import { defineStore } from "pinia";

const useCommentsStore = defineStore("comments", {
  state: () => ({
    comments: [] as Array<commentsProps>,
  }),

  actions: {},
});

export default useCommentsStore;
