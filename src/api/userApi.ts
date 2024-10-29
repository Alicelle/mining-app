import { request } from "@/utils/request";

// 用户账号个人信息
export const accountInfo = () => {
  return request({
    url: "/app/user/accounts",
    method: "get",
  });
};

// 获取用户头像地址
export const getAvatar = () => {
  return request({
    url: "/app/user/avatar",
    method: "get",
  });
};
