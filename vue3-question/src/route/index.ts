import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
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
        title: '首页',
        index: 1,
      },
    },
    {
      path: "/wage",
      name: "wage",
      component: () =>
        import(/* webpackChunkName: "home" */ "@/components/Wage.vue"),
      meta: {
        title: '工资计算器',
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
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = `${to.meta.title} | 小林玩具库`;
  }
  next();
});
export default router;
