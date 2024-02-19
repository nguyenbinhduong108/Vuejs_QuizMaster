import axios from "axios";

const baseApi = `${import.meta.env.VITE_BASE_API}/questions`;
const questionApi = {
  getAllQuestion: async (limit: number, page: number, search: string) => {
    const data = await axios.get(
      `${baseApi}/GetAll?limit=${limit}&page=${page}&search=${search}`
    );
    return data;
  },

  getAllQuestionByAccountId: async (
    accountId: string,
    limit: number,
    page: number,
    search: string
  ) => {
    const data = await axios.get(
      `${baseApi}/getAllQuestionByAccountId/${accountId}?limit=${limit}&page=${page}&search=${search}`
    );
    return data;
  },

  getAllQuestionByCategoryId: async (
    categoryId: string,
    limit: number,
    page: number,
    search: string
  ) => {
    const data = await axios.get(
      `${baseApi}/getAllQuestionByCategoryId/${categoryId}?limit=${limit}&page=${page}&search=${search}`
    );
    return data;
  },

  getQuestionByQuestionId: async (questionId: string) => {
    const data = await axios.get(`${baseApi}/${questionId}`);
    return data;
  },

  updateQuestion: async (questionId: string, question: questionBody) => {
    const data = await axios.put(`${baseApi}/${questionId}`, question);
    return data;
  },

  deleteQuestion: async (questionId: string) => {
    const data = await axios.delete(`${baseApi}/${questionId}`);
    return data;
  },

  createQuestion: async (question: questionBody) => {
    const data = await axios.post(baseApi, question);
    return data;
  },
};
export default questionApi;

export interface questionProps {
  id: string;
  name: string;
  image: string;
  timer: number;
  turn: number;
  quantity: number;
  level: number;
  isHot: boolean;
  account: {
    id: string;
    username: string;
  };
  category: {
    id: string;
    name: string;
    image: string;
  };
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface questionBody {
  name: string;
  image: "https://i.imgur.com/Ekd3MLm.jpg";
  accountId: string;
  categoryId: "c528aa85-6f65-4794-91c9-fe6102b94c12";
  timer: number;
  level: number;  
}
