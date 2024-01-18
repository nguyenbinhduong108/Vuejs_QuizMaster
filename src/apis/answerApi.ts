import axios from "axios";

const baseApi = `${import.meta.env.VITE_BASE_API}/answers`;

const answerApi = {
    getByQuestionId: async (questionId: string) => {
        const data = await axios.get(`${baseApi}/GetByQuestionId/${questionId}`);
        return data;
    },

    getAnswerByAnswerId: async (answerId: string) => {
        const data = await axios.get(`${baseApi}/GetOne/${answerId}`);
        return data;
    },

    createAnswerByQuestionId: async (questionId: string, answer: Array<answerBody>) => {
        const data = await axios.post(`${baseApi}/${questionId}`, answer);
        return data;
    },

    updateAnswerByAnswerId:async (answerId: string, answer: answerBody) => {
        const data = await axios.put(`${baseApi}/${answerId}`, answer);
        return data;        
    },

    deleteAnswer: async (answerId: string) => {
        const data = await axios.delete(`${baseApi}/${answerId}`);
        return data;
    }
};
export default answerApi;

export interface answerProps {
    id: string,
    title: string,
    answers: Array<string>,
    trueAnswer: string,
    image: string,
    question: {
        id: string,
        name: string
    }
}

export interface answerBody {
    title: string,
    answers: Array<string>,
    trueAnswer: string,
    image: string,
}