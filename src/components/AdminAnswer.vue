<template>
  <div class="w-screen h-screen bg-slate-600">
    <div class="w-full h-[80vh] relative">
      <div class="flex flex-col items-center h-full">
        <div class="w-[60vw] flex flex-1 flex-col p-2 gap-5">
          <div>
            <v-text-field
              v-model:model-value="answer.title"
              bg-color="white"
              rounded="pill"
              variant="solo"
              :rules="[
                () => !!answer.title || 'Tên bộ câu hỏi không được để trống',
              ]"
              label="Tên câu hỏi"
            ></v-text-field>
          </div>
          <div class="flex flex-col flex-1 gap-5">


            <UploadImage 
              v-model="answer.image" 
              rectangle
              ></UploadImage>

            <div class="relative grid grid-cols-1 md:grid-cols-2 gap-2">
              <v-text-field
                v-model:model-value="answer.answerA"
                :bg-color="selectedField === 'answerA' ? 'green' : 'white'"
                :prepend-inner-icon="
                  selectedField === 'answerA'
                    ? 'fa-regular fa-circle-check'
                    : 'fa-regular fa-circle'
                "
                rounded="pill"
                variant="solo"
                :rules="[
                  () => !!answer.answerA || 'Câu trả lời không được để trống',
                ]"
                co
                label="Đáp án A"
                @click:prepend-inner="selectTrueAnswer('answerA')"
              ></v-text-field>
              <v-text-field
                v-model:model-value="answer.answerB"
                :bg-color="selectedField === 'answerB' ? 'green' : 'white'"
                :prepend-inner-icon="
                  selectedField === 'answerB'
                    ? 'fa-regular fa-circle-check'
                    : 'fa-regular fa-circle'
                "
                rounded="pill"
                variant="solo"
                :rules="[
                  () => !!answer.answerB || 'Câu trả lời không được để trống',
                ]"
                label="Đáp án B"
                @click:prepend-inner="selectTrueAnswer('answerB')"
              ></v-text-field>
              <v-text-field
                v-model:model-value="answer.answerC"
                :bg-color="selectedField === 'answerC' ? 'green' : 'white'"
                :prepend-inner-icon="
                  selectedField === 'answerC'
                    ? 'fa-regular fa-circle-check'
                    : 'fa-regular fa-circle'
                "
                rounded="pill"
                variant="solo"
                :rules="[
                  () => !!answer.answerC || 'Câu trả lời không được để trống',
                ]"
                label="Đáp án C"
                @click:prepend-inner="selectTrueAnswer('answerC')"
              ></v-text-field>
              <v-text-field
                v-model:model-value="answer.answerD"
                :bg-color="selectedField === 'answerD' ? 'green' : 'white'"
                :prepend-inner-icon="
                  selectedField === 'answerD'
                    ? 'fa-regular fa-circle-check'
                    : 'fa-regular fa-circle'
                "
                rounded="pill"
                variant="solo"
                :rules="[
                  () => !!answer.answerD || 'Câu trả lời không được để trống',
                ]"
                label="Đáp án D"
                @click:prepend-inner="selectTrueAnswer('answerD')"
              ></v-text-field>
            </div>
          </div>
          <div v-if="mode === formMode.Edit" class="grid grid-cols-2 gap-2">
            <v-btn @click="updateAnswer" variant="elevated" color="blue" block
              >Lưu</v-btn
            >
            <v-btn @click="deleteAnswer" variant="elevated" color="blue" block
              >Xoá</v-btn
            >
          </div>
          <div v-if="mode === formMode.Add" class="grid grid-cols-1">
            <v-btn @click="createAnswer" variant="elevated" color="blue" block
              >Lưu</v-btn
            >
          </div>
        </div>
      </div>
      <Loading v-if="isShowLoading"></Loading>
    </div>

    <div
      class="p-2 w-full h-[20vh] bg-slate-400 flex flex- gap-2 overflow-x-scroll custom-scrollbar"
    >
      <v-card min-width="200px" v-for="answer in listAnswer" :key="answer.id">
        <v-img
          :src="answer.image"
          width="100%"
          height="100%"
          cover
          class="blur-sm hover:blur-0 transition-all"
          @click="selectAnswer(answer.id)"
        ></v-img>
      </v-card>

      <v-card
        min-width="200px"
        class="flex justify-center items-center"
        @click="newAnsswer"
      >
        <v-icon size="x-large" icon="fa-solid fa-circle-plus"></v-icon>
      </v-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import useQuestionStore from "@/stores/question";
