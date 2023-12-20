<template>
  <v-container
    class="w-full h-full flex relative flex-1 justify-center items-center bg-slate-400 rounded cursor-pointer overflow-hidden"
  >
    <v-row
      v-if="rectangle"
      @click="chooseAvatar"
      class="absolute inset-0 p-2 overflow-hidden"
    >
      <v-img :src="modelValue" width="100%" height="100%" cover></v-img>
    </v-row>
    <v-row v-else class="flex justify-center items-center">
      <div class="w-72 h-72 rounded-full" @click="chooseAvatar">
        <v-img :src="modelValue" width="100%" height="100%" cover></v-img>
      </div>
    </v-row>
    <input
      type="file"
      ref="fileInput"
      style="display: none"
      @change="handleFileChange"
    />
    <Loading v-if="isShowLoading"></Loading>
  </v-container>
</template>

<script setup lang="ts">
import Loading from "./Loading.vue";
import imgurApi from "@/apis/imgurApi";
import { ref } from "vue";

const props = defineProps({
  modelValue: String,
  circle: {
    type: Boolean,
    default: true,
  },
  rectangle: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(["update:modelValue"]);

const fileInput = ref();
const isShowLoading = ref(false);
const modelValue = ref(props.modelValue);

function chooseAvatar() {
  fileInput.value.click();
}

async function handleFileChange(event: any) {
  try {
    isShowLoading.value = true;
    const file = (event.target as HTMLInputElement)?.files?.[0];

    if (!file) {
      return;
    }
    const formData = new FormData();
    formData.append("avatar", file);
    const response = await imgurApi.upload(formData);
    modelValue.value = response.data;
    emits("update:modelValue", modelValue.value);
    isShowLoading.value = false;
  } catch (error) {
    console.error("Error uploading image:", error);
  }
}
</script>

<style scoped></style>
