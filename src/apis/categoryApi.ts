import axios from "axios";

const baseApi = `${import.meta.env.VITE_BASE_API}/category`;

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

