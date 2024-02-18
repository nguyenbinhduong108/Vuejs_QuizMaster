<template>
  <Loading v-if="isShowLoading"></Loading>
  <div v-if="!isShowLoading" class="!w-screen min-h-[calc(100vh-50px)]">
    <!-- app bar -->
    <AppBar></AppBar>

    <!-- main -->
    <div class="flex flex-col items-center justify-center bg-primary-60">
      <div class="!pt-[50px] min-h-[calc(100vh-50px)] w-full xl:w-4/5 2xl:w-3/4 my-6 px-4 flex justify-center">
        <div class="flex flex-col lg:flex-row gap-8 overflow-hidden pt-4">
          <!-- menu -->
          <div v-if="categories.length > 0" class="flex overflow-x-scroll lg:!flex-col gap-2 hidden-scroll">
            <div @click="() => {
              getAllQuestion(1);
              selectCategory(null);
            }
              "
              class="bg-primary-20 py-2 px-4 font-medium w-28 text-slate-500 cursor-pointer rounded-lg whitespace-nowrap hover:bg-primary-40 hover:border hover:border-1 border-primary-10 hover:text-primary-30 active:bg-primary-10"
              :class="{ selected: selectedCategory === null }">
              Tất cả
            </div>

            <div v-for="category in categories" :key="category.id" @click="() => {
              getQuestionByCategory(category.id, 1);
              selectCategory(category.id);
            }
              "
              class="bg-primary-20 py-2 px-4 font-medium w-28 text-slate-500 cursor-pointer rounded-lg whitespace-nowrap hover:bg-primary-40 hover:border hover:border-1 border-primary-10 hover:text-primary-30 active:bg-primary-10"
              :class="{ selected: selectedCategory === category.id }">
              {{ category.name }}
            </div>
          </div>

          <!-- content -->
          <div class="flex flex-col">
            <div v-if="questions.length > 0" class="flex flex-col md:grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <CustomCard :questions="questions" @click="handleSelectQuestion">
              </CustomCard>
            </div>
            <div v-if="questions.length > 0 && totalPage >= 2" class="flex justify-end w-full">
              <v-pagination v-model="page" class="my-2" :length="totalPage" :total-visible="totalPage / 2 + 1"
                active-color="#7070c2" size="small"></v-pagination>
            </div>
          </div>
          <div v-if="questions.length <= 0 && !isShowLoading"
            class="min-w-[calc(100vw-500px)] 2xl:min-w-[calc(100vw-700px)] text-xl flex items-center justify-center">Xin
            lỗi, chủ đề này không
            có câu hỏi
            nào!</div>
        </div>
      </div>

    </div>
  </div>

  <!-- footer -->
  <Footer v-if="!isShowLoading"></Footer>
</template>

<script setup lang="ts">
import AppBar from "@/components/AppBar.vue";
import Footer from "@/components/Footer.vue";
import CustomCard from "../components/CustomCard.vue";
import Loading from "../components/Loading.vue";

import categoryApi, { type categoryProps } from "@/apis/categoryApi";
import questionApi, { type questionProps } from "@/apis/questionApi";

import { onBeforeMount, ref } from "vue";
import useQuestionStore from "@/stores/question";

import { useRouter } from "vue-router";
import useAccountStore from "@/stores/account";
import { watch } from "vue";

const router = useRouter();

const questions = ref<questionProps[]>([]);
const categories = ref<categoryProps[]>([]);
const selectedCategory = ref<string | null>(null);

const isShowLoading = ref(false);
const questionStore = useQuestionStore();
const accountStore = useAccountStore();

const page = ref(1);
const totalPage = ref(0);

async function getAllQuestion(page: number) {
  try {
    isShowLoading.value = true;
    const response = await questionApi.getAllQuestion(10, page, "");
    questions.value = response.data.data;
    totalPage.value = response.data.total;
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

async function getQuestionByCategory(categoryId: string, page: number) {
  try {
    isShowLoading.value = true;
    const response = await questionApi.getAllQuestionByCategoryId(
      categoryId,
      10,
      page,
      ""
    );
    questions.value = response.data.data;
    totalPage.value = response.data.total;
    isShowLoading.value = false;
  } catch (error) {
    console.error("Có lỗi khi lấy dữ liệu từ server");
  }
}

async function handleSelectQuestion(questionId: string) {
  router.push({ name: "question-details", params: { questionId: questionId } });
}

onBeforeMount(() => {
  getAllCategory();
  getAllQuestion(1);
});

watch(page, (newValue) => {
  getAllQuestion(newValue);
  if (selectedCategory.value) {
    getQuestionByCategory(selectedCategory.value, newValue);
  }
})

const selectCategory = (categoryId: string | null) => {
  selectedCategory.value = categoryId;
  page.value = 1
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
