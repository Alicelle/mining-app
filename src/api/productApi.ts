import { request } from "@/utils/request";

// 产品列表
export const productListApi = (params) => {
  return request({
    url: "/app/product/list",
    method: "get",
    params,
  });
};

// 产品详情
export const productDetailApi = (params) => {
  return request({
    url: `/app/product/${params.productId}`,
    method: "get",
  });
};

// 产品下单
export const orderAddApi = (data) => {
  return request({
    url: "/app/product/order/add",
    method: "post",
    data,
  });
};
