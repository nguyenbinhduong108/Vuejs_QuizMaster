import axios from "axios";

const baseApi = `${import.meta.env.VITE_BASE_API}/imgur`;

const imgurApi = {
    upload: async (formData: FormData) => {
        const data = await axios.post(baseApi, formData);
        return data;
    },
}

export default imgurApi;
