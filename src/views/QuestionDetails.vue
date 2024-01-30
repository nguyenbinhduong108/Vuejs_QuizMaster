<template>
  <div class="!w-screen min-h-[calc(100vh-50px)]">
    <!-- app bar -->
    <AppBar></AppBar>

    <div class="flex flex-col items-center justify-center bg-primary-60">
      <div class="!pt-[50px] min-h-[calc(100vh-50px)] w-full xl:w-4/5 2xl:w-3/4 my-6 px-4 flex justify-center">
        <div class="flex flex-col md:flex-row gap-8">
          <div class="flex flex-col gap-4">
            <div class="flex gap-4 min-w-[400px] bg-white p-4">
              <div class="w-32 max-h-32 rounded overflow-hidden">
                <v-img :src="question.image" width="128" height="128" cover></v-img>
              </div>

              <div class="flex flex-col gap-4">
                <div>
                  <v-chip color="#7070c2" variant="flat" size="small">
                    {{ question.category.name }}</v-chip>
                </div>

                <div class="w-full text-black !overflow-hidden line-clamp-3 text-lg">
                  {{ question.name }}
                </div>

                <div>
                  <button
                    className='w-full rounded-lg bg-secondary-10 px-4 py-2 hover:-translate-y-0.5 hover:shadow-elevation-1 outline-none border-none'
                    @click="handleClickPlay(question.id)">
                    <v-icon icon="mdi-antenna"></v-icon>
                    Chơi ngay
                  </button>
                </div>

                <div>{{ question }}</div>

              </div>
            </div>
          </div>
          <div>2</div>
        </div>
      </div>
      <Loading v-if="isShowLoading"></Loading>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppBar from "@/components/AppBar.vue";
import { useRouter } from "vue-router";
import useQuestionStore from "@/stores/question";
import useAnswerStore from "@/stores/answer";

import { onBeforeMount, ref } from "vue";


const isShowLoading = ref(false);
const router = useRouter();
const questionStore = useQuestionStore();
const answerStore = useAnswerStore();

const { questionId } = router.currentRoute.value.params;
const { question } = useQuestionStore();

onBeforeMount(async () => {
  await questionStore.setQuestion(String(questionId));
});

const handleClickPlay = async (questionId: string) => {
  isShowLoading.value = true;
  await questionStore.setQuestion(questionId);
  await answerStore.setAnswers(questionId);
  isShowLoading.value = false;

  router.push({ name: "play", params: { questionId: questionId } });
}
</script>
