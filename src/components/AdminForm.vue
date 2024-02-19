<template>
  <v-container class="fixed inset-0 bg-black/50 z-30" fluid>
    <v-container
      class="w-[70vw] bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded"
      fluid
    >
      <div class="absolute top-0 right-0">
        <v-btn
          @click="closeForm"
          variant="flat"
          icon="fa-solid fa-close"
        ></v-btn>
      </div>
      <v-row>
        <v-col class="text-center font-bold text-2xl">Thêm bộ câu hỏi</v-col>
      </v-row>
      <v-row>
        <v-col class="flex flex-col gap-3">
          <v-text-field
            v-model:model-value="question.name"
            label="Tên bộ câu hỏi"
            :rules="[
              () => !!question.name || 'Tên bộ câu hỏi không được để trống',
            ]"
          ></v-text-field>

          <v-text-field
            v-model:model-value="question.timer"
            label="Thời gian mỗi câu"
            type="number"
            :rules="[
              () =>
                !!question.timer || 'Thời gian giới hạn không được để trống',
            ]"
            hide-spin-buttons
          ></v-text-field>

          <v-autocomplete
            :items="categories"
            label="Thể loại"
            item-title="name"
            item-value="id"
            v-model="question.categoryId"
          ></v-autocomplete>

          <v-autocomplete
            :items="[1,2,3]"
            label="Cấp độ"
            v-model="question.level"
          ></v-autocomplete>

          <v-btn color="blue" @click="createQuestion"> Send </v-btn>
        </v-col>
        <v-col>
          <UploadImage
            v-model:model-value="question.image"
            rectangle
          ></UploadImage>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script setup lang="ts">
import { ref, nextTick } from "vue";
import UploadImage from "./UploadImage.vue";
import type { questionBody } from "@/apis/questionApi";
import type { categoryProps } from "@/apis/categoryApi";
import categoryApi from "@/apis/categoryApi";
import useAccountStore from "@/stores/account";
import questionApi from "@/apis/questionApi";
import useQuestionStore from "@/stores/question";

const accountStore = useAccountStore();
const questionStore = useQuestionStore();

const question = ref<questionBody>({
  name: "",
  image: "https://i.imgur.com/Ekd3MLm.jpg",
  accountId: accountStore.account.id,
  categoryId: "c528aa85-6f65-4794-91c9-fe6102b94c12",
  timer: 15,
  level: 1,
});

const categories = ref<categoryProps[]>([]);

const emits = defineEmits(["closeForm"]);

async function getAllCategory() {
  try {
    const response = await categoryApi.getAllCategory();
    return response.data;
  } catch (error) {
    console.error("Có lỗi khi lấy dữ liệu từ server", error);
  }
}

async function createQuestion() {
  try {
    question.value.timer = parseInt(String(question.value.timer));
    const response = await questionApi.createQuestion(question.value);
    await questionStore.setQuestion(response.data.id);
    closeForm();
  } catch (error) {
    console.error("Có lỗi khi lấy dữ liệu từ server", error);
  }
}

nextTick(async () => {
  categories.value = await getAllCategory();
});

function closeForm() {
  emits("closeForm");
}
</script>
