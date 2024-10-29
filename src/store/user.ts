import { ref } from "vue";
import { defineStore } from "pinia";
import { accountInfo } from "@/api/userApi";

export const userStore = defineStore(
  "user",
  () => {
    const profile = ref();

    const getProfile = async (token: string) => {
      const res = await accountInfo();
      profile.value = {
        ...res.data,
        avatar: res.data.avatar == "default" ? "" : res.data.avatar,
      };
    };

    const clearProfile = () => {
      profile.value = null;
    };

    return { profile, getProfile, clearProfile };
  },
  {
    persist: true,
  }
);
