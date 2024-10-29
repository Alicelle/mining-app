<template>
  <div class="do-tasks">
    <div class="title">Perform missions to get more rewards</div>
    <div
      class="main-content"
      v-for="(item, index) in pageData.taskList"
      :key="index"
    >
      <div class="container">
        <div class="task-title">
          {{ item.taskName }}
        </div>
        <div class="content">
          {{ item.description }}
        </div>
        <div class="progress-box">
          <div class="bar" :style="{ width: calcTaskProgress(item) }"></div>
          <span class="text"
            >{{ item.actualValue || 0 }} / {{ item.totalValue || 0 }}</span
          >
        </div>
        <div class="do-task-btn" @click="goTask(item)">Do Tasks</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { showSuccessToast, showFailToast } from "vant";
import { taskListApi, doTaskApi } from "@/api/homeApi.ts";
import { reactive } from "vue";

const pageData = reactive({
  taskList: [],
});

// const statusMap = {
//   0: 'The task has not yet started',
//   2: 'The task has ended'
// }

const getTaskList = () => {
  taskListApi().then((res) => {
    // console.log(res);
    pageData.taskList = res.data;
  });
};

const calcTaskProgress = (item) => {
  let { totalValue, actualValue } = item;
  const progress = ((actualValue || 0) / totalValue) * 100;
  return `${progress}%`;
};

// 做任务
const goTask = (item) => {
  if (item.isReceive) return showFailToast("The task has been claimed");
  // if (statusMap[item.status]) {
  //   return showFailToast(statusMap[item.status])
  // }
  doTaskApi({ taskId: item.taskId }).then(() => {
    showSuccessToast("Receive Task Success");
    getTaskList();
  });
};

getTaskList();
</script>

<style lang="less" scoped>
.do-tasks {
  padding: 40px 14px;
  .title {
    font-weight: 700;
    font-size: 18px;
    color: #ffffff;
    line-height: 25px;
    margin-bottom: 30px;
  }
  .main-content {
    margin-bottom: 13px;
    min-height: 249px;
    width: 100%;
    background: url("/src/assets/images/home/main-content-bg.png") no-repeat;
    background-size: 100% 100%;
    .container {
      padding: 20px 25px 25px 25px;
      .task-title {
        color: #fff;
        font-weight: 700;
        font-size: 18px;
        margin-bottom: 10px;
        text-align: center;
      }
      .content {
        font-size: 14px;
        color: #afafaf;
        line-height: 20px;
        margin-bottom: 23px;
        min-height: 100px;
      }
      .progress-box {
        position: relative;
        height: 12px;
        border-radius: 6px;
        background-color: #323232;
        margin-bottom: 24px;
        .bar {
          // width: 50%;
          height: 100%;
          background: linear-gradient(
            270deg,
            #74e2bb 0%,
            rgba(63, 193, 134, 0.12) 100%
          );
          border-radius: 6px;
        }
        .text {
          position: absolute;
          right: 10px;
          top: 0;
          font-size: 10px;
          color: #ffffff;
          line-height: 14px;
        }
      }
      .do-task-btn {
        margin: 0 auto;
        width: 140px;
        height: 44px;
        line-height: 44px;
        text-align: center;
        background: rgba(63, 193, 134, 0.3);
        border-radius: 29px;
        font-size: 16px;
        color: #ffffff;
      }
    }
  }
}
</style>
