<template>
    <div>
        <!-- app bar -->
        <UserAppBar :account="store.account"></UserAppBar>

        <!-- option -->
        <div
            class="flex flex-col sm:flex-row mt-[50px] p-4 gap-2 bg-[url(@/assets/9Z_2102.w020.n001.1043B.p15.1043.jpg)] bg-cover bg-center bg-no-repeat">
            <div class="flex-1 bg-slate-500 p-4 rounded-xl">
                <div class="text-center text-xl text-white font-bold">
                    Welcome 
                    <span class="underline">{{
                    store.account.username }}</span>
                </div>
                <div class="text-center pt-2">
                    <v-btn rounded="pill" variant="elevated" color="white" class="font-bold">Create a quiz</v-btn>
                </div>
            </div>
            <div class="flex-1 bg-slate-500 p-4 rounded-xl">
                <div class="text-center text-xl text-white font-bold">Try our ChatGPT powered</div>
                <div class="text-center pt-2">
                    <v-btn rounded="pill" variant="elevated" color="white" class="font-bold">AI quiz generator</v-btn>
                </div>
            </div>
        </div>

        <!-- body -->
        <div class="p-4 gap-2 grid grid-cols-1 lg:grid-cols-2">
            <v-card class="p-1" color="rgb(156, 163, 175)" v-for="question in listQuestion" :key="question.id">
                <div class="text-center">{{ question.name }}</div>
                <div class="flex flex-col sm:flex-row gap-2">
                    <div class="flex flex-1 h-[180px] rounded overflow-hidden">
                        <v-img :src="question.image" width="100%" height="100%" cover></v-img>
                    </div>
                    <div class="flex-1 flex-col">
                        <div>
                            <div>Chủ đề: {{ question.category?.name }}</div>
                            <div>Thời gian: {{ question.timer }}</div>
                            <div>Tổng số câu hỏi: {{ question.quantity }}</div>
                            <div>Tổng số lượt chơi: {{ question.turn }}</div>
                            <div>Ngày khởi tạo: {{ format.formatDate(question.createdAt) }}</div>
                            <div>Lần cập nhật cuối: {{ format.formatDate(question.updatedAt) }}</div>
                        </div>
                        <div class="flex gap-1">
                            <div class="flex-1"><v-btn block color="#f44336">Chỉnh sửa</v-btn></div>
                            <div class="flex-1"><v-btn block append-icon="fa-solid fa-arrow-right" color="#f44336">Chơi thử</v-btn></div>
                        </div>
                    </div>
                </div>
            </v-card>
        </div>

        <!-- footer -->
        <Footer></Footer>
    </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from "vue"
import UserAppBar from '@/components/UserAppBar.vue';
import Footer from '@/components/Footer.vue';
import useAccountStore from '@/stores/account';
import questionApi from '@/apis/questionApi';
import type { questionProps } from '@/apis/questionApi';
import format from '@/helper/format'


const store = useAccountStore();

const listQuestion = ref<questionProps[]>([]);

async function getAllQuestionByAccountId(id: string) {
    try {
        const data = await questionApi.getAllQuestionByAccountId(id);
        listQuestion.value = data.data;
    } catch (error) {

    }
}


onBeforeMount(async () => {
    await getAllQuestionByAccountId(store.account.id);
})
</script>

<style scoped></style>