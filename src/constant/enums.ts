import { getAssetsIcon } from "@/utils/index";

// 标签 item
interface TabItem {
  id: number;
  name: string;
  defaultIcon: string;
  activeIcon: string;
  title: string;
  to: string;
}

interface NavItem {
  name: String;
  value: String | Number;
}

interface operateItem {
  text: String;
  icon: String;
  pageName: String;
}

export const navList: NavItem[] = [
  {
    name: "Base mine",
    value: "1",
  },
  {
    name: "Stable mine",
    value: "2",
  },
  {
    name: "New mine",
    value: "3",
  },
];

// 我的-操作项
export const myOperateList: operateItem[] = [
  {
    text: "My Bank Card",
    icon: getAssetsIcon("bank-icon"),
    pageName: "MyBankCard",
  },
  {
    text: "Change Account Password",
    icon: getAssetsIcon("accountpwd-icon"),
    pageName: "ChangePassword",
  },
  {
    text: "Change Trading Password",
    icon: getAssetsIcon("paypwd-icon"),
    pageName: "ChangeTradingPwd",
  },
  {
    text: "VIP Level",
    icon: getAssetsIcon("vip-icon"),
    pageName: "VipLevel",
  },
  {
    text: "Log Out",
    icon: getAssetsIcon("logout-icon"),
    pageName: "logout",
  },
];

// 标签坞列表
export const TABBAR_LIST: TabItem[] = [
  {
    id: 1,
    name: "home",
    defaultIcon: getAssetsIcon("home"),
    activeIcon: getAssetsIcon("home-active"),
    title: "Home",
    to: "/home/index",
  },
  {
    id: 2,
    name: "product",
    defaultIcon: getAssetsIcon("product"),
    activeIcon: getAssetsIcon("product-active"),
    title: "Product",
    to: "/home/product",
  },
  {
    id: 3,
    name: "asset",
    defaultIcon: getAssetsIcon("asset"),
    activeIcon: getAssetsIcon("asset-active"),
    title: "Asset",
    to: "/home/asset",
  },
  {
    id: 4,
    name: "my",
    defaultIcon: getAssetsIcon("my"),
    activeIcon: getAssetsIcon("my-active"),
    title: "My",
    to: "/home/my",
  },
];

// 调试白名单
export const DEBUG_WHITE_LIST: string[] = ["development", "teste"];

// 路由白名单
export const ROUTE_WHITE_LIST: string[] = [
  "Login",
  "forgetPassword",
  "registerCount",
];

// 聚合数据key
export const JH_NEWS_KEY = "d61a65b248651c9598bcccbd7670d566";

// 首页tab
export const NEWS_TABS = [
  { id: 0, title: "推荐", name: "top" },
  { id: 1, title: "国内", name: "guonei" },
  { id: 2, title: "国际", name: "guoji" },
  { id: 3, title: "娱乐", name: "yule" },
  { id: 4, title: "体育", name: "tiyu" },
  { id: 5, title: "军事", name: "junshi" },
  { id: 6, title: "科技", name: "keji" },
  { id: 7, title: "财经", name: "caijing" },
  { id: 8, title: "游戏", name: "youxi" },
  { id: 9, title: "汽车", name: "qiche" },
  { id: 10, title: "健康", name: "jiankang" },
];

// vip等级
export const VIP_LEVEL_LIST = [
  {
    name: "VIP 1",
    content: "Reach this level upon completion of registration",
    amount: "",
  },
  {
    name: "VIP 2",
    content: "This level is upgraded after the total investment reaches",
    amount: "₱100,000.00",
  },
  {
    name: "VIP 3",
    content: "This level is upgraded after the total investment reaches",
    amount: "₱100,000.00",
  },
  {
    name: "VIP 4",
    content: "This level is upgraded after the total investment reaches",
    amount: "₱100,000.00",
  },
  {
    name: "VIP 5",
    content: "This level is upgraded after the total investment reaches",
    amount: "₱100,000.00",
  },
  {
    name: "VIP 6",
    content: "This level is upgraded after the total investment reaches",
    amount: "₱100,000.00",
  },
];

// 侧边栏菜单列表
export const NAV_BAR_MENU_LIST = [
  {
    name: "About Us",
    icon: getAssetsIcon("aboun-us-icon"),
    width: "20",
    pageName: "AboutUs",
  },
  {
    name: "News",
    icon: getAssetsIcon("news-icon"),
    width: "18",
    pageName: "News",
  },
  {
    name: "Exchange",
    icon: getAssetsIcon("exchange-icon"),
    width: "20",
    pageName: "exchange",
  },
  {
    name: "Do Tasks",
    icon: getAssetsIcon("do-tasks-icon"),
    width: "20",
    pageName: "DoTasks",
  },
  {
    name: "My Team",
    icon: getAssetsIcon("my-team-icon"),
    width: "22",
    pageName: "MyInvitation",
  },
  {
    name: "Download App",
    icon: getAssetsIcon("download"),
    width: "23",
    pageName: "Download",
  },
];

// 个人数据
export const PERSONAL_DATA_LIST = [
  {
    name: "Balance Record",
    icon: getAssetsIcon("balance-record-icon"),
    pageName: "BalanceRecord",
    width: "46",
  },
  {
    name: "Recharge Record",
    icon: getAssetsIcon("recharge-record-icon"),
    pageName: "RechargeRecord",
    width: "48",
  },
  {
    name: "Withdrawal Record",
    icon: getAssetsIcon("embodiment-record-icon"),
    width: "46",
    pageName: "WithdrawalRecord",
  },
  {
    name: "Revenue Record",
    icon: getAssetsIcon("revenue-record-icon"),
    width: "48",
    pageName: "RevenueRecord",
  },
  {
    name: "Commission Record",
    icon: getAssetsIcon("commission-record-icon"),
    width: "46",
    pageName: "CommissionRecord",
  },
  {
    name: "Gift Record",
    icon: getAssetsIcon("gift-record-icon"),
    width: "44",
    pageName: "GiftRecord",
  },
];
