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
        isHeader:true,

      },
    },
    {
      path: "/gold-chan-chan",
      name: "gold",
      component: () =>
        import(/* webpackChunkName: "gold" */ "@/views/Gold.vue"),
      meta: {
        title: '金铲铲',
        index: 1,
        isHeader:true,

      },
    },
    {
      path: "/wage",
      name: "wage",
      component: () =>
        import(/* webpackChunkName: "wage" */ "@/components/Wage.vue"),
      meta: {
        title: '工资计算器',
        index: 1,
        isHeader:true,

      },
    },
    {
      path: "/monitor",
      name: "monitor",
      component: () =>
        import(/* webpackChunkName: "monitor" */ "@/components/Monitor.vue"),
      meta: {
        index: 1,
        isHeader:true,

      },
    },
    {
      path: "/verify-code",
      name: "verify-code",
      component: () =>
        import(/* webpackChunkName: "verify-code" */ "@/components/VerifyCode.vue"),
      meta: {
        index: 1,
        isHeader:true,

      },
    },
    {
      path: "/grid",
      name: "grid",
      component: () =>
        import(/* webpackChunkName: "home" */ "@/components/Grid.vue"),
      meta: {
        index: 1,
        isHeader:true,

      },
    },
    {
      path: "/flex",
      name: "flex",
      component: () =>
        import(/* webpackChunkName: "home" */ "@/components/Flex.vue"),
      meta: {
        index: 1,
        isHeader:true,
      },
    },
    {
      path: '/scale-layout',
      name: "scaleLayout",
      component: () =>
        import(/* webpackChunkName: "home" */ "@/components/ScaleLayout.vue"),
      meta: {
        isHeader:false,
        index: 1,
      },
    },
    {
      path: '/color-convert',
      name: "convertColor",
      component: () =>
        import(/* webpackChunkName: "home" */ "@/components/ConvertColor.vue"),
      meta: {
        isHeader:true,
        index: 1,
      },
    }
  ],
});
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = `${to.meta.title} | 小林玩具库`;
  }
  next();
});
export default router;
