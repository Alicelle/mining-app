import { request } from "@/utils/request";

// 任务列表
export const taskListApi = () => {
  return request({
    url: "/app/user/task/list",
    method: "post",
  });
};

// 领取任务
export const doTaskApi = (data) => {
  return request({
    url: "/app/user/task/toTask",
    method: "post",
    data,
  });
};

// 获取邀请码
export const userCodeApi = (data) => {
  return request({
    url: "/app/user/codes",
    method: "get",
    params: data,
  });
};

// 获取站内信
export const noticeListApi = (data) => {
  return request({
    url: "/app/notice/list",
    method: "get",
    params: data,
  });
};

// 获取站内信详情
export const noticeDetailApi = (data) => {
  return request({
    url: "/app/notice/get",
    method: "get",
    params: data,
  });
};

// 我的团队
export const myTeamApi = (data) => {
  return request({
    url: "/app/user/teams",
    method: "get",
    params: data,
  });
};

// 充值
export const rechargeApi = (data) => {
  return request({
    url: "/app/transaction/add",
    method: "post",
    data,
  });
};

// 兑换
export const exchangeApi = (data) => {
  return request({
    url: "/app/treasure/update",
    method: "post",
    data,
  });
};

// 获取消息弹窗
export const getNoticeApi = (data) => {
  return request({
    url: "/app/notice/v/get",
    method: "get",
    params: data,
  });
};

// 获取充值配置
export const getDepositDisplayApi = (data) => {
  return request({
    url: "/app/config/getDepositDisplay",
    method: "get",
    params: data,
  });
};

// 获取相关链接地址
export const getSystemUrlApi = () => {
  return request({
    url: "/app/config/getSystem",
    method: "get",
  });
};

// 获取产品佣金配置
export const getProductCommission = () => {
  return request({
    url: "/app/config/product/commission",
    method: "get",
  });
};

// 多语言配置配置
export const changeLanguageApi = (data) => {
  return request({
    url: "/app/changeLanguage",
    method: "get",
    params: data,
  });
};

// 获取佣金配置
export const getProductActivationApi = (data) => {
  return request({
    url: "/app/config/product/activation",
    method: "get",
    params: data,
  });
};

// 热销产品列表
export const getHotProductListApi = (data) => {
  return request({
    url: "/app/product/hotList",
    method: "get",
    params: data,
  });
};
