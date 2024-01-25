<template>
  <div class="!w-screen min-h-screen">
    <!-- app bar -->
    <AppBar></AppBar>

    <!-- main -->
    <div class="flex flex-col items-center justify-center bg-primary-60">
      <div
        class="!pt-[50px] min-h-screen w-full lg:w-5/6 xl:w-4/5 2xl:w-1/2 my-6 px-4"
      >
        <div class="flex flex-col md:flex-row gap-8">
          <!-- menu -->
          <div class="flex md:!flex-col gap-2">
            <div
              @click="
                () => {
                  getAllQuestion();
                  selectCategory(null);
                }
              "
              class="bg-primary-20 py-2 px-4 font-medium w-28 text-slate-500 cursor-pointer rounded-lg whitespace-nowrap hover:bg-primary-40 hover:border hover:border-1 border-primary-10 hover:text-primary-30 active:bg-primary-10"
              :class="{ selected: selectedCategory === null }"
            >
              Tất cả
            </div>

            <div
              v-for="category in categories"
              :key="category.id"
              @click="
                () => {
                  getQuestionByCategory(category.id);
                  selectCategory(category.id);
                }
              "
              class="bg-primary-20 py-2 px-4 font-medium w-28 text-slate-500 cursor-pointer rounded-lg whitespace-nowrap hover:bg-primary-40 hover:border hover:border-1 border-primary-10 hover:text-primary-30 active:bg-primary-10"
              :class="{ selected: selectedCategory === category.id }"
            >
              {{ category.name }}
            </div>
          </div>

          <!-- content -->

          <div class="flex flex-wrap gap-4">
            <CustomCard
              :questions="questions"
              @click="selectedCardOnClick"
            ></CustomCard>
          </div>
        </div>
        <Loading v-if="isShowLoading"></Loading>
      </div>
    </div>

    <!-- footer -->
    <!-- <Footer></Footer> -->
  </div>
</template>

<script setup lang="ts">
import AppBar from "@/components/AppBar.vue";
import Footer from "@/components/Footer.vue";
import CustomCard from "../components/CustomCard.vue";
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
const selectedCategory = ref<string | null>(null);

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

async function selectedCardOnClick(questionId: string) {
  isShowLoading.value = true;
  await questionStore.setQuestion(questionId);
  await answerStore.setAnswers(questionId);
  isShowLoading.value = false;

  router.push({ name: "play", params: { questionId: questionId } });
}

onBeforeMount(() => {
  getAllCategory();
  getAllQuestion();
});

const selectCategory = (categoryId: string | null) => {
  selectedCategory.value = categoryId;
};
</script>

<style scoped>
.selected {
  background-color: #7070c2;
  color: #ffff;
}

.selected:hover {
  background-color: #7070c2;
  color: #ffff;
  border: none;
}
</style>
