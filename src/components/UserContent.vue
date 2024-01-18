<template>
  <div class="flex justify-center flex-1 flex-col md:flex-row w-full h-full">
    <!-- menu -->
    <div
      class="flex flex-row md:!flex-col gap-2 min-w-[140px] bg-slate-500 p-1 overflow-hidden"
    >
      <div
        @click="getAllQuestion"
        class="p-3 font-bold text-white cursor-pointer rounded hover:bg-slate-200 hover:!text-black whitespace-nowrap"
      >
        All
      </div>
      <div
        v-for="category in categories"
        :key="category.id"
        @click="getQuestionByCategory(category.id)"
        class="p-3 font-bold text-white cursor-pointer rounded hover:bg-slate-200 hover:!text-black whitespace-nowrap"
      >
        {{ category.name }}
      </div>
    </div>
    <!-- content -->
    <div
      class="relative w-full h-full flex flex-col gap-3 p-3 overflow-y-auto custom-scrollbar"
    >
      <div
        class="relative bg-[url(../assets/9Z_2102.w020.n001.1043B.p15.1043.jpg)] bg-cover bg-center bg-no-repeat rounded-2xl min-h-[250px] w-full"
      >
        <div
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-5xl text-white p-4 rounded-2xl backdrop-blur-sm backdrop-brightness-75 cursor-pointer font-bold shadow-xl shadow-slate-800"
        >
          Welcome to QuizMaster
          <span class="underline">
            {{ accountStore.account.username }}
          </span>
        </div>
      </div>
      <div class="flex flex-wrap gap-3 items-stretch overflow-visible">
        <CustomCard
          :questions="questions"
          @click="selecteddCardOnClick"
        ></CustomCard>
      </div>
      <Loading v-if="isShowLoading"></Loading>
    </div>
  </div>
</template>

<script setup lang="ts">
import categoryApi, { type categoryProps } from "@/apis/categoryApi";
import questionApi, { type questionProps } from "@/apis/questionApi";
import CustomCard from "./CustomCard.vue";
import Loading from "./Loading.vue";
import { onBeforeMount, ref } from "vue";
import useAnswerStore from "@/stores/answer";
import useQuestionStore from "@/stores/question";
import useAccountStore from "@/stores/account";

import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const questions = ref<questionProps[]>([]);
const categories = ref<categoryProps[]>([]);
const isShowLoading = ref(false);
const answerStore = useAnswerStore();
const questionStore = useQuestionStore();
const accountStore = useAccountStore();

async function getAllQuestion() {
  try {
    isShowLoading.value = true;
    const response = await questionApi.getAllQuestion(10, 0, "");
    questions.value = response.data.data;
    isShowLoading.value = false;
  } catch (error) {
    console.error("Có lỗi khi lấy dữ liệu từ server");
  }
}

async function getAllCategory() {
  try {
    const data = await categoryApi.getAllCategory();
    categories.value = data.data;
  } catch (error) {
    console.error("Có lỗi khi lấy dữ liệu từ server", error);
  }
}

async function getQuestionByCategory(categoryId: string) {
  try {
    isShowLoading.value = true;
    const response = await questionApi.getAllQuestionByCategoryId(
      categoryId,
      10,
      0,
      ""
    );
    questions.value = response.data.data;
    isShowLoading.value = false;
  } catch (error) {
    console.error("Có lỗi khi lấy dữ liệu từ server");
  }
}

async function selecteddCardOnClick(questionId: string) {
  isShowLoading.value = true;
  await questionStore.setQuestion(questionId);
  await answerStore.setAnswers(questionId);
  isShowLoading.value = false;

  router.push({name: 'user-play', params: {id: accountStore.account.id, questionId: questionId}});
}

onBeforeMount(() => {
  getAllCategory();
  getAllQuestion();
});
</script>
