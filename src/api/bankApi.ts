import { request } from "@/utils/request";

// 获取下拉银行名称
export const getBankConfigListApi = () => {
  return request({
    url: "/app/bank/config/list",
    method: "get",
  });
};

// 添加银行卡
export const accountSaveApi = (data) => {
  return request({
    url: "/app/bank/account/save",
    method: "post",
    data,
  });
};

// 解绑银行卡
export const accountUnbindApi = (data) => {
  return request({
    url: "/app/bank/account",
    method: "delete",
    data,
  });
};

// 银行卡列表
export const bankListApi = (params) => {
  return request({
    url: "/app/bank/account/list",
    method: "get",
    params,
  });
};

// 校验支付密码
export const checkPasswordApi = (params) => {
  return request({
    url: "/app/bank/password/check",
    method: "post",
    data: params,
  });
};

// 修改支付密码
export const updatePasswordApi = (params) => {
  return request({
    url: "/app/bank/account/update/password",
    method: "post",
    data: params,
  });
};

// 获取银行列表
export const getBankList = (data) => {
  return request({
    url: "/app/pay/getBankList",
    method: "get",
    data,
  });
};

// 提现
export const withdrawApi = (data) => {
  return request({
    url: "/app/transaction/update",
    method: "post",
    data,
  });
};

// 获取提现配置
export const getWithdrawalConfigApi = (data) => {
  return request({
    url: "/app/config/withdrawal",
    method: "get",
    params: data,
  });
};
