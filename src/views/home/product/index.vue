<template>
  <div class="product">
    <div class="nav-wrap">
      <Navbar v-model="tabs" />
    </div>
    <div v-if="pageData.productList.length" class="product-list">
      <div
        class="product-item"
        v-for="(item, index) in pageData.productList"
        :key="index"
        @click="goPage('ProductDetail', item)"
      >
        <div class="content">
          <div class="item-top">
            <div class="product-img-box">
              <img
                :src="
                  item.productImage == 'default'
                    ? defaultProductImg
                    : item.productImage
                "
                class="product-img"
              />
              <div class="level">{{ item.vipName }}</div>
              <!-- <div class="level">TOP{{ index + 1 }}</div> -->
            </div>
            <div class="product-introduce">
              <div class="title">{{ item.productName }}</div>
              <div class="product-info">
                <div class="item">
                  <div class="label">Daily Income</div>
                  <div class="value">₱{{ item.incomeDay || 0 }}</div>
                </div>
                <div class="item">
                  <div class="label">Income Days</div>
                  <div class="value">{{ item.dayNum || 0 }} days</div>
                </div>
                <div class="item">
                  <div class="label">Total Income</div>
                  <div class="value">₱{{ item.incomeTotal || 0 }}</div>
                </div>
                <div class="item">
                  <div class="label">Invest Amount</div>
                  <div class="value">₱{{ item.price || 0 }}</div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="item.productStatus == 1" class="pre-sale-tag">PRE_SALE</div>
          <!-- <div class="item-bottom">
            <div class="label">Total investment amount</div>
            <div class="value">₱{{ item.incomeTotal || 0 }}</div>
          </div> -->
        </div>
      </div>
    </div>
    <van-empty
      v-if="!pageData.productList.length"
      :description="noContentText"
    />
  </div>
</template>

<script setup>
import { showLoadingToast, closeToast } from "vant";
import { ref, onMounted, reactive, watch, computed } from "vue";
import Navbar from "@/components/nav/index.vue";
import { useRouter } from "vue-router";
import { productListApi } from "@/api/productApi";

const tabs = ref("1");
const router = useRouter();
const defaultProductImg = new URL(
  "/src/assets/images/home/default-product-img.png",
  import.meta.url
).href;

const pageData = reactive({
  productList: [],
});

const noContentText = computed(() => {
  // return {
  //   1: "No Base mine Data",
  //   2: "No Stable mine Data",
  //   3: "No New mine Data",
  // }[tabs.value];
  return "No Data";
});

watch(tabs, (newVal) => {
  pageData.productList = [];
  getProductList(newVal);
});

// 获取产品列表
const getProductList = (createId) => {
  // showLoadingToast({
  //   message: "loading...",
  //   forbidClick: true,
  // });
  productListApi({ createId }).then((res) => {
    pageData.productList = res.data;
  });
  // .finally(() => {
  //   closeToast();
  // });
};
const goPage = (name, item) => {
  if (name == 'ProductDetail' && item.productStatus == 1) return
  router.push({ name, query: { productId: item.productId } });
};

onMounted(() => {
  getProductList(tabs.value);
});
</script>

<style lang="less" scoped>
.product {
  display: flex;
  flex-direction: column;
  padding: 5px 15px;
  .nav-wrap {
    margin-bottom: 20px;
  }
  .product-list {
    flex: 1;
    height: calc(100vh - 54px - 20px);
    overflow-y: auto;
    .product-item {
      position: relative;
      border-bottom: 1px solid #494848;
      padding: 12px 12px 17px 12px;
      margin-bottom: 13px;
      &:last-of-type {
        border: none;
      }
      .item-top {
        display: flex;
        // height: 85px;
        // margin-bottom: 24px;
        .product-img-box {
          position: relative;
          width: 85px;
          // height: 85px;
          margin-right: 15px;
          .product-img {
            width: 100%;
          }
          .level {
            position: absolute;
            left: 0;
            top: 0;
            width: 42px;
            height: 21px;
            line-height: 21px;
            text-align: center;
            background: #ff7711;
            border-radius: 11px;
            font-size: 10px;
            color: #fff;
          }
        }
        .product-introduce {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          flex: 1;
          .title {
            font-family: PingFangSC, PingFang SC;
            font-weight: 500;
            font-size: 14px;
            color: #ffffff;
            line-height: 22px;
            font-style: normal;
            margin-bottom: 8px;
          }
          .product-info {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .item {
              display: flex;
              justify-content: space-between;
              color: #afafaf;
              font-size: 12px;
              margin-bottom: 5px;
              .value {
                font-weight: 700;
              }
            }
          }
        }
      }
      .pre-sale-tag{
        position: absolute;
        right: 30px;
        top: 40px;
        width: 130px;
        height: 40px;
        background-color: rgba(70, 135, 45, .7);
        color: #fff;
        text-align: center;
        line-height: 40px;
        border-radius: 20px;
        transform: rotate(-10deg);
      }
      // .item-bottom {
      //   display: flex;
      //   justify-content: space-between;
      //   .label {
      //     font-size: 14px;
      //     color: #ffffff;
      //     line-height: 20px;
      //   }
      //   .value {
      //     font-family: PingFangSC, PingFang SC;
      //     font-weight: 500;
      //     font-size: 16px;
      //     color: #ffb711;
      //     line-height: 22px;
      //     text-align: center;
      //   }
      // }
    }
  }
}
</style>
