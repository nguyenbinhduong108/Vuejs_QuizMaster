<template>
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
</template>

<script setup lang="ts">
const emits = defineEmits([
    'showForm'
])

function showForm() {
    emits('showForm')
}
</script>