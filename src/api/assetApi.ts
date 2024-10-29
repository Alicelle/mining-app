import { request } from "@/utils/request";

// 获取已下单产品
export const getOrderListApi = (params) => {
  return request({
    url: "/app/product/order/list",
    method: "get",
    params,
  });
};

// 获取收益&投入总额
export const getAmountApi = (params) => {
  return request({
    url: "/app/product/order/amount/get",
    method: "get",
    params,
  });
};
