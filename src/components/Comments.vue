<template>
  <div class="flex flex-col gap-2">
    <div class="mb-4 flex flex-col gap-2">
      <div v-if="isCommentListLoading" class="w-full flex items-center justify-center">
        <v-progress-circular indeterminate :size="32" :width="4" color="#7070c2"></v-progress-circular>
      </div>

      <div v-if="commentList.length > 0 && !isCommentListLoading" v-for="(comment, index) in commentList" :key="index"
        class="flex gap-2 p-2 rounded w-full border border-gray-400">
        <div class="w-10 max-h-10 rounded-full overflow-hidden">
          <v-img :src="comment.account.avatar" width="40" height="40" cover></v-img>
        </div>
        <div class="w-full">
          <div class="flex place-content-between w-full">
            <div class="font-bold text-lg">{{ comment.account.username }}</div>
            <div>
              <v-rating :length="5" :model-value="comment.rating" color="warning" active-color="warning" disabled
                size="x-small" density="comfortable" />
            </div>
          </div>
          <div class="md:max-w-[400px]">{{ comment.comment }}</div>
        </div>
      </div>
      <div v-if="!isCommentListLoading && commentList.length === 0"
        class="flex items-center justify-center text-gray-400">Hãy là người đầu tiên để lại bình luận!</div>


      <div class="flex justify-end w-full">
        <v-pagination v-if="totalPage >= 2" v-model="page" class="my-2" :length="totalPage"
          :total-visible="totalPage / 2 + 1" active-color="#7070c2" size="small"></v-pagination>
      </div>
    </div>

    <div class="flex flex-col border border-gray-400 p-2 rounded">
      <div v-if="!isLoading">
        <v-textarea v-model="currentComment" variant="outlined" auto-grow label="Để lại bình luận của bạn..." clearable
          rows="2"></v-textarea>
        <div class="flex gap-2 items-center place-content-between">
          <div class="flex gap-2 items-center flex-col">
            <div class="flex items-center gap-2">
              <div>Xếp hạng: </div>
              <v-rating hover :length="5" size="x-small" density="comfortable" v-model="currentRating" color="warning"
                active-color="warning" />
            </div>
            <div v-if="errorMsg" class="text-red-500">{{ errorMsg }}</div>
            <LoginForm v-if="isShowLoginForm" @closeForm="closeLoginForm"></LoginForm>
          </div>

          <v-btn type="submit" class="w-10 flex items-center justify-center bg-primary-10 text-white" text="Gửi"
            @click="handleSendComment"></v-btn>
        </div>
      </div>
      <div v-if="isLoading" class="w-full flex items-center justify-center">
        <v-progress-circular indeterminate :size="32" :width="4" color="#7070c2"></v-progress-circular>
      </div>

      <v-snackbar v-model="isCommentSuccess" :timeout="2000" color="success">
        <div class="text-center">Bạn đã gửi 1 bình luận!</div>
      </v-snackbar>
    </div>
  </div>
</template>

<script lang="ts" setup>
import LoginForm from './LoginForm.vue';
import commentsApi, { type commentsProps } from '@/apis/commentsApi';
import useAccountStore from '@/stores/account';
import { watch } from 'vue';
import { onBeforeMount, ref } from 'vue';
const accountStore = useAccountStore();

const props = defineProps({
  questionId: String,
})

const commentList = ref<commentsProps[]>([])
const isCommentListLoading = ref<boolean>(false)
const page = ref<number>(1)
const totalPage = ref<number>(1)

const getCommentsList = async (questionId: string, page: number) => {
  try {
    isCommentListLoading.value = true

    const response = await commentsApi.getComments(questionId, page)
    commentList.value = response.data.data
    totalPage.value = response.data.total

    console.log('total ' + totalPage.value)
    isCommentListLoading.value = false
  } catch (error) {
    console.error("Có lỗi khi lấy dữ liệu từ server");
  }
}

watch(page, (newValue) => {
  if (props.questionId) {
    getCommentsList(props.questionId, newValue)
  }
})

watch(() => props.questionId, (newValue) => {
  if (newValue) {
    getCommentsList(newValue, 1)
  }
})

onBeforeMount(() => {
  if (props.questionId) {
    const questionId = props.questionId
    getCommentsList(questionId, 1)
  }
})

const currentComment = ref<string>('')
const currentRating = ref<number>(0)
const errorMsg = ref<string>('')
const isLoading = ref<boolean>(false)
const isCommentSuccess = ref<boolean>(false)
const isShowLoginForm = ref<boolean>(false)

const handleSendComment = async () => {
  try {
    if (!accountStore.account.id) {
      isShowLoginForm.value = true
    } else {
      if (currentRating.value === 0) {
        errorMsg.value = 'Bạn chưa chọn xếp hạng';
      }
      if (currentComment.value.length === 0) {
        errorMsg.value = 'Bạn chưa nhập bình luận';
      }

      if (currentComment.value.length > 0 && currentRating.value !== 0 && props.questionId && accountStore.account.id) {

        isLoading.value = true

        const response = await commentsApi.createComments({
          comment: currentComment.value,
          rating: currentRating.value,
          accountId: accountStore.account.id,
          questionId: props.questionId,
        });

        if (response.status === 200) {
          currentComment.value = "";
          currentRating.value = 0;
          errorMsg.value = '';
          getCommentsList(props.questionId, 1);
        }
        isCommentSuccess.value = true
        isLoading.value = false
      }
    }
  }
  catch (error) {
    console.error("Có lỗi khi lấy dữ liệu từ server");
    isCommentSuccess.value = false
  }


};

const closeLoginForm = () => {
  isShowLoginForm.value = false;
}

</script>