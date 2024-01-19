import { defineStore } from "pinia";
import type { leaderboardProps } from "@/apis/leaderboardApi";

const useLeaderboard = defineStore('leaderboard', {
    state: () => ({
        leaderboards: [] as Array<leaderboardProps>,
    }),

    actions: {
    },
})

export default useLeaderboard;