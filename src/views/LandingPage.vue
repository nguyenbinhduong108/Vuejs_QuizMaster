<template>
    <!-- appbar -->
    <div class="bg-[#f44336] flex flex-row h-[50px] justify-between items-center px-4 fixed z-20 inset-0">
        <div class="text-white font-bold text-lg cursor-pointer">Quiz Master</div>

        <div class="hidden sm:flex sm:items-center">
            <v-btn variant="text" icon="fa-solid fa-star" color="#fff"></v-btn>
            <v-btn variant="text" icon="fa-solid fa-bell" color="#fff"></v-btn>
            <v-btn variant="flat" append-icon="fa-solid fa-arrow-right" color="#fff">
                Sign in
            </v-btn>
        </div>
        <div class="flex items-center sm:hidden">
            <v-btn variant="text" icon="fa-solid fa-grip-lines" color="#fff">
            </v-btn>
        </div>
    </div>

    <!-- header -->
    <div class="flex flex-col justify-end overflow-hidden p-16 mt-[50px] gap-4 bg-[url(../assets/9Z_2102.w020.n001.1043B.p15.1043.jpg)]
                    bg-cover bg-center bg-no-repeat relative rounded-2xl sm:rounded-none ">
        <div class="before:absolute before:inset-0 before:bg-black before:bg-opacity-30"></div>

        <div class="title text-white text-8xl font-bold z-10 text-center">
            Quiz Master
        </div>

        <div class="text-white text-[24px] overflow-hidden z-10 text-center">
            Welcome to QuizMaster, where learning becomes fun and enjoyable. With thousands of diverse questions from all
            fields, QuizMaster is not only a question answering website, but also a source of inspiration for you to
            discover new knowledge. Set a profile for yourself and your vibrant community parameters. Let QuizMaster be your
            guide in your search for knowledge!
        </div>

        <div class="flex flex-col items-center">
            <v-btn variant="flat" append-icon="fa-solid fa-arrow-right" color="#f44336">
                Get start
            </v-btn>
        </div>
    </div>

    <!-- description -->
    <div class="flex flex-col sm:flex-row p-8 gap-12">
        <div>
            <div class="text-[#f44336] font-bold text-3xl">Explore Your Wisdom</div>
            <div>QuizMaster, where you can complete formulas and explore your intelligence through thousands of diverse
                questions from all fields. With a friendly interface and unique features, QuizMaster is not only a question
                answering website but also a source of inspiration for you to improve your knowledge and logical thinking.
                Join now to experience the fun and learning that QuizMaster has to offer!</div>
        </div>

        <div class="flex justify-center">
            <v-icon icon="fa-solid fa-brain" color="#f44336" size="200"></v-icon>
        </div>
    </div>

    <div class="flex flex-col-reverse sm:flex-row p-8 gap-12">
        <div class="flex justify-center">
            <v-icon icon="fa-brands fa-battle-net" color="#f44336" size="200"></v-icon>
        </div>
        <div>
            <div class="text-[#f44336] font-bold text-3xl">Creative Brain, Exploring Questions</div>
            <div>Enjoy an intellectual journey with QuizMaster, where each question is a window to a new world of knowledge.
                With a friendly interface and unique features, the website not only helps you answer your questions but also
                challenges your creativity and thinking. Join now to beat the toughest challenges, test your understanding,
                and share your passion for learning with QuizMaster's strong community!</div>
        </div>
    </div>

    <!-- contact -->
    
</template>

<script lang="ts">
export default {
    name: "LandingPage",
};
</script>
<style scoped></style>
