import axios from "axios";

const baseApi = 'https://quizmaster-hpyy.onrender.com/imgur';

const imgurApi = {
    upload: async (formData: FormData) => {
        const data = await axios.post(baseApi, formData);
        return data;
    },
}

export default imgurApi;
