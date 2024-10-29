<template>
  <div class="news-detail">
    <div class="news-cont">
      <div class="title">
        {{ pageData.detailData.noticeTitle }}
      </div>
      <div class="content">
        {{ pageData.detailData.noticeContent }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import { noticeDetailApi } from "@/api/homeApi";

const pageData = reactive({
  detailData: {},
});
const route = useRoute();

const getNoticeDetail = () => {
  if (!route.query.id) return;
  noticeDetailApi({ noticeId: route.query.id }).then((res) => {
    pageData.detailData = res.data;
  });
};

onMounted(() => {
  getNoticeDetail();
});
</script>

<style lang="less" scoped>
.news-detail {
  padding: 20px 15px;
  min-height: 100vh;
  .news-cont {
    width: 100%;
    // height: 100%;
    background: rgba(27, 27, 27, 0.4);
    border-radius: 16px;
    border: 1px solid #434343;
    padding: 20px 15px;
    color: #fff;
    .title {
      text-align: center;
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 20px;
    }
    .content {
      line-height: 25px;
      font-size: 14px;
      padding-bottom: 80px;
      text-indent: 2em;
    }
  }
}
</style>
