<template>
    <v-container class="fixed inset-0 bg-black/50 z-30" fluid>
        <v-container class="w-[70vw] bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded" fluid>
            <v-row>
                <v-col class="text-center font-bold text-2xl">Thêm bộ câu hỏi</v-col>
            </v-row>
            <v-row>
                <v-col class="flex flex-col gap-3">
                    <v-text-field
                        label="Tên bộ câu hỏi"
                    ></v-text-field>

                    <v-text-field
                        label="Thời gian mỗi câu"
                        type="number"
                        hide-spin-buttons
                    ></v-text-field>  

                    
                    <v-autocomplete
                        :items="categories"
                        label="Thể loại"
                        item-title="name"
                        item-value="id"
                        v-model="question.categoryId"
                    ></v-autocomplete>

                    <v-btn color="blue" @click="hello">
                        Send
                    </v-btn>
                </v-col>
                <v-col>
                    <UploadImage v-model:model-value="question.image" rectangle></UploadImage>
                </v-col>
            </v-row>

        </v-container>
    </v-container>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, nextTick } from 'vue'
import UploadImage from './UploadImage.vue';
import type { questionBody } from '@/apis/questionApi';
import type { categoryProps } from '@/apis/categoryApi';
import categoryApi from '@/apis/categoryApi';

const question = ref<questionBody>({
    name: '',
    image: "https://i.imgur.com/Ekd3MLm.jpg",
    accountId: '',
    categoryId: "c528aa85-6f65-4794-91c9-fe6102b94c12",
    timer: 0,
})

const categories = ref<categoryProps[]>([]);

async function getAllCategory(): Promise<any>{
    try {
        const response = await categoryApi.getAllCategory();
        return response.data;
    } catch (error) {
        
    }
}

function hello(){
    console.log(question.value)
}

nextTick(async () => {
    categories.value = await getAllCategory();
})

</script>