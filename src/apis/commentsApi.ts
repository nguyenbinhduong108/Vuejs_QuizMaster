import axios from "axios";

const baseApi = `${import.meta.env.VITE_BASE_API}/comments`;

const commentsApi = {
    getComments: async (questionId: string, page: number) =>{
        const data = await axios.get(`${baseApi}/${questionId}?page=${page}`);
        return data;
    },

    createComments: async (comments: commentsBody) => {
        const data = await axios.post(baseApi, comments);
        return data;
    },

    updateComments: async (id: string, comments :commentsBody) => {
        const data = await axios.put(`${baseApi}/${id}`, comments);
        return data;
    },

    deleteComments: async (id: string) => {
        const data = await axios.delete(`${baseApi}/${id}`);
        return data; 
    },
}

export default commentsApi;


export interface commentsProp{
    id: string,
    comment: string,
    rating: number,
    account: {
        username: string,
        avatar: string,
    }
}

export interface commentsBody{
    comment: string,
    rating: number,
    accountId: string,
    questionId: string
}