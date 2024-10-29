<template>
  <div class="news">
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
          <div class="notice-list">
            <div
              class="item"
              v-for="(item, index) in cardList"
              :key="index"
              @click="goDetail(item)"
            >
              <div class="icon-box">
                <img class="icon" src="/src/assets/icon/notice-icon.png" />
              </div>
              <div class="info-cont" :class="{ isRead: item.isRead }">
                <div class="title">{{ item.noticeTitle || "asd" }}</div>
                <span class="time">{{ item.createTime }}</span>
              </div>
              <div class="arrow-cont">
                <van-icon name="arrow" color="#999"></van-icon>
              </div>
            </div>
          </div>
        </list>
        <van-empty v-else description="no more thing" />
      </van-pull-refresh>
    </div>
  </div>
</template>

<script setup>
import recordList from "@/components/recordList/index.vue";
import { noticeListApi } from "@/api/homeApi";
import { ref, onMounted, reactive } from "vue";
import { List, showToast } from "vant"; //上拉刷新2
import { userStore } from "@/store/user";
import router from "@/router/index";

const listConfig = {
  titleKey: "transactionName",
  timeKey: "time",
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
  noticeListApi(params)
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

  noticeListApi({
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

const goDetail = (item) => {
  router.push({
    name: "NewsDetail",
    query: {
      id: item.noticeId,
    },
  });
};

onMounted(() => {
  onLoad();
});
</script>

<style lang="less" scoped>
.news {
  height: 100vh;
  padding: 20px 15px;
  .list-container {
    height: 100%;
    /deep/.van-pull-refresh {
      height: 100%;
    }
    .notice-list {
      height: 100%;
      .item {
        display: flex;
        align-items: center;
        padding: 0 10px 0 15px;
        width: 100%;
        height: 84px;
        background: rgba(27, 27, 27, 0.4);
        border-radius: 16px;
        border: 1px solid #434343;
        margin-bottom: 16px;
        .icon-box {
          width: 20px;
          .icon {
            width: 20px;
          }
        }
        .info-cont {
          height: 100%;
          padding: 20px 10px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width: 85%;
          color: #fff;
          &.isRead {
            color: #999;
          }
          .title {
            width: 100%;
            font-size: 15px;
            font-weight: 700;
            // 省略号
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .time {
            font-size: 12px;
          }
        }
        .arrow-cont {
          width: 20px;
        }
      }
    }
  }
}
</style>
