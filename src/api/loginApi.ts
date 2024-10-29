import { LoginData, ProfileParams } from "./types";
import { request } from "@/utils/request";

export const apiLogin = (data: LoginData) => {
  return request({
    url: "/app/login",
    method: "post",
    data,
  });
};

export const apiGetProfile = (params: ProfileParams) => {
  return request({
    url: "/user/profile",
    method: "get",
    params,
  });
};

export const apiLogout = () => {
  return request({
    url: "/app/login/out",
    method: "post",
  });
};

export const getSmsCode = (params) => {
  return request({
    url: "/app/sms/code",
    method: "get",
    params,
  });
};

export const registerCount = (data) => {
  return request({
    url: "/app/register",
    method: "post",
    data,
  });
};

export const forgotPwd = (data) => {
  return request({
    url: "/app/forgot/password",
    method: "post",
    data,
  });
};
