import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/campaigns/:campaignId",
      name: "campaign-home",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/dm",
      redirect: { name: "home" },
    },
    {
      path: "/campaigns/:campaignId/dm",
      name: "campaign-dm-dashboard",
      component: () => import("../views/DMDashboard.vue"),
    },
    {
      path: "/player",
      redirect: { name: "home" },
    },
    {
      path: "/campaigns/:campaignId/player",
      name: "campaign-player-dashboard",
      component: () => import("../views/PDashboard.vue"),
    },
  ],
});

export default router;
