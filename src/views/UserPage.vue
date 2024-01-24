<template>
  <div class="!w-screen min-h-screen">
    <!-- app bar -->
    <AppBar></AppBar>

    <!-- main -->
    <div class="bg-white !pt-[50px] h-screen">
      <div class="flex justify-center flex-1 flex-col md:flex-row w-full h-full">
        <!-- menu -->
        <div class="flex flex-row md:!flex-col gap-2 min-w-[140px] bg-red-500 p-1 overflow-hidden">
          <div @click="getAllQuestion"
            class="p-3 font-bold text-white cursor-pointer rounded hover:bg-slate-200 hover:!text-black whitespace-nowrap">
            All
          </div>
          <div v-for="category in categories" :key="category.id" @click="getQuestionByCategory(category.id)"
            class="p-3 font-bold text-white cursor-pointer rounded hover:bg-slate-200 hover:!text-black whitespace-nowrap">
            {{ category.name }}
          </div>
        </div>
        <!-- content -->
        <div class="relative w-full h-full flex flex-col gap-3 p-3 overflow-y-auto custom-scrollbar">
          <div class="flex flex-wrap gap-3 items-stretch overflow-visible">
            <CustomCard :questions="questions" @click="selecteddCardOnClick"></CustomCard>
          </div>
        </div>
      </div>
      <Loading v-if="isShowLoading"></Loading>
    </div>

    <!-- footer -->
    <!-- <Footer></Footer> -->
  </div>
</template> 

<script setup lang="ts">
import AppBar from "@/components/AppBar.vue";
import Footer from "@/components/Footer.vue";
import CustomCard from '../components/CustomCard.vue'
import Loading from "../components/Loading.vue";

import categoryApi, { type categoryProps } from "@/apis/categoryApi";
import questionApi, { type questionProps } from "@/apis/questionApi";

import { onBeforeMount, ref } from "vue";
import useAnswerStore from "@/stores/answer";
import useQuestionStore from "@/stores/question";

import { useRouter } from "vue-router";
import useAccountStore from "@/stores/account";

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
    const response = await questionApi.getAllQuestion(10, 1, "");
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
      1,
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

  router.push({ name: 'play', params: { questionId: questionId } });
}

onBeforeMount(() => {
  getAllCategory();
  getAllQuestion();
});
</script>

<style scoped></style>
