import axios from "axios";

const baseApi = `${import.meta.env.VITE_BASE_API}/leaderboard`;

const leaderboardApi = {
    getLeaderboard: async (questionId: string) => {
        const data = await axios.get(`${baseApi}/${questionId}`);
        return data;
    },

    createLeaderboard:async (leaderboard :leaderboardBody) => {
        const data = await axios.post(baseApi, leaderboard);
        return data;
    },

    deleteLeaderboard:async (accountId: string) => {
        const data = await axios.delete(`${baseApi}/${accountId}`);
        return data;
    },
}

export default leaderboardApi;

export interface leaderboardProps {
    id: string,
    result: number,
    timer: number,
    account: {
      username: string,
      avatar: string,
    }
}

export interface leaderboardBody {
    result: number,
    timer: number,
    questionId: string,
    accountId: string
}