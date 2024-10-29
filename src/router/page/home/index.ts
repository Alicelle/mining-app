export default [
  {
    path: "/recharge",
    name: "Recharge",
    component: () => import("@/views/home/home/recharge.vue"),
    meta: {
      title: "Recharge",
      showNavbar: true,
    },
  },
  {
    path: "/withdraw",
    name: "Withdraw",
    component: () => import("@/views/home/home/withdraw.vue"),
    meta: {
      title: "Withdraw",
      showNavbar: true,
    },
  },
  {
    path: "/aboutUs",
    name: "AboutUs",
    component: () => import("@/views/home/home/aboutUs.vue"),
    meta: {
      title: "About Us",
      showNavbar: true,
    },
  },
  {
    path: "/doTasks",
    name: "DoTasks",
    component: () => import("@/views/home/home/doTasks.vue"),
    meta: {
      title: "Do Tasks",
      showNavbar: true,
    },
  },
  {
    path: "/news",
    name: "News",
    component: () => import("@/views/home/home/news.vue"),
    meta: {
      title: "News",
      showNavbar: true,
    },
  },
  {
    path: "/myInvitation",
    name: "MyInvitation",
    component: () => import("@/views/home/home/myInvitation.vue"),
    meta: {
      title: "My Invitation",
      showNavbar: true,
    },
  },
  {
    path: "/newsDetail",
    name: "NewsDetail",
    component: () => import("@/views/home/home/newsDetail.vue"),
    meta: {
      title: "News Detail",
      showNavbar: true,
    },
  },
];
