<template>
  <v-container fluid
    class="inset-0 w-screen h-screen sm:px-20 md:px-40 bg-[#2B2B6E] z-10 flex flex-col justify-center items-center">
    <v-col class="w-[150px] h-[150px]">
      <v-img :src="icon"></v-img>
    </v-col>
    <v-row>
      <v-col class="text-white text-2xl text-center font-bold">
        {{ text }}
      </v-col>
    </v-row>
    <v-col class="overflow-y-scroll min-h-[300px] hidden-scroll">
      <v-row class="text-center text-xl whitespace-nowrap bg-white rounded-lg p-4">
        <v-col>Câu đúng: {{ answerStore.point }} / {{ quantity }}</v-col>
        <v-col>Thời gian: {{ answerStore.totalTimer }}</v-col>
      </v-row>

      <v-row class="mt-6 flex flex-col gap-2">
        <div class="text-white text-lg font-bold">Bảng xếp hạng</div>
        <div v-if="questionStore.question.id" class="flex flex-col gap-2 w-full bg-white p-4 rounded-lg">
          <Leaderboard :questionId="questionStore.question.id" :totalQuestions="questionStore.question.quantity">
          </Leaderboard>
        </div>
      </v-row>
      <v-row class="mt-6">
        <div class="flex flex-col gap-2 w-full">
          <div class="text-white text-lg font-bold">Các câu đố liên quan</div>
          <div class="flex flex-col gap-2 w-full">
            <div v-for="(question, index) in relativeQuestions" :key="index"
              @click="handleClickRelativeQuestion(question.id)"
              class="flex gap-2 bg-white p-3 rounded-lg w-full min-h-40 hover:-translate-y-0.5 hover:shadow-elevation-1 cursor-pointer">
              <div class="rounded overflow-hidden flex items-center justify-center">
                <v-img :src="question.image" width="100" height="100" cover></v-img>
              </div>
              <div class="flex flex-col gap-2">
                <div>
                  <v-chip color="#7070c2" variant="flat" size="small">
                    {{ question.category.name }}</v-chip>
                </div>
                <div class="w-full text-black !overflow-hidden line-clamp-2">
                  {{ question.name }}
                </div>
                <div class="w-full text-black !overflow-hidden text-sm">
                  {{ question.quantity }} câu hỏi - {{ question.turn }} lượt chơi
                </div>
              </div>
            </div>
          </div>
        </div>
      </v-row>
    </v-col>
    <v-col class="grid grid-cols-1 md:grid-cols-2 w-full gap-1">
      <v-btn @click="repLay" color="green" prepend-icon="fa-solid fa-rotate-right">
        Chơi lại
      </v-btn>
      <v-btn @click="homePage" color="yellow" prepend-icon="fa-solid fa-home">
        Trang chủ
      </v-btn>
    </v-col>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import useAnswerStore from '@/stores/answer';
import useQuestionStore from '@/stores/question';
import useAccountStore from '@/stores/account';
import resource from '@/helper/resource';
import router from "@/router";
import Leaderboard from '@/components/Leaderboard.vue';
import type { questionProps } from '@/apis/questionApi';
import questionApi from '@/apis/questionApi';
import { computed } from 'vue';


const accountStore = useAccountStore();
const questionStore = useQuestionStore();
const answerStore = useAnswerStore();
const quantity = ref(questionStore.question.quantity);

const icon = ref();
const text = ref("");
function resultForm() {
  if (answerStore.point < quantity.value / 2) {
    icon.value = resource.icon.lost;
    text.value = "Chúc bạn may mắn lần sau!";
  } else {
    icon.value = resource.icon.win;
    text.value = `Tuyệt quá! Bạn đã chinh phục được câu đố: ${questionStore.question.name}!`;
  }
}

//#region button
function repLay() {
  answerStore.resetPoint();
  router.push({
    name: 'play',
    params: {
      questionId: questionStore.question.id
    }
  });
}

function homePage() {
  answerStore.resetAnswer();
  questionStore.resetQuestion();
  router.push("/");
}
//#endregion

onBeforeMount(async () => {
  resultForm()
  await loadRelativeQuestions(questionStore.question.category.id)
})


const relativeQuestions = ref<questionProps[]>([]);
const currentQuestion = computed(() => questionStore.question)
const isRelativeQuestionsLoading = ref(false)

const loadRelativeQuestions = async (categoryId: string) => {
  try {
    isRelativeQuestionsLoading.value = true
    const response = await questionApi.getAllQuestionByCategoryId(
      categoryId,
      10,
      1,
      ""
    );
    relativeQuestions.value = response.data.data.filter(
      (q: questionProps) => q.id !== currentQuestion.value.id
    );
    isRelativeQuestionsLoading.value = false
  } catch (error) {
    console.error("Có lỗi khi lấy dữ liệu từ server", error)
  }
}

const handleClickRelativeQuestion = async (questionId: string) => {
  await questionStore.setQuestion(String(questionId));
  await loadRelativeQuestions(questionStore.question.category.id)
  router.push({ name: "question-details", params: { questionId: questionId } })
}

</script>