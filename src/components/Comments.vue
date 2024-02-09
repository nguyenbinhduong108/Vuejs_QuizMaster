<template>
  <div class="flex flex-col gap-2">
    <div>

    </div>

    <div class="flex flex-col">
      <v-textarea v-model="currentComment" variant="outlined" label="Để lại bình luận của bạn"></v-textarea>
      <div class="flex justify-end">
        <v-btn type="submit" class="w-10 flex items-center justify-center bg-primary-10 text-white" text="Gửi"></v-btn>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';


const currentComment = ref()
</script>