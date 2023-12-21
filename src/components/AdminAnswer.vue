<template>
  <div class="w-screen h-screen bg-slate-600">
    <div class="w-full h-[80vh]">
      <div class="flex flex-col items-center h-full">
        <div class="w-[60vw] flex flex-1 flex-col justify-between p-2 gap-5">
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
              v-model:model-value="answer.image"
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
                label="Đáp án A"
                ref="answerA"
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
                ref="answerB"
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
                ref="answerC"
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
                ref="answerD"
                @click:prepend-inner="selectTrueAnswer('answerD')"
              ></v-text-field>
            </div>
          </div>
        </div>
      </div>
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
import useAnswerStore from "@/stores/answer"

const questionId = ref();
const questionStore = useQuestionStore();
const answerStore = useAnswerStore();
const listAnswer = ref<answerProps[]>([]);

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
  questionId.value = questionStore.questionId;
  await getAllAnswerByQuestionId()
});

async function getAllAnswerByQuestionId(){
  try {
    await answerStore.setAnswers(questionId.value);
    listAnswer.value = answerStore.answers;
  } catch (error) {
    console.error('Có lỗi khi lấy dữ liệu', error);
  }
}

async function selectAnswer(answerId: string){
  try {
    const response = (await answerApi.getAnswerByAnswerId(answerId)).data;

    answer.value.answerA = response.answerA;
    answer.value.answerB = response.answerB;
    answer.value.answerC = response.answerC;
    answer.value.answerD = response.answerD;
    answer.value.title = response.title;
    answer.value.image = response.image;
  } catch (error) {
    console.error("Có lỗi khi lấy answer", error);
  }
}


//#region chọn đáp án đúng
const selectedField = ref();

function selectTrueAnswer(trueAnswer: string) {
  selectedField.value = trueAnswer;
}
//#endregion

//#region new Answer
function newAnsswer() {
  answer.value = {
    title: "",
    answerA: "",
    answerB: "",
    answerC: "",
    answerD: "",
    trueAnswer: "",
    image: "https://i.imgur.com/oJN9YcQ.jpg",
  };
}
//#endregion
</script>
