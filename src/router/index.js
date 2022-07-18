import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () =>
      import(/* webpackChunkName: "home" */ '@/layouts/index.vue'),
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'home',
        meta: { title: '生产预测报告' },
        component: () =>
          import(/* webpackChunkName: "home" */ '@/views/index.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () =>
      import(/* webpackChunkName: "home" */ '@/views/404/index.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export default router;
