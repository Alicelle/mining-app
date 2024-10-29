<template>
  <div class="balance-record">
    <div class="count-box">
      <span class="label">Account Balance</span>
      <span class="value">₱{{ user.profile.balance }}</span>
    </div>
    <div class="list-container">
      <van-pull-refresh
        v-model="freshing"
        success-text="refresh success"
        @refresh="onRefresh"
        class="refresh-style"
      >
        <list
          v-if="cardList.length"
          v-model:IsLoading="addressModel.IsLoading"
          :finished="addressModel.finished"
          finished-text="no more"
          @load="onLoad"
          :immediate-check="false"
          :offset="15"
        >
          <recordList :list="cardList" :config="listConfig" />
        </list>
        <van-empty v-else description="no more thing" />
      </van-pull-refresh>
    </div>
  </div>
</template>

<script setup>
import recordList from "@/components/recordList/index.vue";
import { transactionListApi } from "@/api/myApi";
import { ref, onMounted, reactive } from "vue";
import { List, showToast } from "vant"; //上拉刷新2
import { userStore } from "@/store/user";

const listConfig = {
  titleKey: "transactionName",
  timeKey: "createTime",
  amountKey: "amount",
};

// 触底加载需要改动的位置 3 --- 存储的数组
const cardList = ref([]); //这是存储的数组
const user = userStore();
const addressModel = reactive({
  init: false,
  pageNum: 0,
  pageSize: 10,
  loading: true, //上拉刷新 3
  IsLoading: false, // 非加载中，IsLoading 为 false
  finished: false, //是否已加载完成，加载完成后不再触发 load 事件  ：初始值一定要给false：表示所有数据都加载完毕。不允许再次触发@load事件。
  error: false,
  errorText: "request error,Click retry",
  finishedText: "no more",
});

//上拉刷新 4
const freshing = ref(false);
const onRefresh = () => {
  addressModel.pageNum = 1;
  addressModel.IsLoading = false;
  addressModel.finished = false;
  getPageList();
};

const getPageList = () => {
  // 触底加载需要改动的位置 4 --- 接口
  const params = {
    pageNum: addressModel.pageNum,
    pageSize: addressModel.pageSize,
  };
  transactionListApi(params)
    .then((res) => {
      cardList.value = res.data.records; //将请求到的列表赋值给cardList
      addressModel.loading = false; //上拉刷新 5
      if (freshing.value) {
        // showToast("The latest data is already available");
        freshing.value = false;
      }
    })
    .catch((err) => {
      console.log("错误", err);
    });
};

const onLoad = async () => {
  addressModel.pageNum++; //当前页：

  transactionListApi({
    pageNum: addressModel.pageNum,
    pageSize: addressModel.pageSize,
  })
    .then((res) => {
      if (res.data.records.length === 0) {
        //说明没有获取到数据，也就是说所有的数据全部取完了，真正的到底了
        addressModel.IsLoading = true;
        addressModel.finished = true;
      } else {
        addressModel.IsLoading = false; //表示允许再次触发@load事件
        cardList.value = [...cardList.value, ...res.data.records]; //将请求到的列表赋值给cardList
      }
    })
    .catch((err) => {
      console.log("错误", err);
    });
};
onMounted(() => {
  onLoad();
});
</script>

<style lang="less" scoped>
.balance-record {
  padding: 20px 15px;
  height: 100vh;
  .count-box {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    .label {
      font-size: 16px;
      color: #ffffff;
      line-height: 22px;
      margin-right: 8px;
    }
    .value {
      font-size: 18px;
      color: #ffb711;
      line-height: 25px;
    }
  }
  .list-container {
    height: calc(100vh - 80px);
    /deep/.van-pull-refresh {
      height: 100%;
    }
  }
}
</style>
