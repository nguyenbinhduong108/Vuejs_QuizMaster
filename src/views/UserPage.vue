<template>
  <div class="!w-screen min-h-[calc(100vh-50px)]">
    <!-- app bar -->
    <AppBar></AppBar>

    <!-- main -->
    <div class="flex flex-col items-center justify-center bg-primary-60">
      <div class="!pt-[50px] min-h-[calc(100vh-50px)] w-full xl:w-4/5 2xl:w-3/4 my-6 px-4 flex justify-center">
        <div class="flex flex-col lg:flex-row gap-8 overflow-hidden pt-4">
          <!-- menu -->
          <div v-if="categories.length > 0" class="flex lg:!flex-col gap-2">
            <div @click="() => {
              getAllQuestion();
              selectCategory(null);
            }
              "
              class="bg-primary-20 py-2 px-4 font-medium w-28 text-slate-500 cursor-pointer rounded-lg whitespace-nowrap hover:bg-primary-40 hover:border hover:border-1 border-primary-10 hover:text-primary-30 active:bg-primary-10"
              :class="{ selected: selectedCategory === null }">
              Tất cả
            </div>

            <div v-for="category in categories" :key="category.id" @click="() => {
              getQuestionByCategory(category.id);
              selectCategory(category.id);
            }
              "
              class="bg-primary-20 py-2 px-4 font-medium w-28 text-slate-500 cursor-pointer rounded-lg whitespace-nowrap hover:bg-primary-40 hover:border hover:border-1 border-primary-10 hover:text-primary-30 active:bg-primary-10"
              :class="{ selected: selectedCategory === category.id }">
              {{ category.name }}
            </div>
          </div>

          <!-- content -->
          <div v-if="questions.length > 0" class="flex flex-col md:grid grid-cols-1 md:grid-cols-2 gap-4">
            <CustomCard :questions="questions" @click="handleSelectQuestion"></CustomCard>
          </div>
          <div v-if="questions.length <= 0 && !isShowLoading"
            class="min-w-[calc(100vw-500px)] text-xl flex items-center justify-center">Xin lỗi, chủ đề này không
            có câu hỏi
            nào!</div>
        </div>
      </div>
      <Loading v-if="isShowLoading"></Loading>
    </div>
  </div>

  <!-- footer -->
  <!-- <Footer></Footer> -->
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

// async function selectedCardOnClick(questionId: string) {
//   isShowLoading.value = true;
//   await questionStore.setQuestion(questionId);
//   await answerStore.setAnswers(questionId);
//   isShowLoading.value = false;

//   router.push({ name: "play", params: { questionId: questionId } });
// }

async function handleSelectQuestion(questionId: string) {
  router.push({ name: "questionDetails", params: { questionId: questionId } });
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
