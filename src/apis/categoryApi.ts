import axios from "../lib/axios";

const baseApi = 'http://localhost:3000/category';

const categoryApi = {
    getAllCategory: async () => {
        const data = axios.get(baseApi);
        return data;
    },

    getCategory: async (id: string) => {
        const data = axios.get(`${baseApi}/${id}`)
        return data;
    },
};
export default categoryApi;