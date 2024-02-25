import { createRouter, createWebHistory } from "vue-router";
import AdminPage from "@/views/AdminPage.vue";
import UserPage from "@/views/UserPage.vue";
import SignUpPage from "@/views/SignUpPage.vue";
import AdminContent from "@/components/AdminContent.vue";
import AdminAnswer from "@/components/AdminAnswer.vue";
import ResultPage from "@/views/ResultPage.vue";
import PlayPage from "@/views/PlayPage.vue";
import QuestionDetails from "@/views/QuestionDetails.vue";

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: UserPage,
    },
    {
      path: "/signup",
      name: "signup",
      component: SignUpPage,
    },
    {
      path: "/:id",
      name: "admin",
      component: AdminPage,
      children: [
        {
          path: "",
          name: "admin-content",
          component: AdminContent,
        },
        {
          path: "answer",
          name: "admin-answer",
          component: AdminAnswer,
        },
      ],
    },
    {
      path: "/question/:questionId",
      name: "question-details",
      component: QuestionDetails,
    },
    {
      path: "/play/:questionId",
      name: "play",
      component: PlayPage,
    },
    {
      path: "/result",
      name: "result",
      component: ResultPage,
    },
  ],
});
export default router;
