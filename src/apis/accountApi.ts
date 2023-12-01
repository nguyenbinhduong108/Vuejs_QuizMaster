import axios from "../lib/axios";

const baseApi = 'http://localhost:3000/account';

const accountApi = {
    loginAccount: async (email: string, password: string) => {
        const data = await axios.get(`${baseApi}/Login?email=${email}&password=${password}`);
        return data;
    },

    registerAccount: async (account: accountBody) => {
        const data = await axios.post(`${baseApi}/Register`, { account });
        return data;
    },

    forgetPasswordAccount: async (email: string, password: string) => {
        const data = await axios.put(`${baseApi}/Forget/${email}?pasword=${password}`);
        return data;
    },

    changePasswordAccount: async (id: string, password: string) => {
        const data = await axios.put(`${baseApi}/Change/${id}?pasword=${password}`);
        return data;
    },

    deleteAccount: async (id: string) => {
        const data = await axios.delete(`${baseApi}/${id}`);
        return data;
    }
};
export default accountApi;

export interface accountProps {
    password?: string,
    email?: string,
    username?: string,
    avatar?: string,
    isAdmin?: boolean,
};

export interface accountBody {
    password: string,
    email: string,
    username: string,
    avatar: "https://i.imgur.com/t9Y4WFN.jpg",
    isAdmin: false
}