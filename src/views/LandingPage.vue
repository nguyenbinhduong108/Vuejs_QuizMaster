<template>
    <div>
        <!-- appbar -->
        <LandingAppBar @showForm="showForm"></LandingAppBar>


        <!-- header -->
        <div
            class="flex flex-col justify-end p-16 gap-4 mt-[50px] bg-[url(../assets/9Z_2102.w020.n001.1043B.p15.1043.jpg)] bg-cover bg-center bg-no-repeat relative rounded-2xl sm:rounded-none overflow-hidden">
            <div class="before:absolute before:inset-0 before:bg-black before:bg-opacity-30"></div>

            <div class="title text-white text-5xl sm:text-8xl font-bold z-10 text-center">
                Quiz Master
            </div>

            <div class="text-white text-xl sm:text-2xl overflow-hidden z-10 text-center">
                Welcome to QuizMaster, where learning becomes fun and enjoyable. With
                thousands of diverse questions from all fields, QuizMaster is not only a
                question answering website, but also a source of inspiration for you to
                discover new knowledge. Set a profile for yourself and your vibrant
                community parameters. Let QuizMaster be your guide in your search for
                knowledge!
            </div>

            <div class="flex flex-col items-center">
                <v-btn variant="flat" append-icon="fa-solid fa-arrow-right" color="#f44336" @click="showForm">
                    Get start
                </v-btn>
            </div>
        </div>

        <!-- description -->
        <div class="flex flex-col sm:flex-row p-8 gap-12">
            <div class="flex flex-col gap-4">
                <div class="text-[#f44336] font-bold text-5xl">Explore Your Wisdom</div>
                <div class="text-xl">
                    QuizMaster, where you can complete formulas and explore your
                    intelligence through thousands of diverse questions from all fields.
                    With a friendly interface and unique features, QuizMaster is not only
                    a question answering website but also a source of inspiration for you
                    to improve your knowledge and logical thinking. Join now to experience
                    the fun and learning that QuizMaster has to offer!
                </div>
                <div class="text-xs text-gray-400 pl-2">
                    QuizMaster is a great space for people who love to explore and
                    evaluate their intelligence. Our diverse system of questions is
                    carefully selected from all fields, from science and arts to culture
                    and education. You will not only answer questions but also immerse
                    yourself in a unique intellectual adventure. Join now to not only
                    experience the excitement of solving puzzles but also delve into the
                    world of knowledge. QuizMaster is not just a question answering
                    website, but a dynamic community where curiosity and passion for
                    learning are encouraged and respected. You are the master of your
                    intellectual adventure, and QuizMaster is the perfect place to start
                    this journey!
                </div>
            </div>

            <div class="flex justify-center">
                <v-icon icon="fa-solid fa-brain" color="#f44336" size="200"></v-icon>
            </div>
        </div>

        <div class="flex flex-col sm:flex-row-reverse p-8 gap-12 bg-gray-400">
            <div class="flex flex-col gap-4">
                <div class="text-[#f44336] font-bold text-5xl">
                    Creative Brain, Exploring Questions
                </div>
                <div class="text-xl">
                    Enjoy an intellectual journey with QuizMaster, where each question is
                    a window to a new world of knowledge. With a friendly interface and
                    unique features, the website not only helps you answer your questions
                    but also challenges your creativity and thinking. Join now to beat the
                    toughest challenges, test your understanding, and share your passion
                    for learning with QuizMaster's strong community!
                </div>
                <div class="text-xs text-white pl-2">
                    QuizMaster is more than just a question answering website; it is an
                    action of saving idols, where you can test yourself through the most
                    difficult questions, and test and expand the event your knowledge in
                    all fields. QuizMaster's exclusivity not only raises questions but
                    also provides a foundation opportunity for you to enhance your
                    creativity when faced with special formulas. Join now to experience an
                    active learning and solving space where you can meet and compete other
                    people who love to learn. Share passion, co-build a diverse and
                    academic community Full of energy and the great community of
                    QuizMaster!
                </div>
            </div>
            <div class="flex justify-center">
                <v-icon icon="fa-brands fa-battle-net" color="#f44336" size="200"></v-icon>
            </div>
        </div>

        <!-- info -->
        <div class="p-8 flex flex-col md:flex-row justify-between gap-2">
            <div class="flex-1">
                <div class="text-black font-bold text-3xl">Your info</div>
                <v-text-field label="Name" prepend-inner-icon="fa-solid fa-user"></v-text-field>
                <v-text-field label="Phone" prepend-inner-icon="fa-solid fa-phone"></v-text-field>
                <v-text-field label="Email" prepend-inner-icon="fa-solid fa-at"></v-text-field>
                <v-btn color="#f44336" block>Send</v-btn>
            </div>
            <div class="flex-1">
                <div
                    class="bg-[url(../assets/9Z_2102.w020.n001.1043B.p15.1043.jpg)] h-[200px] md:h-full md:w-full bg-cover bg-center bg-no-repeat rounded-lg">
                </div>
            </div>
        </div>

        <!-- demo -->
        <div class="bg-gray-300 p-2 m-2 rounded flex gap-1 overflow-x-scroll custom-scrollbar">
            <CustomCard :questions="questions" @click="logCardId"></CustomCard>
        </div>

        <!-- footer -->
        <Footer></Footer>
    </div>

    <LoginForm v-if="isShowForm" @closeForm="closeForm"></LoginForm>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import categoryApi from "@/apis/categoryApi";
import accountApi from "@/apis/accountApi";
import questionApi from "@/apis/questionApi";
import type { categoryProps } from "@/apis/categoryApi";
import type { accountProps } from "@/apis/accountApi";
import type { questionProps } from "@/apis/questionApi";

const categories = ref<categoryProps[]>([]);
const account = ref<accountProps>({});
const questions = ref<questionProps[]>([]);

const cardId = ref<string>();
const isShowForm = ref(false);

import CustomCard from "@/components/CustomCard.vue";
import LoginForm from "@/components/LoginForm.vue";
import LandingAppBar from "@/components/LandingAppBar.vue";
import Footer from "@/components/Footer.vue";


const getAllCategory = async () => {
    try {
        const data = await categoryApi.getAllCategory();
        categories.value = data.data;
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu từ server");
    }
};

const loginAccount = async () => {
    try {
        const data = await accountApi.loginAccount("test@gmail.com", "11111");
        account.value = data.data;
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu từ server");
    }
};

const getAllQuestion = async () => {
    try {
        const data = await questionApi.getAllQuestion();
        questions.value = data.data;
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu từ server");
    }
};

onMounted(async () => {
    await getAllQuestion();
});

function logCardId(cardId: string) {
    console.log(cardId)
}

function showForm() {
    isShowForm.value = true;
}

function closeForm() {
    isShowForm.value = false;
}
</script>

<style scoped></style>
