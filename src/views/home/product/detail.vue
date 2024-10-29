<template>
  <div class="product-detail">
    <div class="product-main-pic">
      <img
        :src="
          pageData.detailData.productImage == 'default'
            ? defaultProductImg
            : pageData.detailData.productImage
        "
        class="product-pic"
      />
    </div>
    <div class="product-intro">
      <div class="product-name">{{ pageData.detailData.productName }}</div>
      <div class="product-param">
        <div class="item">
          <div class="label">Daily Income</div>
          <div class="value">₱{{ pageData.detailData.incomeDay || 0 }}</div>
        </div>
        <div class="item">
          <div class="label">Income Days</div>
          <div class="value">{{ pageData.detailData.dayNum || 0 }} days</div>
        </div>
        <div class="item">
          <div class="label">Total Income</div>
          <div class="value">₱{{ pageData.detailData.incomeTotal || 0 }}</div>
        </div>
        <div class="item">
          <div class="label">Invest Amount</div>
          <div class="value">₱{{ pageData.detailData.price || 0 }}</div>
        </div>
      </div>
    </div>
    <div class="purchase-cont">
      <div class="title">Purchase Quantity</div>
      <div class="operate-box">
        <div class="btn reduce-btn" @click="reduce">—</div>
        <div class="num">{{ purchaseQuantity }}</div>
        <div class="btn add-btn" @click="add">+</div>
      </div>
      <div class="tip">
        <div class="text">Your available balance</div>
        <div class="balance-box">₱{{ countInfoData.balance }}</div>
      </div>
      <div class="confirm-btn" @click="confirm">Confirm</div>
    </div>
  </div>
</template>

<script setup>
import { showSuccessToast } from "vant";
import { productDetailApi, orderAddApi } from "@/api/productApi";
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted, reactive, toRefs } from "vue";
import { userStore } from "@/store/user";

const purchaseQuantity = ref(1);
const user = userStore();
const route = useRoute();
const router = useRouter();
const defaultProductImg = new URL(
  "/src/assets/images/product/product-main-pic.png",
  import.meta.url
).href;

const pageData = reactive({
  detailData: {},
  countInfoData: {},
  timeId: null
});

const add = () => {
  purchaseQuantity.value++;
};

const confirm = () => {
  const params = {
    productId: route.query.productId,
    sellNum: purchaseQuantity.value,
  };
  orderAddApi(params).then((res) => {
    showSuccessToast("Purchase successful");
    pageData.timeId = setTimeout(() => {
      user.getProfile();
      router.go(-1);
      if (pageData.timeId) {
        clearTimeout(pageData.timeId)
      }
    }, 1500)
  });
};

const initCountInfo = () => {
  pageData.countInfoData = user.profile;
};

const reduce = () => {
  if (purchaseQuantity.value <= 1) {
    return false;
  }
  purchaseQuantity.value--;
};

const useData = () => {
  const { countInfoData } = toRefs(pageData);
  return { countInfoData };
};

const { countInfoData } = useData();

const getProductDetail = () => {
  if (!route.query.productId) return;
  productDetailApi({ productId: route.query.productId }).then((res) => {
    pageData.detailData = res.data;
  });
};

onMounted(() => {
  getProductDetail();
  initCountInfo();
});
</script>

<style lang="less" scoped>
.product-detail {
  padding: 16px;
  .product-main-pic {
    width: 158px;
    height: 158px;
    margin: 0 auto;
    .product-pic {
      width: 100%;
    }
  }
  .product-intro {
    margin-top: 18px;
    margin-bottom: 30px;
    .product-name {
      font-family: PingFangSC, PingFang SC;
      font-weight: 700;
      font-size: 16px;
      color: #ffffff;
      line-height: 22px;
      margin-bottom: 8px;
    }
    .product-param {
      .item {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        color: #afafaf;
        line-height: 17px;
        margin-bottom: 4px;
      }
    }
  }
  .purchase-cont {
    .title {
      font-weight: 700;
      font-size: 22px;
      color: #3fc186;
      line-height: 30px;
      text-align: center;
      margin-bottom: 20px;
    }
    .operate-box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 203px;
      margin: 0 auto;
      .btn {
        display: flex;
        align-items: center;
        justify-content: center;
        color: #22a367;
        width: 42px;
        height: 42px;
        border-radius: 16px;
        background: #1c1c1c;
        box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.6);
        border-radius: 16px;
        border: 1px solid rgba(196, 188, 188, 0.4);
        font-size: 18px;
        &.add-btn {
          font-size: 28px;
        }
      }
      .num {
        text-align: center;
        font-family: PingFangSC, PingFang SC;
        font-weight: 700;
        font-size: 24px;
        color: #ffffff;
        line-height: 33px;
        text-align: center;
      }
    }
    .tip {
      display: flex;
      align-items: center;
      margin-top: 60px;
      margin-bottom: 13px;
      .text {
        font-size: 12px;
        color: #ffffff;
        margin-right: 10px;
      }
      .balance-box {
        font-family: PingFangSC, PingFang SC;
        font-weight: 500;
        font-size: 16px;
        color: #ffb711;
        line-height: 22px;
      }
    }
  }
}
</style>
