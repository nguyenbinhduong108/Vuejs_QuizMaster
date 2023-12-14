<template>
    <v-container class="fixed inset-0 bg-black/50 z-30" fluid>
        <v-container class="bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded" :fluid="false">
            <v-row>
                <v-col class="text-center font-bold text-2xl">Thêm bộ câu hỏi</v-col>
            </v-row>
            <v-row>
                <v-col class="flex flex-col gap-3">
                    <v-text-field
                        label="Tên bộ câu hỏi"
                        hide-details="auto"
                    ></v-text-field>

                    <v-text-field
                        label="Thời gian mỗi câu"
                        hide-details="auto"
                    ></v-text-field>

                    <v-autocomplete
                        label="Thể loại"
                        hide-details="auto"
                    ></v-autocomplete>

                    <v-btn color="blue">
                        Send
                    </v-btn>
                </v-col>
                <v-col>
                    <div class="w-full h-full flex relative flex-1 justify-center items-center bg-slate-400 rounded px-2">
                        <div class="rounded-full w-full h-full overflow-hidden">
                            <v-img width="100%" height="100%" cover></v-img>
                        </div>
                        <input type="file" ref="fileInput" style="display: none;" />
                        <!-- <Loading v-if="true"></Loading> -->
                    </div>
                </v-col>
            </v-row>

        </v-container>

    </v-container>
</template>

<script setup lang="ts">
import Loading from './Loading.vue';
import { ref } from 'vue'
</script>