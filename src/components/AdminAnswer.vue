<template>
  <div class="w-screen h-screen bg-slate-600">
    <div class="w-full h-[80vh] relative">
      <div class="flex flex-col items-center h-full">
        <div class="w-[60vw] flex flex-1 flex-col p-2 gap-5">
          <div>
            <v-text-field v-model:model-value="answer.title" bg-color="white" rounded="pill" variant="solo" :rules="[
              () => !!answer.title || 'Tên bộ câu hỏi không được để trống',
            ]" label="Câu hỏi"></v-text-field>
          </div>
          <div class="flex flex-col flex-1 gap-5">
            <UploadImage v-model="answer.image" rectangle></UploadImage>

            <div class="relative grid grid-cols-1 md:grid-cols-2 gap-2">
              <v-text-field v-model:model-value="answer.answers[0]"
                :bg-color="selectedField === 'answerA' ? 'green' : 'white'" :prepend-inner-icon="selectedField === 'answerA'
                    ? 'fa-regular fa-circle-check'
                    : 'fa-regular fa-circle'
                  " rounded="pill" variant="solo" :rules="[
    () =>
      !!answer.answers[0] || 'Câu trả lời không được để trống',
  ]" co label="Đáp án A" @click:prepend-inner="selectTrueAnswer('answerA')"></v-text-field>
              <v-text-field v-model:model-value="answer.answers[1]"
                :bg-color="selectedField === 'answerB' ? 'green' : 'white'" :prepend-inner-icon="selectedField === 'answerB'
                    ? 'fa-regular fa-circle-check'
                    : 'fa-regular fa-circle'
                  " rounded="pill" variant="solo" :rules="[
    () =>
      !!answer.answers[1] || 'Câu trả lời không được để trống',
  ]" label="Đáp án B" @click:prepend-inner="selectTrueAnswer('answerB')"></v-text-field>
              <v-text-field v-model:model-value="answer.answers[2]"
                :bg-color="selectedField === 'answerC' ? 'green' : 'white'" :prepend-inner-icon="selectedField === 'answerC'
                    ? 'fa-regular fa-circle-check'
                    : 'fa-regular fa-circle'
                  " rounded="pill" variant="solo" :rules="[
    () =>
      !!answer.answers[2] || 'Câu trả lời không được để trống',
  ]" label="Đáp án C" @click:prepend-inner="selectTrueAnswer('answerC')"></v-text-field>
              <v-text-field v-model:model-value="answer.answers[3]"
                :bg-color="selectedField === 'answerD' ? 'green' : 'white'" :prepend-inner-icon="selectedField === 'answerD'
                    ? 'fa-regular fa-circle-check'
                    : 'fa-regular fa-circle'
                  " rounded="pill" variant="solo" :rules="[
    () =>
      !!answer.answers[3] || 'Câu trả lời không được để trống',
  ]" label="Đáp án D" @click:prepend-inner="selectTrueAnswer('answerD')"></v-text-field>
            </div>
          </div>
          <div v-if="mode === formMode.Edit" class="grid grid-cols-2 gap-2">
            <v-btn @click="updateAnswer" variant="elevated" color="blue" block>
              Lưu
            </v-btn>
            <v-btn @click="deleteAnswer" variant="elevated" color="blue" block>Xoá</v-btn>
          </div>
          <div v-if="mode === formMode.Add" class="grid grid-cols-1">
            <v-btn @click="createAnswer" variant="elevated" color="blue" block>Lưu</v-btn>
          </div>
        </div>
      </div>
      <Loading v-if="isShowLoading"></Loading>
    </div>

    <div class="p-2 w-full h-[20vh] bg-slate-400 flex flex- gap-2 !overflow-scroll custom-scrollbar">
      <v-card class="overflow-hidden" min-width="200px" v-for="answer in listAnswer" :key="answer.id">
        <v-img :src="answer.image" width="100%" height="100%" cover class="transition-all"
          @click="selectApiAnswer(answer.id)"></v-img>
      </v-card>

      <v-card class="overflow-hidden" min-width="200px" v-for="(answer, number) in listAddAnswer" :key="number">
        <v-img :src="answer.image" width="100%" height="100%" cover class="blur-sm hover:blur-0 transition-all"
          @click="selectAddAnswer(number)"></v-img>
      </v-card>

      <v-card min-width="200px" class="flex justify-center items-center !overflow-visible" @click="newAnsswer">
        <v-icon size="x-large" icon="fa-solid fa-circle-plus"></v-icon>
      </v-card>
    </div>
  </div>
  <v-snackbar v-model="isCreateSuccess" :timeout="2000" color="success">
    <div class="text-center">Thêm thành công</div>
  </v-snackbar>
  <v-snackbar v-model="isUpdateSuccess" :timeout="2000" color="success">
    <div class="text-center">Cập nhật thành công</div>
  </v-snackbar>
  <v-snackbar v-model="isDeleteSuccess" :timeout="2000" color="success">
    <div class="text-center">Xoá thành công</div>
  </v-snackbar>
</template>

<script setup lang="ts">
import useQuestionStore from "@/stores/question";
import { ref, onBeforeMount } from "vue";
import UploadImage from "@/components/UploadImage.vue";
import answerApi, { type answerBody, type answerProps } from "@/apis/answerApi";
import useAnswerStore from "@/stores/answer";
import { formMode } from "@/helper/enum";
import Loading from "./Loading.vue";

