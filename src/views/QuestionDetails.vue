<template>
  <Loading v-if="isShowLoading"></Loading>
  <div v-if="!isShowLoading" class="!w-screen min-h-[calc(100vh-50px)]">
    <!-- app bar -->
    <AppBar></AppBar>

    <div class="flex flex-col items-center justify-center bg-primary-60">
      <div class="!pt-[50px] min-h-[calc(100vh-50px)] w-full xl:w-4/5 2xl:w-3/4 my-6 px-4 flex justify-center">
        <div class="flex flex-col md:flex-row gap-8">
          <div class="flex flex-col gap-4">
            <div v-if="questionStore.question.image"
              class="flex flex-col md:flex-row gap-4 w-full md:min-w-[500px] px-4 bg-white p-4 rounded-lg">
              <div class="md:w-50 md:max-h-50 min-w-50 min-h-50 rounded overflow-hidden flex items-center justify-center">
                <v-img :src="questionStore.question.image" width="200" height="200" cover></v-img>
              </div>

              <div class="flex flex-col gap-4">
                <div>
                  <v-chip color="#7070c2" variant="flat" size="small">
                    {{ questionStore.question.category.name }}</v-chip>
                </div>

                <div class="w-full xl:w-56 text-black !overflow-hidden line-clamp-3 text-xl font-bold">
                  {{ questionStore.question.name }}
                </div>

                <div class="flex xl:flex-col gap-2">
                  <button
                    className='w-full rounded-lg bg-secondary-10 px-4 py-2 hover:-translate-y-0.5 hover:shadow-elevation-1 outline-none border-none font-semibold whitespace-nowrap'
                    @click="handleClickPlay(questionStore.question.id)">
                    Chơi ngay
                  </button>
                  <div class="!border-2 !border-secondary-10 rounded-lg hover:-translate-y-0.5 hover:shadow-elevation-1">
                    <button
                      className='w-full rounded-lg bg-white px-4 py-2 !text-secondary-10 font-semibold whitespace-nowrap'
                      @click="handleClickShare">
                      Chia sẻ
                    </button>
                  </div>

                  <v-snackbar v-model="isCopyToClipboard" :timeout="2000" color="success">
                    <div class="text-center">Đã sao chép vào clipboard!</div>
                  </v-snackbar>
                </div>
              </div>
            </div>

            <div v-else class="flex flex-col md:flex-row gap-4 w-full md:min-w-[500px] px-4 bg-white p-4 rounded-lg">
              <div class="w-full flex items-center justify-center min-w-[250px]">
                <v-progress-circular indeterminate :size="32" :width="4" color="#7070c2"></v-progress-circular>
              </div>
            </div>


            <div v-if="questionStore.question.timer"
              class="flex flex-col gap-4 w-full md:min-w-[500px] bg-white p-4 rounded-lg">
              <div class="text-black font-semibold">
                Mô tả
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <div>Thời gian: <span class="text-gray-500">{{ questionStore.question.timer }} giây</span></div>
                  <div>Độ khó: <span class="text-gray-500">{{ questionStore.question.level === questionLevel.Easy ? 'Dễ' :
                    questionStore.question.level === questionLevel.Medium ? 'Trung bình' : 'Khó' }}</span></div>
                </div>
                <div>
                  <div>Số câu: <span class="text-gray-500">{{ questionStore.question.quantity }} câu</span></div>
                  <div>Lượt chơi: <span class="text-gray-500">{{ questionStore.question.turn }} lượt</span></div>
                </div>
              </div>
            </div>

            <div v-else class="flex flex-col md:flex-row gap-4 w-full md:min-w-[500px] px-4 bg-white p-4 rounded-lg">
              <div class="w-full flex items-center justify-center min-w-[250px]">
                <v-progress-circular indeterminate :size="32" :width="4" color="#7070c2"></v-progress-circular>
              </div>
            </div>

            <div v-if="questionStore.question.id"
              class="flex flex-col gap-2 w-full md:min-w-[500px] bg-white p-4 rounded-lg">
              <div class="text-black font-semibold">
                Bảng xếp hạng
              </div>
              <Leaderboard :questionId="questionStore.question.id" :totalQuestions="questionStore.question.quantity">
              </Leaderboard>
            </div>

            <div v-else class="flex flex-col md:flex-row gap-4 w-full md:min-w-[500px] px-4 bg-white p-4 rounded-lg">
              <div class="w-full flex items-center justify-center min-w-[250px]">
                <v-progress-circular indeterminate :size="32" :width="4" color="#7070c2"></v-progress-circular>
              </div>
            </div>

            <div v-if="questionStore.question.id"
              class="flex flex-col gap-4 w-full md:min-w-[500px] bg-white p-4 rounded-lg">
              <div class="text-black font-semibold">
                Bình luận
              </div>
              <Comments :questionId="questionStore.question.id" />
            </div>

            <div v-else class="flex flex-col md:flex-row gap-4 w-full md:min-w-[500px] px-4 bg-white p-4 rounded-lg">
              <div class="w-full flex items-center justify-center min-w-[250px]">
                <v-progress-circular indeterminate :size="32" :width="4" color="#7070c2"></v-progress-circular>
              </div>
            </div>
          </div>

          <div class="flex flex-col gap-2">
            <div class="text-black text-xl font-bold text-center">Các câu đố liên quan</div>
            <div v-if="!isRelativeQuestionsLoading"
              class="flex flex-col gap-2 overflow-y-auto max-h-[calc(100vh-100px)] pr-2">
              <div v-for="(question, index) in relativeQuestions" :key="index"
                @click="handleClickRelativeQuestion(question.id)"
                class="flex gap-2 bg-white p-3 rounded-lg w-full md:max-w-[250px] min-h-40 hover:-translate-y-0.5 hover:shadow-elevation-1 cursor-pointer">
                <div class="min-w-25 min-h-25 rounded overflow-hidden flex items-center justify-center">
                  <v-img :src="question.image" width="100" height="100" cover></v-img>
                </div>
                <div class="flex flex-col gap-2 max-w-[calc(100%-100px)]">
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

            <div v-if="isRelativeQuestionsLoading" class="w-full flex items-center justify-center min-w-[250px]">
              <v-progress-circular indeterminate :size="32" :width="4" color="#7070c2"></v-progress-circular>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppBar from "@/components/AppBar.vue";
