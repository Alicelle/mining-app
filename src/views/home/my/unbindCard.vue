<template>
  <div class="unbind-card bottom-safe-area">
    <div class="title">Unbind Bank Card</div>
    <div class="sub-title">
      Please enter your transaction password to verify your identity
    </div>
    <div class="input-cont">
      <div class="block">{{ pwdEncryption.charAt(0) }}</div>
      <div class="block">{{ pwdEncryption.charAt(1) }}</div>
      <div class="block">{{ pwdEncryption.charAt(2) }}</div>
      <div class="block">{{ pwdEncryption.charAt(3) }}</div>
      <div class="block">{{ pwdEncryption.charAt(4) }}</div>
      <div class="block">{{ pwdEncryption.charAt(5) }}</div>
    </div>
    <div class="enter-cont">
      <div class="block-list">
        <div
          v-for="(item, index) in btnList"
          :key="index"
          class="enter-block"
          :class="{
            'bg-transparent': !item.num && !item.letter,
            'is-full': item.num == '0',
            'is-delete': item.num == 'del',
          }"
          @click="keyboardClick(item)"
        >
          <template v-if="item.num != 'del'">
            <div class="num-block">{{ item.num == "del" ? "" : item.num }}</div>
            <div class="letter-block" v-if="item.num != 0">
              {{ item.letter }}
            </div>
          </template>
          <div v-else class="del-btn">
            <img src="/src/assets/icon/delete-icon.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { accountUnbindApi } from "@/api/bankApi";
import { useRoute, useRouter } from "vue-router";
import { showSuccessToast } from "vant";

const pwdEncryption = ref("");
const pwd = ref("");
const route = useRoute();
const router = useRouter();

const btnList = [
  {
    num: "1",
    letter: "",
  },
  {
    num: "2",
    letter: "ABC",
  },
  {
    num: "3",
    letter: "DEF",
  },
  {
    num: "4",
    letter: "GHI",
  },
  {
    num: "5",
    letter: "JKL",
  },
  {
    num: "6",
    letter: "MNO",
  },
  {
    num: "7",
    letter: "PQRS",
  },
  {
    num: "8",
    letter: "TUV",
  },
  {
    num: "9",
    letter: "WXYZ",
  },
  {
    num: "",
    letter: "",
  },
  {
    num: "0",
    letter: "",
  },
  {
    num: "del",
    letter: "",
  },
];

const keyboardClick = (item) => {
  if (item.num != "del" && item.num) {
    if (pwdEncryption.value.length >= 6) return;
    pwdEncryption.value += "*";
    pwd.value += item.num;
    if (pwd.value.length >= 6) {
      // 解绑银行卡
      const params = {
        accountId: route.query.accountId,
        password: pwd.value,
      };
      accountUnbindApi(params)
        .then((res) => {
          showSuccessToast("Unbind Success");
          setTimeout(() => {
            router.back();
          }, 1000);
        })
        .catch(() => {
          pwdEncryption.value = "";
          pwd.value = "";
        });
    }
  }
  if (item.num == "del") {
    if (pwdEncryption.value.length <= 0) return;
    const arr = pwdEncryption.value.split("");
    arr.pop();
    pwdEncryption.value = arr.join("");
    const pwdArr = pwd.value.split("");
    pwdArr.pop();
    pwd.value = pwdArr.join("");
  }
};
</script>

<style lang="less" scoped>
.unbind-card {
  position: relative;
  height: 100vh;
  padding-top: 137px;
  .title {
    text-align: center;
    font-family: PingFangSC, PingFang SC;
    font-weight: 700;
    font-size: 24px;
    color: #ffffff;
    line-height: 33px;
    margin-bottom: 10px;
  }
  .sub-title {
    width: 242px;
    margin: 0 auto;
    font-size: 12px;
    color: #ffffff;
    line-height: 17px;
    text-align: center;
    margin-bottom: 40px;
  }
  .input-cont {
    display: flex;
    justify-content: space-between;
    width: 302px;
    height: 42px;
    margin: 0 auto;
    .block {
      width: 42px;
      height: 42px;
      background: rgba(0, 0, 0, 0.22);
      border-radius: 16px;
      border: 1px solid rgba(200, 200, 200, 0.3);
      text-align: center;
      line-height: 42px;
      color: #fff;
      font-size: 34px;
      padding-top: 5px;
    }
  }
  .enter-cont {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 266px;
    background: rgba(10, 10, 10, 0.96);
    backdrop-filter: blur(20px);
    padding: 7px 6px 0 6px;
    .block-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .enter-block {
        display: flex;
        flex-direction: column;
        width: 117px;
        height: 46px;
        background: #434343;
        box-shadow: 0px 1px 0px 0px #000000;
        border-radius: 5px;
        margin-bottom: 7px;
        &:active {
          opacity: 0.7;
        }
        .num-block {
          height: 30px;
          line-height: 30px;
          text-align: center;
          color: #fff;
          font-size: 25px;
        }
        .letter-block {
          display: flex;
          justify-content: center;
          align-items: center;
          flex: 1;
          font-size: 10px;
          color: #fff;
          letter-spacing: 2px;
        }
        &.bg-transparent {
          background-color: transparent;
        }
        &.is-full {
          .num-block {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
          }
        }
        &.is-delete {
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: transparent;
          .del-btn {
            padding-top: 5px;
            img {
              width: 32px;
            }
          }
        }
      }
    }
  }
}
</style>