const questionStore = useQuestionStore();
const answerStore = useAnswerStore();

const questionId = ref(questionStore.questionId);
const apiAnswerSelectedId = ref<string>("");
const addAnswerSelectedNumber = ref<number>(0);
const listAnswer = ref<answerProps[]>([]);
const mode = ref(formMode.Add);
const isShowLoading = ref(false);
const isApiList = ref(false);
const isAddList = ref(false);
const isCreateSuccess = ref(false);
const isUpdateSuccess = ref(false);
const isDeleteSuccess = ref(false);

const answer = ref<answerBody>({
  title: "",
  answers: [],
  trueAnswer: "",
  image: "https://i.imgur.com/oJN9YcQ.jpg",
});

const listAddAnswer = ref<Array<answerBody>>([]);

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
async function selectAddAnswer(number: number) {
  try {
    isApiList.value = false;
    isAddList.value = true;

    addAnswerSelectedNumber.value = number;
    isShowLoading.value = true;
    const response = listAddAnswer.value[number];
    mode.value = formMode.Edit;

    for (let index = 0; index < response.answers.length; index++) {
      answer.value.answers[index] = response.answers[index];
    }
    answer.value.title = response.title;
    answer.value.image = response.image;
    answer.value.trueAnswer = response.trueAnswer;

    switch (response.trueAnswer) {
      case response.answers[0]:
        selectedField.value = "answerA";
        break;
      case response.answers[1]:
        selectedField.value = "answerB";
        break;
      case response.answers[2]:
        selectedField.value = "answerC";
        break;
      case response.answers[3]:
        selectedField.value = "answerD";
        break;
      default:
        selectedField.value = "";
    }
    isShowLoading.value = false;
  } catch (error) {
    console.error("Có lỗi khi lấy answer", error);
  }
}

async function selectApiAnswer(answerId: string) {
  try {
    isApiList.value = true;
    isAddList.value = false;

    apiAnswerSelectedId.value = answerId;
    isShowLoading.value = true;
    const response = (await answerApi.getAnswerByAnswerId(answerId)).data;
    mode.value = formMode.Edit;

    for (let index = 0; index < response.answers.length; index++) {
      answer.value.answers[index] = response.answers[index];
    }
    answer.value.title = response.title;
    answer.value.image = response.image;
    answer.value.trueAnswer = response.trueAnswer;

    switch (response.trueAnswer) {
      case response.answers[0]:
        selectedField.value = "answerA";
        break;
      case response.answers[1]:
        selectedField.value = "answerB";
        break;
      case response.answers[2]:
        selectedField.value = "answerC";
        break;
      case response.answers[3]:
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
      answer.value.trueAnswer = answer.value.answers[0];
      break;
    case "answerB":
      answer.value.trueAnswer = answer.value.answers[1];
      break;
    case "answerC":
      answer.value.trueAnswer = answer.value.answers[2];
      break;
    case "answerD":
      answer.value.trueAnswer = answer.value.answers[3];
      break;
  }
}
//#endregion

//#region new Answer
function newAnsswer() {
  if (mode.value == formMode.Edit) {
    mode.value = formMode.Add;
  } else if (mode.value == formMode.Add) {
    listAddAnswer.value.push(answer.value);
  }

  answer.value = {
    title: "",
    answers: [],
    trueAnswer: "",
    image: "https://i.imgur.com/oJN9YcQ.jpg",
  };
  selectedField.value = "";
}
//#endregion

//#region btn

async function createAnswer() {
  try {
    isCreateSuccess.value = false;
    isShowLoading.value = true;
    await answerApi.createAnswerByQuestionId(
      questionId.value,
      listAddAnswer.value
    );

    listAddAnswer.value = [];
    await getAllAnswerByQuestionId();
    isShowLoading.value = false;
    isCreateSuccess.value = true;
  } catch (error) {
    console.log("Có lỗi khi thêm answer", error);
  }
}

async function deleteAnswer() {
  try {
    isDeleteSuccess.value = false;
    isShowLoading.value = true;

    if (isApiList.value == true) {
      await answerApi.deleteAnswer(apiAnswerSelectedId.value);
      await getAllAnswerByQuestionId();
    } else if (isAddList.value == true) {
      listAddAnswer.value.splice(addAnswerSelectedNumber.value, 1);
    }

    newAnsswer();
    isShowLoading.value = false;
    isDeleteSuccess.value = true;
  } catch (error) {
    console.log("Có lỗi khi xoá answer", error);
  }
}

async function updateAnswer() {
  try {
    isUpdateSuccess.value = false;
    isShowLoading.value = true;

    if (isApiList.value == true) {
      await answerApi.updateAnswerByAnswerId(
        apiAnswerSelectedId.value,
        answer.value
      );
      await getAllAnswerByQuestionId();
    } else if (isAddList.value == true) {
      listAddAnswer.value.splice(
        addAnswerSelectedNumber.value,
        1,
        answer.value
      );
    }

    newAnsswer();
    isShowLoading.value = false;
    isUpdateSuccess.value = true;
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
