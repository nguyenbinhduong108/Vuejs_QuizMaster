<template>
    <!-- menu -->
    <div class="flex flex-row md:!flex-col gap-2 min-w-[140px] bg-slate-500 p-1 overflow-hidden">
        <div @click="getAllQuestion"
            class="p-3 font-bold text-white cursor-pointer rounded hover:bg-slate-200 hover:!text-black whitespace-nowrap">
            All
        </div>
        <div v-for="category in categories" :key="category.id" @click="getQuestionByCategory(category.id)"
            class="p-3 font-bold text-white cursor-pointer rounded hover:bg-slate-200 hover:!text-black whitespace-nowrap">
            {{ category.name }}
        </div>
    </div>
    <!-- content -->
    <div class="bg-slate-600 relative w-full h-full flex flex-wrap gap-3 p-3 overflow-y-scroll overflow-hidden">
        <CustomCard :questions="questions" @click="selecteddCardOnClick"></CustomCard>
        <Loading v-if="isShowLoading"></Loading>
    </div>
</template>

<script setup lang="ts">
import categoryApi, { type categoryProps } from '@/apis/categoryApi';
import questionApi, { type questionProps } from '@/apis/questionApi';
import CustomCard from './CustomCard.vue';
import Loading from './Loading.vue';
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';
import useAnswerStore from '@/stores/answer';

const questions = ref<questionProps[]>([]);
const categories = ref<categoryProps[]>([]);
const isShowLoading = ref(false);
const router = useRouter();
const store = useAnswerStore();

async function getAllQuestion() {
    try {
        isShowLoading.value = true;
        const data = await questionApi.getAllQuestion();
        questions.value = data.data;
        isShowLoading.value = false;     
    } catch (error) {
        console.error("Có lỗi khi lấy dữ liệu từ server");
    }
};

async function getAllCategory() {
    try {
        const data = await categoryApi.getAllCategory();
        categories.value = data.data;
    } catch (error) {
        console.error("Có lỗi khi lấy dữ liệu từ server");
    }
}

async function getQuestionByCategory(categoryId: string) {
    try {
        isShowLoading.value = true;
        const data = await questionApi.getAllQuestionByCategoryId(categoryId);
        questions.value = data.data;
        isShowLoading.value = false;
    } catch (error) {
        console.error("Có lỗi khi lấy dữ liệu từ server");
    }
}

async function selecteddCardOnClick(questionId: string) {
    await store.setAnswers(questionId);
    
    router.push("/user/play");
}

onBeforeMount(() => {
    getAllCategory();
    getAllQuestion();
})
</script>