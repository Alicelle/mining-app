export default [
  {
    path: "/changeNickname",
    name: "ChangeNickname",
    component: () => import("@/views/home/my/changeNickname.vue"),
    meta: {
      title: "Change Nickname",
      showNavbar: true,
    },
  },
  {
    path: "/myBankCard",
    name: "MyBankCard",
    component: () => import("@/views/home/my/bankCard.vue"),
    meta: {
      title: "My Bank Card",
      showNavbar: true,
    },
  },
  {
    path: "/unbindBankCard",
    name: "UnbindBankCard",
    component: () => import("@/views/home/my/unbindCard.vue"),
    meta: {
      title: "Unbind Bank Card",
      showNavbar: true,
    },
  },
  {
    path: "/changePassword",
    name: "ChangePassword",
    component: () => import("@/views/home/my/changePassword.vue"),
    meta: {
      title: "Change Password",
      showNavbar: true,
    },
  },
  {
    path: "/changeTradingPwd",
    name: "ChangeTradingPwd",
    component: () => import("@/views/home/my/changeTradingPwd.vue"),
    meta: {
      title: "Change Trading Password",
      showNavbar: true,
    },
  },
  {
    path: "/vipLevel",
    name: "VipLevel",
    component: () => import("@/views/home/my/vipLevel.vue"),
    meta: {
      title: "Vip",
      showNavbar: true,
    },
  },
  {
    path: "/addBankCard",
    name: "AddBankCard",
    component: () => import("@/views/home/my/addBankCard.vue"),
    meta: {
      title: "Add Bank Card",
      showNavbar: true,
    },
  },
  {
    path: "/personalData",
    name: "PersonalData",
    component: () => import("@/views/home/my/personalData.vue"),
    meta: {
      title: "Personal Data",
      showNavbar: true,
    },
  },
  {
    path: "/balanceRecord",
    name: "BalanceRecord",
    component: () => import("@/views/home/my/balanceRecord.vue"),
    meta: {
      title: "Balance Record",
      showNavbar: true,
    },
  },
  {
    path: "/rechargeRecord",
    name: "RechargeRecord",
    component: () => import("@/views/home/my/rechargeRecord.vue"),
    meta: {
      title: "Recharge Record",
      showNavbar: true,
    },
  },
  {
    path: "/withdrawalRecord",
    name: "WithdrawalRecord",
    component: () => import("@/views/home/my/withdrawalRecord.vue"),
    meta: {
      title: "Withdrawal Record",
      showNavbar: true,
    },
  },
  {
    path: "/revenueRecord",
    name: "RevenueRecord",
    component: () => import("@/views/home/my/revenueRecord.vue"),
    meta: {
      title: "Revenue Record",
      showNavbar: true,
    },
  },
  {
    path: "/commissionRecord",
    name: "CommissionRecord",
    component: () => import("@/views/home/my/commissionRecord.vue"),
    meta: {
      title: "Commission Record",
      showNavbar: true,
    },
  },
  {
    path: "/giftRecord",
    name: "GiftRecord",
    component: () => import("@/views/home/my/giftRecord.vue"),
    meta: {
      title: "Gift Record",
      showNavbar: true,
    },
  },
  {
    path: "/setTradingPwd",
    name: "SetTradingPwd",
    component: () => import("@/views/home/my/setTradingPwd.vue"),
    meta: {
      title: "Set Trading Password",
      showNavbar: true,
    },
  },
];
