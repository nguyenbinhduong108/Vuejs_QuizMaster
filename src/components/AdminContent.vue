<template>
  <div>
    <!-- app bar -->
    <AppBar :account="accountStore.account"></AppBar>

    <!-- option -->
    <div
      class="flex flex-col sm:flex-row mt-[50px] p-4 gap-2 bg-[url(@/assets/9Z_2102.w020.n001.1043B.p15.1043.jpg)] bg-cover bg-center bg-no-repeat"
    >
      <div class="flex-1 bg-slate-500 p-4 rounded-xl">
        <div class="text-center text-xl text-white font-bold">
          Welcome
          <span class="underline">{{ accountStore.account.username }}</span>
        </div>
        <div class="text-center pt-2">
          <v-btn
            @click="showForm"
            rounded="pill"
            variant="elevated"
            color="white"
            class="font-bold"
            >Create a quiz</v-btn
          >
        </div>
      </div>
      <div class="flex-1 bg-slate-500 p-4 rounded-xl">
        <div class="text-center text-xl text-white font-bold">
          Try our ChatGPT powered
        </div>
        <div class="text-center pt-2">
          <v-btn
            rounded="pill"
            variant="elevated"
            color="white"
            class="font-bold"
            >AI quiz generator</v-btn
          >
        </div>
      </div>
    </div>

    <!-- pagination -->
    <div class="w-full pt-4" v-if="totalPage > 1">
      <v-pagination
        v-model="page"
        :length="totalPage"
        rounded="circle"
      ></v-pagination>
    </div>
    <!-- body -->
    <div class="p-4 gap-2 grid grid-cols-1 lg:grid-cols-2">
      <v-card
        class="p-1"
        color="rgb(156, 163, 175)"
        v-for="question in listQuestion"
        :key="question.id"
      >
        <div class="text-center">{{ question.name }}</div>
        <div class="flex flex-col sm:flex-row gap-2">
          <div class="flex flex-1 max-h-[180px] rounded overflow-hidden">
            <v-img
              :src="question.image"
              width="100%"
              height="100%"
              cover
            ></v-img>
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
            <div class="flex gap-1">
              <div class="flex-1">
                <v-btn @click="addAnswer(question.id)" block color="#f44336">
                  Chỉnh sửa
                </v-btn>
              </div>
              <div class="flex-1">
                <v-btn
                  @click="deleteQuestion(question.id)"
                  block
                  prepend-icon="fa-solid fa-trash"
                  color="#f44336"
                >
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
      <v-pagination
        v-model="page"
        :length="totalPage"
        rounded="circle"
      ></v-pagination>
    </div>
    <!-- footer -->
    <Footer></Footer>
  </div>

  <AdminForm v-if="isShowForm" @closeForm="closeForm"></AdminForm>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import AppBar from "@/components/AppBar.vue";
import Footer from "@/components/Footer.vue";
import AdminForm from "@/components/AdminForm.vue";
import useAccountStore from "@/stores/account";
import useQuestionStore from "@/stores/question";
import questionApi from "@/apis/questionApi";
import type { questionProps } from "@/apis/questionApi";
import format from "@/helper/format";
import router from "@/router";

const accountStore = useAccountStore();
const questionStore = useQuestionStore();

const listQuestion = ref<questionProps[]>([]);
const page = ref(0);
const totalPage = ref(0);

async function getAllQuestionByAccountId() {
  try {
    const response = await questionApi.getAllQuestionByAccountId(
      accountStore.account.id,
      10,
      page.value * 10,
      ""
    );
    listQuestion.value = response.data.data;
    totalPage.value = response.data.total;
  } catch (error) {
    console.error("Có lỗi khi lấy dữ liệu từ server", error);
  }
}

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
}

async function deleteQuestion(id: string) {
  try {
    const response = await questionApi.deleteQuestion(id);

    if (response) {
      console.log("Xoá thành công");
      await getAllQuestionByAccountId();
    }
  } catch (error) {
    console.error("Có lỗi khi xoá bộ câu hỏi", error);
  }
}

function addAnswer(questionId: string) {
  questionStore.questionId = questionId;
  router.push("admin/answer");
}
</script>

<style scoped></style>
