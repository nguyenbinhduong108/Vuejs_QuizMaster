<template>
  
  <div class="relative">
    <div v-if="isShowLoading"  class="fixed inset-0 z-[99999]">
      <Loading></Loading>
    </div>
      
    <!-- app bar -->
    <AppBar :account="accountStore.account"></AppBar>
    <!-- option -->
    <div
      class="flex flex-col sm:flex-row mt-[50px] p-4 gap-2 bg-[url(@/assets/9Z_2102.w020.n001.1043B.p15.1043.jpg)] bg-cover bg-center bg-no-repeat">
      <div class="flex-1 bg-slate-500 p-4 rounded-xl">
        <div class="text-center text-xl text-white font-bold">
          Welcome
          <span class="underline">{{ accountStore.account.username }}</span>
        </div>
        <div class="text-center pt-2">
          <v-btn @click="showForm" rounded="pill" variant="elevated" color="white" class="font-bold">Create a quiz</v-btn>
        </div>
      </div>
      <div class="flex-1 bg-slate-500 p-4 rounded-xl">
        <div class="text-center text-xl text-white font-bold">
          Try our ChatGPT powered
        </div>
        <div class="text-center pt-2">
          <v-btn rounded="pill" variant="elevated" color="white" class="font-bold">AI quiz generator</v-btn>
        </div>
      </div>
    </div>

    <!-- body -->
    <div class="p-4 gap-2 grid grid-cols-1 lg:grid-cols-2">
      <v-card class="p-1" color="rgb(156, 163, 175)" v-for="question in listQuestion" :key="question.id">
        <div class="text-center">{{ question.name }}</div>
        <div class="flex flex-col sm:flex-row gap-2">
          <div class="flex flex-1 max-h-[180px] rounded overflow-hidden">
            <v-img :src="question.image" width="100%" height="100%" cover></v-img>
          </div>
          <div class="flex-1 flex-col">
            <div>
              <div>Chủ đề: {{ question.category.name }}</div>
              <div>Thời gian: {{ question.timer }}</div>
              <div>Tổng số câu hỏi: {{ question.quantity }}</div>
              <div>Tổng số lượt chơi: {{ question.turn }}</div>
              <div>
                Ngày khởi tạo: {{ format.formatDate(question.createdAt) }}
              </div>
              <div>
                Lần cập nhật cuối: {{ format.formatDate(question.updatedAt) }}
              </div>
            </div>
            <div class="grid sm:flex gap-1">
              <div class="flex-1">
                <v-btn @click="addAnswer(question.id)" block color="#7070c2">
                  Chỉnh sửa
                </v-btn>
              </div>
              <div class="flex-1">
                <v-btn @click="deleteQuestion(question.id)" block prepend-icon="fa-solid fa-trash" color="#7070c2">
                  Xoá
                </v-btn>
              </div>
            </div>
          </div>
        </div>
      </v-card>
    </div>

    <!-- pagination -->
    <div class="w-full pb-4" v-if="totalPage > 1">
      <v-pagination v-model="page" :length="totalPage" rounded="circle"></v-pagination>
    </div>
    <!-- footer -->
    <Footer></Footer>
  
    <v-snackbar v-model="isDeleteSuccess" :timeout="2000" color="success">
      <div class="text-center">Xoá thành công</div>
    </v-snackbar>
  </div>

  <AdminForm v-if="isShowForm" @closeForm="closeForm" @showLoading="showLoading"></AdminForm>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, watch } from "vue";
import AppBar from "@/components/AppBar.vue";
import Footer from "@/components/Footer.vue";
import AdminForm from "@/components/AdminForm.vue";
import useAccountStore from "@/stores/account";
import useQuestionStore from "@/stores/question";
import questionApi from "@/apis/questionApi";
import type { questionProps } from "@/apis/questionApi";
import format from "@/helper/format";
import router from "@/router";
import Loading from "./Loading.vue";

const accountStore = useAccountStore();
const questionStore = useQuestionStore();

const listQuestion = ref<questionProps[]>([]);
const page = ref(1);
const totalPage = ref(0);
const isShowLoading = ref(false);
const isDeleteSuccess = ref(false);

const showLoading = () => {
  isShowLoading.value = true;
}

async function getAllQuestionByAccountId() {
  try {
    const response = await questionApi.getAllQuestionByAccountId(
      accountStore.account.id,
      10,
      page.value,
      ""
    );
    listQuestion.value = response.data.data;
    totalPage.value = response.data.total;
  } catch (error) {
    console.error("Có lỗi khi lấy dữ liệu từ server", error);
  }
}

watch(page,async () => {
  isShowLoading.value = true;
  await getAllQuestionByAccountId();
  isShowLoading.value = false;
})

onBeforeMount(async () => {
  await getAllQuestionByAccountId();
});

const isShowForm = ref(false);
function showForm() {
  isShowForm.value = true;
}

async function closeForm() {
  await getAllQuestionByAccountId();
  isShowForm.value = false;
  isShowLoading.value = false;
}

async function deleteQuestion(id: string) {
  try {
    isDeleteSuccess.value = false;
    isShowLoading.value = true;
    const response = await questionApi.deleteQuestion(id);
    if (response) {
      await getAllQuestionByAccountId();
    }
    isShowLoading.value = false;
    isDeleteSuccess.value = true;
  } catch (error) {
    console.error("Có lỗi khi xoá bộ câu hỏi", error);
  }
}

function addAnswer(questionId: string) {
  questionStore.questionId = questionId;
  router.push({ name: 'admin-answer' });
}
</script>

<style scoped></style>
