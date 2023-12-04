import axios from "@/lib/axios";

const baseApi = "https://quizmaster-hpyy.onrender.com/questions";

const questionApi = {
    getAllQuestion: async () => {
        const data = await axios.get(`${baseApi}/GetAll`);
        return data;
    },

    getAllQuestionByAccountId: async (accountId: string) => {
        const data = await axios.get(`${baseApi}/getAllQuestionByAccountId/${accountId}`);
        return data;
    },

    getAllQuestionByCategoryId: async (categoryId: string) => {
        const data = await axios.get(`${baseApi}/getAllQuestionByCategoryId/${categoryId}`);
        return data;
    },

    getQuestionByQuestionId: async (questionId: string) => {
        const data = await axios.get(`${baseApi}/${questionId}`);
        return data;
    },

    updateQuestion:async (questionId: string, question: questionBody) => {
        const data = await axios.put(`${baseApi}/${questionId}`, {question});
        return data;
    },

    deleteQuestion:async (questionId: string) => {
        const data = await axios.delete(`${baseApi}/${questionId}`);
        return data;
    },

    createQuestion:async (question: questionBody) => {
        const data = await axios.post(baseApi, {question});
        return data;
    }
};
export default questionApi;

export interface questionProps {
    id?: string,
    name?: string,
    image?: string,
    timer?: number,
    turn?: number,
    quantity?: number,
    account?: {
        id?: string,
        username?: string,
    },
    category?: {
        id?: string,
        name?: string,
        image?: string;
    }
};

export interface questionBody {
    name: string,
    image: "https://i.imgur.com/Ekd3MLm.jpg",
    accountId: string,
    categoryId: "c528aa85-6f65-4794-91c9-fe6102b94c12",
    timer: 60
}
