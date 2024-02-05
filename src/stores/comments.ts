import type { commentsProp } from "@/apis/commentsApi";
import { defineStore } from "pinia";

const useCommentsStore = defineStore("comments", {
  state: () => ({
    comments: [] as Array<commentsProp>,
  }),

  actions: {},
});

export default useCommentsStore;
