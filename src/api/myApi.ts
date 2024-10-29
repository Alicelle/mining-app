import { request } from "@/utils/request";

// 用户vip等级信息
export const vipInfoApi = () => {
  return request({
    url: "/app/user/vip/info",
    method: "get",
  });
};

// VIP等级配置
export const vipLevelsApi = () => {
  return request({
    url: "/app/user/vip/levels",
    method: "get",
  });
};

// 修改用户昵称
export const updateNickNameApi = (data) => {
  return request({
    url: "/app/user/update/nickName",
    method: "post",
    data,
  });
};

// 设置交易密码
export const setTradePaswordApi = (data) => {
  return request({
    url: "/app/bank/account/add/password",
    method: "post",
    data,
  });
};

// 交易记录
export const transactionListApi = (data) => {
  return request({
    url: "/app/transaction/log",
    method: "get",
    params: data,
  });
};

// 充值记录
export const rechargeListApi = (data) => {
  return request({
    url: "/app/recharges/log",
    method: "get",
    params: data,
  });
};

// 提现记录
export const withdrawalListApi = (data) => {
  return request({
    url: "/app/withdrawals/log",
    method: "get",
    params: data,
  });
};

// 收入记录
export const revenueRecordListApi = (data) => {
  return request({
    url: "/app/records/log",
    method: "get",
    params: data,
  });
};

// 佣金记录
export const crecordsRecordListApi = (data) => {
  return request({
    url: "/app/crecords/log",
    method: "get",
    params: data,
  });
};

// 礼物记录
export const giftRecordListApi = (data) => {
  return request({
    url: "/app/rrecords/log",
    method: "get",
    params: data,
  });
};
