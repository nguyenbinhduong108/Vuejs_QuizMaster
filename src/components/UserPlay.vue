<template>
    <div v-for="answer in answers" :key="answer.id">
        {{ answer }}
    </div>
</template>

<script setup lang="ts">
import useAnswerStore from '@/stores/answer';


const answers = useAnswerStore().answers;

</script>