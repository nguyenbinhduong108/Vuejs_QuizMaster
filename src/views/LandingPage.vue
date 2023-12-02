<template>
    <div class="overflow-hidden">
        <!-- appbar -->
        <div class="bg-[#f44336] flex flex-row h-[50px] justify-between items-center px-4 fixed z-20 inset-0 shadow-lg">
            <div class="text-white font-bold text-lg cursor-pointer">QuizMaster</div>

            <div class="flex items-center">
                <v-btn variant="text" icon="fa-solid fa-gear" color="#fff"></v-btn>
                <v-btn variant="text" icon="fa-solid fa-bell" color="#fff"></v-btn>
                <v-btn variant="flat" append-icon="fa-solid fa-arrow-right" color="#fff" @click="showForm">
                    Sign in
                </v-btn>
            </div>
        </div>

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
        <div class="text-white">
            <div class="bg-orange-600 flex flex-col sm:flex-row justify-between p-4 gap-3">
                <div class="flex justify-center flex-1">
                    Get connected with us on social network!
                </div>
                <div class="flex justify-center flex-1 gap-x-3">
                    <v-icon icon="fa-brands fa-facebook-f"></v-icon>
                    <v-icon icon="fa-brands fa-twitter"></v-icon>
                    <v-icon icon="fa-brands fa-google-plus-g"></v-icon>
                    <v-icon icon="fa-brands fa-instagram"></v-icon>
                    <v-icon icon="fa-brands fa-tiktok"></v-icon>
                </div>
            </div>
            <div class="bg-[#1d2331] flex flex-col sm:flex-row px-24 py-10 gap-4">
                <div class="flex-1">
                    <div class="font-bold border-b-2 border-indigo-400">BRAINBOOST</div>
                    <div class="pt-4">
                        An innovator in learning tools and educational websites, we are
                        committed to bringing innovative solutions to enhance everyone's
                        intelligence and unlock their academic potential.
                    </div>
                </div>
                <div class="flex-1">
                    <div class="font-bold border-b-2 border-indigo-400">PRODUCTS</div>
                    <div class="pt-4">
                        <div>QuizMaster</div>
                        <div>BrainFlow</div>
                        <div>SmartLearning</div>
                    </div>
                </div>
                <div class="flex-1">
                    <div class="font-bold border-b-2 border-indigo-400">USEFULLINK</div>
                    <div class="pt-4">
                        <div>Your Account</div>
                        <div>Become an Affiliate</div>
                        <div>Shipping Rates</div>
                        <div>Help</div>
                    </div>
                </div>
                <div class="flex-1">
                    <div class="font-bold border-b-2 border-indigo-400">CONTACT</div>
                    <div class="pt-4 flex flex-col gap-4">
                        <div class="flex h-6 gap-4">
                            <v-icon icon="fa-solid fa-house"></v-icon>
                            <div class="flex h-6 items-center">New York, NY 10012, US</div>
                        </div>
                        <div class="flex h-6 gap-4">
                            <v-icon icon="fa-solid fa-envelope"></v-icon>
                            <div class="flex h-6 items-center">info@gmail.com</div>
                        </div>
                        <div class="flex h-6 gap-4">
                            <v-icon icon="fa-solid fa-phone"></v-icon>
                            <div class="flex h-6 items-center">+01 234 567 88</div>
                        </div>
                        <div class="flex h-6 gap-4">
                            <v-icon icon="fa-solid fa-headset"></v-icon>
                            <div class="flex h-6 items-center">+01 234 567 89</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
