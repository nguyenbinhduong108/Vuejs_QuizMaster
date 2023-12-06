import axios from "axios";

const baseApi = 'https://quizmaster-hpyy.onrender.com/category';

const categoryApi = {
    getAllCategory: async () => {
        const data = await axios.get(baseApi);
        return data;
    },

    getCategory: async (id: string) => {
        const data = await axios.get(`${baseApi}/${id}`)
        return data;
    },
};
export default categoryApi;

export interface categoryProps  {
    id: string,
    name: string,
    image: string
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date,
}

