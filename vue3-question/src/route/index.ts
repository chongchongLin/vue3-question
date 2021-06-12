import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
  routes: [
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "/home",
      name: "home",
      component: () =>
        import(/* webpackChunkName: "home" */ "@/views/Home.vue"),
      meta: {
        title:'小林玩具库',
        index: 1,
      },
    },
    {
      path: "/wage",
      name: "wage",
      component: () =>
        import(/* webpackChunkName: "home" */ "@/components/Wage.vue"),
      meta: {
        index: 1,
      },
    },
    {
        path: "/monitor",
        name: "monitor",
        component: () =>
          import(/* webpackChunkName: "home" */ "@/components/Monitor.vue"),
        meta: {
          index: 1,
        },
      },
  ],
});

export default router;
