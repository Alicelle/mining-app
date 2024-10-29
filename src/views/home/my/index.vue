<template>
  <div class="my">
    <div class="personal-info" @click="goPage('ChangeNickname')">
      <div class="info-left">
        <img
          :src="
            countInfoData.avatar || defaultAvatarImg
          "
          class="avatar"
        />
        <div class="info-box">
          <div class="username">{{ countInfoData.nickName }}</div>
          <div class="user-info">
            <span class="user-id">ID : {{ countInfoData.userId }}</span>
            <span class="tel">TEL : {{ countInfoData.phone }}</span>
          </div>
        </div>
      </div>
      <div class="info-arrow">
        <van-icon name="arrow" />
      </div>
    </div>
    <div class="container-list">
      <div
        class="item"
        v-for="item in myOperateList"
        :key="item.icon"
        @click="goPage(item.pageName)"
      >
        <div class="item-content">
          <div class="icon-box">
            <img :src="item.icon" class="icon" />
          </div>
          <div class="text">{{ item.text }}</div>
        </div>
        <van-icon class="icon" name="arrow" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { showConfirmDialog } from "vant";
import { apiLogout } from "@/api/loginApi";
import { myOperateList } from "@/constant/enums";
import { useRouter } from "vue-router";
import { loginStore } from "@/store/login";
import { accountInfo, getAvatar } from "@/api/userApi";
import { reactive, onMounted, toRefs } from "vue";
import { userStore } from "@/store/user";

const router = useRouter();
const pageData = reactive({
  countInfoData: {},
});

const defaultAvatarImg = new URL(
  "/src/assets/images/home/default-avatar.png",
  import.meta.url
).href;

const useMethods = () => {
  const login = loginStore();
  const user = userStore();

  const goPage = (name) => {
    if (name == "logout") {
      return logout();
    }
    router.push({ name });
  };

  const logout = () => {
    showConfirmDialog({
      title: "Exit",
      width: "270px",
      message: "Are you sure you want to log out?",
      confirmButtonText: "Confirm",
      confirmButtonColor: "#3FC186",
      cancelButtonText: "Cancel",
      cancelButtonColor: "#fff",
    })
      .then(async () => {
        const res = await apiLogout();
        // if ()
        login.resetToken();
        router.push({ name: "Login" });
      })
      .catch(() => {
        // on cancel
      });
  };

  const getAccountInfo = () => {
    pageData.countInfoData = user.profile;
    console.log(pageData.countInfoData, "pageData.countInfoData");
  };

  return { goPage, logout, getAccountInfo };
};

const useData = () => {
  const { countInfoData, avatarUrl } = toRefs(pageData);
  return { countInfoData, avatarUrl };
};

const { countInfoData, avatarUrl } = useData();
const { goPage, logout, getAccountInfo } = useMethods();

getAccountInfo();
</script>

<style scoped lang="less">
.my {
  padding: 17px 15px;
  .personal-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
    .info-left {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .avatar {
        width: 60px;
        border-radius: 11px;
        margin-right: 16px;
      }
      .info-box {
        flex: 1;
        .username {
          font-family: PingFangSC, PingFang SC;
          font-weight: 700;
          font-size: 22px;
          color: #ffffff;
          line-height: 30px;
          margin-bottom: 6px;
        }
        .user-info {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: #afafaf;
          line-height: 17px;
        }
      }
    }
    .info-arrow {
      margin-left: 46px;
      color: #fff;
    }
  }
  .container-list {
    .item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: rgba(27, 27, 27, 0.4);
      border-radius: 16px;
      border: 1px solid #434343;
      height: 64px;
      padding: 0 16px 0 24px;
      margin-bottom: 16px;
      .item-content {
        display: flex;
        align-items: center;
        .icon-box {
          width: 22px;
          height: 19px;
          margin-right: 18px;
        }
        .text {
          font-size: 16px;
          color: #ffffff;
          line-height: 22px;
        }
      }
      .icon {
        color: #afafaf;
      }
    }
  }
}
</style>
