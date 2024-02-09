<template>
  <Loading v-if="isShowLoading"></Loading>
  <div v-if="!isShowLoading" class="!w-screen min-h-[calc(100vh-50px)]">
    <!-- app bar -->
    <AppBar></AppBar>

    <div class="flex flex-col items-center justify-center bg-primary-60">
      <div class="!pt-[50px] min-h-[calc(100vh-50px)] w-full xl:w-4/5 2xl:w-3/4 my-6 px-4 flex justify-center">
        <div class="flex flex-col md:flex-row gap-8">
          <div class="flex flex-col gap-4">
            <div class="flex gap-4 w-full md:min-w-[500px] px-4 bg-white p-4 rounded-lg">
              <div class="w-50 max-h-50 rounded overflow-hidden">
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

                  <v-snackbar v-model="isCopyToClipboard" :timeout="2000" color="success" rounded="pill">
                    <div class="text-center">Link đã được sao chép!</div>
                  </v-snackbar>
                </div>
              </div>
            </div>

            <div class="flex flex-col gap-4 w-full md:min-w-[500px] bg-white p-4 rounded-lg">
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

            <div class="flex flex-col gap-2 w-full md:min-w-[500px] bg-white p-4 rounded-lg">
              <div class="text-black font-semibold">
                Bảng xếp hạng
              </div>
              <Leaderboard :questionId="questionStore.question.id" :totalQuestions="questionStore.question.quantity">
              </Leaderboard>
            </div>

            <div class="flex flex-col gap-4 w-full md:min-w-[500px] bg-white p-4 rounded-lg">
              <div class="text-black font-semibold">
                Bình luận
              </div>
              <Comments />
            </div>
          </div>
          <div>
            <div class="text-black text-xl font-bold">Các câu đố liên quan</div>
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

import { onBeforeMount, ref } from "vue";
import { onBeforeUnmount } from "vue";
import Leaderboard from "@/components/Leaderboard.vue";
import Comments from "@/components/Comments.vue";


const isShowLoading = ref(false);
const router = useRouter();
const questionStore = useQuestionStore();
const answerStore = useAnswerStore();

const { questionId } = router.currentRoute.value.params;

onBeforeMount(async () => {
  isShowLoading.value = true;
  await questionStore.setQuestion(String(questionId));
  isShowLoading.value = false;
});

onBeforeUnmount(() => {
  questionStore.resetQuestion();
})

const handleClickPlay = async (questionId: string) => {
  isShowLoading.value = true;
  await questionStore.setQuestion(questionId);
  await answerStore.setAnswers(questionId);
  isShowLoading.value = false;

  console.log('id: ', questionId)
  router.push({ name: "play", params: { questionId: questionId } });
}

const isCopyToClipboard = ref(false);

const handleClickShare = () => {
  const currentUrl = window.location.href;

  navigator.clipboard.writeText(currentUrl)
    .then(() => {
      console.log('Đã sao chép URL vào clipboard: ' + currentUrl);
      isCopyToClipboard.value = true;
    })
    .catch((err) => {
      console.error('Lỗi khi sao chép URL vào clipboard: ', err);
      isCopyToClipboard.value = false;
    });
}
</script>