import { useRouter } from "vue-router";
import useQuestionStore from "@/stores/question";
import useAnswerStore from "@/stores/answer";
import { questionLevel } from "@/helper/enum";

import { onBeforeMount, ref, onBeforeUnmount } from "vue"
import Leaderboard from "@/components/Leaderboard.vue"
import Comments from "@/components/Comments.vue"
import type { questionProps } from "@/apis/questionApi"
import questionApi from "@/apis/questionApi"
import { computed } from "vue"


const isShowLoading = ref(false)
const router = useRouter()
const questionStore = useQuestionStore()
const answerStore = useAnswerStore()
const { questionId } = router.currentRoute.value.params

onBeforeMount(async () => {
  isShowLoading.value = true
  await questionStore.setQuestion(String(questionId))
  await loadRelativeQuestions(questionStore.question.category.id)
  isShowLoading.value = false
});

// onBeforeUnmount(() => {
//   questionStore.resetQuestion()
// })

const handleClickPlay = async (questionId: string) => {
  isShowLoading.value = true
  await questionStore.setQuestion(questionId)
  await answerStore.setAnswers(questionId)
  isShowLoading.value = false
  router.push({ name: "play", params: { questionId: questionId } })
}

const isCopyToClipboard = ref(false)

const handleClickShare = () => {
  const currentUrl = window.location.href

  navigator.clipboard.writeText(currentUrl)
    .then(() => {
      console.log('Đã sao chép URL vào clipboard: ' + currentUrl)
      isCopyToClipboard.value = true
    })
    .catch((err) => {
      console.error('Lỗi khi sao chép URL vào clipboard: ', err)
      isCopyToClipboard.value = false
    });
}

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
