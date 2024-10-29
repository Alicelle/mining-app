<template>
  <div class="bank-card">
    <template v-if="bankList.length">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text=""
          @load="onLoad"
        >
          <div class="bank-card-list">
            <div
              class="item card-shadow"
              v-for="(item, index) in bankList"
              :key="index"
            >
              <div class="card-top">
                <div class="icon-box">
                  <img src="/src/assets/icon/bank-card-icon.png" />
                </div>
                <div class="card-info">
                  <div class="bank-name">{{ item.bankName }}</div>
                  <div class="bank-no">{{ item.accountNumber }}</div>
                </div>
              </div>
              <div class="unbundle-btn" @click="unbindCard(item)">Unbundle</div>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
    </template>
    <van-empty v-else description="no more thing" />
    <div class="btn-fixed-box">
      <div class="confirm-btn" @click="addBankCard">
        <van-icon name="plus"></van-icon>
        <span class="text">Add Bank Card</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { bankListApi } from "@/api/bankApi";
import { userStore } from "@/store/user";

const pageEffect = () => {
  const router = useRouter();
  const user = userStore();
  const pageData = reactive({
    loading: false,
    finished: false,
    refreshing: false,
    bankList: [],
    pageNum: 1,
    pageSize: 10,
  });

  const { loading, finished, refreshing, bankList, pageNum, pageSize } =
    toRefs(pageData);

  // 解绑
  const unbindCard = (item) => {
    router.push({
      name: "UnbindBankCard",
      query: { accountId: item.accountId },
    });
  };
  // 下拉刷新
  const onRefresh = () => {
    // 清空列表数据
    bankList.value = [];
    finished.value = false;
    pageNum.value = 1;
    // 将 loading 设置为 true，表示处于加载状态
    loading.value = true;
    onLoad();
  };
  const onLoad = () => {
    if (refreshing.value) {
      bankList.value = [];
      refreshing.value = false;
    }
    const params = {
      pageNum: pageNum.value,
      pageSize: pageSize.value,
    };
    bankListApi(params).then((res) => {
      bankList.value = (res.data && res.data.records) || [];
    });
    loading.value = false;

    if (bankList.value.length < pageSize.value) {
      finished.value = true;
    }
  };
  const addBankCard = () => {
    // 没有设置交易密码跳转至设置交易密码
    console.log(user.profile, "user.profile");
    if (!user.profile.bankPasswordFlag) {
      console.log(9999999);
      router.push({ name: "SetTradingPwd" });
      return false;
    }
    router.push({ name: "AddBankCard" });
  };
  return {
    loading,
    finished,
    refreshing,
    bankList,
    onRefresh,
    onLoad,
    addBankCard,
    unbindCard,
  };
};

const {
  loading,
  finished,
  refreshing,
  bankList,
  onRefresh,
  onLoad,
  addBankCard,
  unbindCard,
} = pageEffect();
onLoad();
</script>

<style lang="less" scoped>
.bank-card {
  padding: 15px 14px 70px 14px;
  .bank-card-list {
    // margin-bottom: 40px;
    .item {
      width: 345px;
      height: 212px;
      border-radius: 16px;
      background: url("/src/assets/images/home/card-bg.png") no-repeat;
      background-size: contain;
      padding: 16px 25px;
      margin-bottom: 20px;
      .card-top {
        display: flex;
        margin-bottom: 24px;
        .icon-box {
          width: 16px;
          margin-right: 8px;
          img {
            width: 100%;
          }
        }
        .card-info {
          flex: 1;
          .bank-name {
            font-family: PingFangSC, PingFang SC;
            font-weight: 500;
            font-size: 18px;
            color: #ffffff;
            line-height: 25px;
            margin-bottom: 12px;
          }
          .bank-no {
            font-family: PingFangSC, PingFang SC;
            font-weight: 500;
            font-size: 20px;
            color: #3fc186;
            line-height: 33px;
            text-align: left;
            font-style: normal;
          }
          .tip {
            font-size: 16px;
            color: #afafaf;
            line-height: 22px;
          }
        }
      }
      .unbundle-btn {
        width: 140px;
        height: 44px;
        text-align: center;
        line-height: 44px;
        background: rgba(63, 193, 134, 0.3);
        border-radius: 29px;
        margin: 0 auto;
        font-size: 16px;
        color: #ffffff;
      }
    }
  }
  .btn-fixed-box{
    width: 100%;
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0;
    padding-bottom: 20px;
    background-color: #242424;
  }
  .confirm-btn {
    width: 90%;
    margin: 0 auto;
  }
}
</style>
