<template>
  <div class="w-screen h-screen fixed z-50 inset-0 bg-black/50 flex justify-center overflow:hidden"
    @click="onClickCloseSearch">
    <div class="flex-col mt-13 h-64 w-full md:w-[63vw] p-2 bg-primary-10 rounded overflow-hidden" :class="{
      'h-1/2': searchText.length !== 0,
    }" @click.stop>
      <div class="pb-2">
        <v-text-field bg-color="white" rounded="pill" variant="solo" placeholder="Tìm kiếm"
          prepend-inner-icon="fa-solid fa-search" hide-details="auto" v-model="searchText"></v-text-field>
      </div>
      <div class="h-[calc(100%-64px)] relative flex justify-center items-center">
        <div v-if="isShowLoading" class="w-full flex items-center justify-center">
          <v-progress-circular indeterminate :size="40" :width="4" color="#fff"></v-progress-circular>
        </div>
        <div class="h-full overflow-y-scroll">
          <!-- trường hợp nhập và tìm được -->
          <div v-if="searchText.length !== 0 && questions.length !== 0 && !isShowLoading"
            class="flex flex-col xl:grid grid-cols-1 xl:grid-cols-2 gap-2 mb-4">
            <CustomCardSearch :questions="questions" @click="handleSelectQuestion" @callMoreData="callMoreData">
            </CustomCardSearch>
          </div>

          <!-- trường hợp nhập mà không tìm được -->
          <div v-if="searchText.length !== 0 && questions.length == 0 && !isShowLoading"
            class="w-full h-full text-xl flex justify-center items-center text-white">
            Rất tiếc, không tìm thấy bộ câu hỏi nào
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, watch } from "vue";
import CustomCardSearch from "./CustomCardSearch.vue";
import Loading from "./Loading.vue";
import questionApi, { type questionProps } from "@/apis/questionApi";
import debounce from "lodash/debounce";
import { useRouter } from "vue-router";

const questions = ref<questionProps[]>([]);
const searchText = ref<string>("");
const page = ref<number>(1);
const isShowLoading = ref<boolean>(false);

const router = useRouter()

const emits = defineEmits([
  "closeSearch"
]);


const getSearchQuetions = debounce(async () => {
  try {
    isShowLoading.value = true;

    const response = await questionApi.getAllQuestion(
      5,
      page.value,
      searchText.value
    );
    questions.value = response.data.data;
    isShowLoading.value = false;
  } catch (error) {
    console.error("Có lỗi khi lấy dữ liệu từ server");
  }
}, 500);

function callMoreData() {
  console.log("question");
}

// async function getSearchQuetions() {
//     try {
//     const response = await questionApi.getAllQuestion(10, page.value, searchText.value);
//     questions.value = response.data.data;
//     console.log(questions.value);
//   } catch (error) {
//     console.error("Có lỗi khi lấy dữ liệu từ server");
//   }
// }

watch(searchText, async () => {
  await getSearchQuetions();
});

function onClickCloseSearch() {
  emits("closeSearch");
}

async function handleSelectQuestion(questionId: string) {
  router.push({ name: "question-details", params: { questionId: questionId } });
}
</script>

<style scoped></style>