import { ref, onBeforeMount } from "vue";
import UploadImage from "@/components/UploadImage.vue";
import answerApi, { type answerBody, type answerProps } from "@/apis/answerApi";
import useAnswerStore from "@/stores/answer";
import formMode from "@/helper/enum";
import Loading from "./Loading.vue";

const questionStore = useQuestionStore();
const questionId = ref(questionStore.questionId);
const answerSelectedId = ref();
const answerStore = useAnswerStore();
const listAnswer = ref<answerProps[]>([]);
const mode = ref(formMode.Add);
const isShowLoading = ref(false);

const answer = ref<answerBody>({
  title: "",
  answerA: "",
  answerB: "",
  answerC: "",
  answerD: "",
  trueAnswer: "",
  image: "https://i.imgur.com/oJN9YcQ.jpg",
});
onBeforeMount(async () => {
  await getAllAnswerByQuestionId();
});

//#region call api lấy các answer
async function getAllAnswerByQuestionId() {
  try {
    await answerStore.setAnswers(questionId.value);
    listAnswer.value = answerStore.answers;
  } catch (error) {
    console.error("Có lỗi khi lấy dữ liệu", error);
  }
}
//#endregion

//#region chọn 1 answer
async function selectAnswer(answerId: string) {
  try {
    answerSelectedId.value = answerId;
    isShowLoading.value = true;
    const response = (await answerApi.getAnswerByAnswerId(answerId)).data;
    mode.value = formMode.Edit;

    console.log(answer.value.image);
    answer.value.answerA = response.answerA;
    answer.value.answerB = response.answerB;
    answer.value.answerC = response.answerC;
    answer.value.answerD = response.answerD;
    answer.value.title = response.title;
    answer.value.image = response.image;
    answer.value.trueAnswer = response.trueAnswer;

    switch (response.trueAnswer) {
      case response.answerA:
        selectedField.value = "answerA";
        break;
      case response.answerB:
        selectedField.value = "answerB";
        break;
      case response.answerC:
        selectedField.value = "answerC";
        break;
      case response.answerD:
        selectedField.value = "answerD";
        break;
    }
    isShowLoading.value = false;
  } catch (error) {
    console.error("Có lỗi khi lấy answer", error);
  }
}
//#endregion

//#region chọn đáp án đúng
const selectedField = ref();

function selectTrueAnswer(trueAnswer: string) {
  selectedField.value = trueAnswer;

  switch (trueAnswer) {
    case "answerA":
      answer.value.trueAnswer = answer.value.answerA;
      break;
    case "answerB":
      answer.value.trueAnswer = answer.value.answerB;
      break;
    case "answerC":
      answer.value.trueAnswer = answer.value.answerC;
      break;
    case "answerD":
      answer.value.trueAnswer = answer.value.answerD;
      break;
  }
}
//#endregion

//#region new Answer
function newAnsswer() {
  mode.value = formMode.Add;
  console.log(answer.value.image);

  answer.value = {
    title: "",
    answerA: "",
    answerB: "",
    answerC: "",
    answerD: "",
    trueAnswer: "",
    image: "https://i.imgur.com/oJN9YcQ.jpg",
  };
  selectedField.value = '';


}
//#endregion

//#region btn
async function createAnswer() {
  try {
    isShowLoading.value = true;
    const response = await answerApi.createAnswerByQuestionId(
      questionId.value,
      answer.value
    );
    await getAllAnswerByQuestionId();
    newAnsswer();
    isShowLoading.value = false;
  } catch (error) {
    console.log("Có lỗi khi thêm answer", error);
  }
}

async function deleteAnswer() {
  try {
    isShowLoading.value = true;
    const response = await answerApi.deleteAnswer(answerSelectedId.value);
    await getAllAnswerByQuestionId();

    isShowLoading.value = false;
  } catch (error) {
    console.log("Có lỗi khi xoá answer", error);
  }
}

async function updateAnswer() {
  try {
    isShowLoading.value = true;
    const response = await answerApi.updateAnswerByAnswerId(answerSelectedId.value,answer.value);

    await getAllAnswerByQuestionId();

    console.log(answer.value);
    isShowLoading.value = false;
  } catch (error) {
    console.log("Có lỗi khi cập nhật answer", error);
  }
}

//#endregion
</script>

<style scoped>
:deep(.v-messages__message) {
  color: white !important;
}
</style>

