import axios, { AxiosResponse } from "axios";
// import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { loginStore } from "@/store/login";
import { showNotify } from "vant";
import httpEnums from "@/constant/httpEnums";
import { getEnvValue } from "@/utils/index";
import { showLoadingToast, closeToast } from "vant";
// const router = useRouter();

// create an axios instance
const request = axios.create({
  baseURL: getEnvValue("VITE_APP_BASE_API"),
  timeout: 10000,
});

const requestArr = [request];

// 一段时间内的提示显示的防抖，防抖时间设置为5秒
let errMsgDebounceTimer: any = null;
const errMsgDebounceWait = 5000;

requestArr.forEach((service) => {
  const store = loginStore();
  const { token } = storeToRefs(store);
  // request interceptor
  service.interceptors.request.use(
    
    async (config) => {
      if (!config.isCloseLoading) {
        showLoadingToast({
          message: "loading...",
          forbidClick: true,
        });
      }
      if (token.value) {
        config.headers.token = token.value;
      }
      const fullURL = `${config.baseURL || ''}${config.url}`;
      console.log(`Request Full URL: ${fullURL}`, config);
      return config;
    },
    (error) => {
      // do something with request error
      console.log(error); // for debug
      return Promise.reject(error);
    }
  );

  // response interceptor
  service.interceptors.response.use(
    async (response: AxiosResponse) => {
      closeToast();
      const res = response.data;
      const statusCode = res.code || response.status;

      // blob文件流
      if (res instanceof Blob) {
        return res;
      }

      // 成功
      if (statusCode === httpEnums.CODES.Success) {
        return res;
      }

      // token失效
      if (statusCode === httpEnums.CODES.UnAuthorized) {
        return Promise.reject(new Error("token过期！"));
      }

      const errMsg = res.message || res.msg;

      showNotify({
        message: errMsg || "Error",
        type: "danger",
        duration: 5 * 1000,
      });
      return Promise.reject(new Error(errMsg || "Error"));
    },
    async (error) => {
      closeToast();
      console.log("err" + error); // for debug

      // 定时器提示报错的防抖
      const errorDebounceHandler = (
        errorMessage: string,
        errorStatus: Number
      ) => {
        if (errMsgDebounceTimer) clearTimeout(errMsgDebounceTimer);
        const callNow = !errMsgDebounceTimer;
        errMsgDebounceTimer = setTimeout(() => {
          errMsgDebounceTimer = null;
        }, errMsgDebounceWait);

        if (callNow) {
          // 401 token过期，退出登陆
          if (errorStatus === 401) {
            const store = loginStore();
            store.resetToken();
            // router.push({ name: "Login" });
            location.reload();
          }
          showNotify({
            message: errorMessage,
            type: "danger",
            duration: errMsgDebounceWait,
          });
        }
      };

      const errorData = error.response.data;
      const errorStatus = error.response.status;

      if (errorStatus === httpEnums.HTTP_STATUS.REQUEST_ERROR.UnAuthorized) {
        errorDebounceHandler(error.message, errorStatus);
      } else if (
        errorData.code ===
        httpEnums.HTTP_STATUS.SERVER_ERROR.InternalServerError
      ) {
        // 500特殊处理
        return Promise.reject(error);
      } else {
        errorDebounceHandler(error.message);
        return Promise.reject(error);
      }
    }
  );
});

export { request };
