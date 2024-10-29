<template>
  <div class="home-index">
    <div class="qrcode-box" @click="showPopup(true)">
      <img src="/src/assets/images/home/side_icon.png" />
    </div>
    <personalInfo @getCountlevelName="getCountlevelName" />
    <div class="assets-card flex-column card-shadow">
      <div class="assets-top">
        <div class="icon-box">
          <img src="/src/assets/images/home/assets-icon.png" />
        </div>
        <div class="assets-content">
          <div class="title">Total Assets</div>
          <div class="assets-num">₱{{ countInfoData.balance || "0.00" }}</div>
          <div class="extractable-tip">
            <span class="label">Extractable:</span>
            <span class="value"
              >₱{{ countInfoData.withdrawalAmount || "0.00" }}</span
            >
          </div>
        </div>
        <div class="record-box" @click="goPage('PersonalData')">
          <img src="/src/assets/images/home/record-icon.png" />
        </div>
      </div>
      <div class="assets-btn-box">
        <div class="btn" @click="goPage('Recharge')">Recharge</div>
        <div class="btn" @click="goPage('Withdraw')">Withdrawal</div>
      </div>
    </div>
    <div v-show="productList.length" class="product-card card-shadow">
      <div
        class="product-item"
        v-for="(item, index) in productList"
        :key="index"
        @click="goProductDetailPage('ProductDetail', item)"
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
              <div class="level">TOP{{ index + 1 }}</div>
              <!-- <div class="level">{{ vipMapping[item.levelId] || 'vip0' }}</div> -->
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
          <!-- <div class="item-bottom">
            <div class="label">Invest Amount</div>
            <div class="value">₱{{ item.price || 0 }}</div>
          </div> -->
        </div>
      </div>
    </div>
    <div class="invitation-card card-shadow">
      <div class="rewards-title">
        <img class="icon" src="/src/assets/icon/gift-icon.png" />
        <span class="text">Recommendation Rewards</span>
      </div>
      <div class="link-wrap">
        <div class="link-show-box">
          <div class="link">
            {{ invitionUrl }}
          </div>
          <div class="copy-btn" @click="copyLink">Copy Link</div>
        </div>
        <div class="tip">
          Copy the invitation link and send it to your friend, successfully
          registered an account
        </div>
      </div>
      <div class="recommendation-box">
        <div class="item">
          <div class="icon-box">
            <img src="/src/assets/icon/recommendation-icon.png" />
          </div>
          <div class="recommendation-content-box">
            <div class="title">Direct Recommendation</div>
            <div class="recommendation-content">
              <!-- <div class="item-tips">If you invite A to Invest Successfully, You will get an additional reward of <span>300</span>, and you will get <span>25%</span> (Product type is Basic mine) or <span>5%</span> (Product type is New mine) of A's total investment.</div> -->
              <!-- If you successfully invite A to invest, you will receive -->
              If you invite A to Invest Successfully, You will get an additional
              reward of
              {{ commissionConfigData.inviteActivationRewardAmount || 0 }} and
              you will get
              {{
                recommendationData.expirationProduct.firstLevelCommission *
                  100 || 0
              }}% (Product type is Basic mine) or {{ recommendationData.activityRewardProduct.firstLevelCommission * 100 || 0 }}% (Product type is New mine) of A's total investment.
            </div>
          </div>
        </div>
        <div class="item">
          <div class="icon-box">
            <img src="/src/assets/icon/recommendation-icon.png" />
          </div>
          <div class="recommendation-content-box">
            <div class="title">Indirect Recommendation</div>
            <div class="recommendation-content">
              When A invites B to invest successfully, you will also receive B
              investment Reward of
              {{
                recommendationData.expirationProduct.secondLevelCommission *
                  100 || 0
              }}% of the total amount(when the product type is mine Factory)
            </div>
          </div>
        </div>
        <div class="item">
          <div class="icon-box">
            <img src="@/assets/icon/recommendation-icon.png" />
          </div>
          <div class="recommendation-content-box">
            <div class="title">Indirect Recommendation</div>
            <div class="recommendation-content">
              When B invites C to invest successfully, you will also get C
              Reward of
              {{
                recommendationData.expirationProduct.thirdLevelCommission *
                  100 || 0
              }}% of the total investment (when the product type is a mining
              plant Hour)
            </div>
          </div>
        </div>
        <div class="invitation-btn-box">
          <div class="btn" @click="goPage('MyInvitation')">
            View My Invitation
          </div>
        </div>
      </div>
    </div>
    <div class="online-customer" @click="showBottom = true">
      <img class="img" src="/src/assets/images/home/online-customer.png" />
    </div>
    <!-- 左侧弹出 -->
    <van-popup
      v-model:show="showLeft"
      position="left"
      :style="{ width: '75%', height: '100%' }"
      @click-overlay="showPopup(false)"
    >
      <div class="popup-cont">
        <div class="personal-info-box">
          <div class="avatar-box">
            <img
              :src="countInfoData.avatar || defaultAvatarImg"
              class="avatar"
            />
          </div>
          <div class="info-box">
            <div class="nick-name">{{ countInfoData.nickName }}</div>
            <div class="level" v-if="levelName">
              <span class="level-tag">
                {{ levelName || "VIP0" }}
              </span>
            </div>
          </div>
        </div>
        <div class="menu-list">
          <div
            class="menu-item"
            v-for="(item, index) in navBarMenuList"
            :key="index"
            @click="goPage(item.pageName)"
          >
            <div class="item-left">
              <img class="icon" :width="item.width" :src="item.icon" alt="" />
              <span class="text">{{ item.name }}</span>
            </div>
            <van-icon name="arrow" color="#AFAFAF"></van-icon>
          </div>
        </div>
      </div>
    </van-popup>
    <!-- 兑换弹窗 -->
    <van-popup
      v-model:show="isShowExchange"
      position="center"
      :style="{ width: '72%' }"
    >
      <div class="exchange-cont">
        <div class="title">I'd like to cash</div>
        <div class="sub-title">
          Please enter a valid exchange code to redeem
        </div>
        <input
          v-model="exchangeCode"
          class="input"
          type="text"
          placeholder="Enter conversion code"
        />
        <div class="btn-box">
          <div class="btn" @click="isShowExchange = false">Cancel</div>
          <div class="btn" @click="exchangeSubmit">Confirm</div>
        </div>
      </div>
    </van-popup>
    <!-- 通知弹窗 -->
    <van-popup
      v-model:show="isShowNotice"
      position="center"
      :style="{
        width: '72%',
        'background-color': '#fff',
        'border-radius': '0',
      }"
    >
      <div class="notice-cont">
        <div class="title">{{ readData.noticeTitle }}</div>
        <div class="tip" v-html="readData.noticeContent"></div>
        <div class="cancel-btn-box">
          <div class="btn" @click="isShowNotice = false">Cancel</div>
        </div>
      </div>
    </van-popup>
    <!-- 底部弹出 -->
    <van-popup
      v-model:show="showBottom"
      position="bottom"
      :style="{ width: '100%', height: '35%' }"
      @click-overlay="showPopup(false)"
    >
      <div class="bottom-cont">
        <div class="link-item" @click="linkTo('whatsAppGroup')">
          <img class="img" src="@/assets/icon/whatsapp-icon.png" alt="" />
          <span class="text">WhatsApp</span>
        </div>
        <div class="link-item" @click="linkTo('onlineCustomerService')">
          <img class="img" src="@/assets/icon/whatsapp-icon.png" alt="" />
          <span class="text">Saluran Telegram</span>
        </div>
      </div>
    </van-popup>
    <!-- tg频道链接 -->
    <van-popup
      v-model:show="showTgChannel"
      position="center"
      :style="{ width: '98%' }"
    >
      <div class="channel-cont" @click="linkTo('telegramChannel')">
        <div class="icon">
          <img src="@/assets/images/home/channel-logo.png" alt="">
        </div>
        <div class="text">Alcoa Official Channel</div>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import personalInfo from "@/components/personalInfo/index.vue";
import { showSuccessToast, showFailToast } from "vant";
import { ref, reactive, toRefs, onMounted } from "vue";
import { useRouter } from "vue-router";
import { NAV_BAR_MENU_LIST } from "@/constant/enums.ts";
import { userStore } from "@/store/user";
import {
  userCodeApi,
  exchangeApi,
  getNoticeApi,
  getSystemUrlApi,
  getProductCommission,
  // changeLanguageApi,
  getProductActivationApi,
  getHotProductListApi,
} from "@/api/homeApi";
import page from "@/router/page/index";

const defaultProductImg = new URL(
  "/src/assets/images/home/default-product-img.png",
  import.meta.url
).href;
const showLeft = ref(false);
const showBottom = ref(false);
const isShowExchange = ref(false);
const isShowNotice = ref(false);
const showTgChannel = ref(true);
const levelName = ref("");
const pageData = reactive({
  countInfoData: {},
  productList: [],
  exchangeCode: "",
  readData: {},
  linkData: {},
  recommendationData: {
    activityRewardProduct: {},
    expirationProduct: {},
  },
  commissionConfigData: {},
  invitionUrl: location.origin + "/#/registerCount",
  vipMapping: {}
});
const router = useRouter();
const navBarMenuList = NAV_BAR_MENU_LIST;

const user = userStore();

const defaultAvatarImg = new URL(
  "/src/assets/images/home/default-avatar.png",
  import.meta.url
).href;

const useData = () => {
  const {
    countInfoData,
    invitionUrl,
    productList,
    exchangeCode,
    readData,
    recommendationData,
    commissionConfigData,
    vipMapping
  } = toRefs(pageData);
  return {
    countInfoData,
    invitionUrl,
    productList,
    exchangeCode,
    readData,
    recommendationData,
    commissionConfigData,
    vipMapping
  };
};

const useMethods = () => {
  const getCountlevelName = (name, vipList) => {
    levelName.value = name.value;
    vipList.forEach(item => {
      pageData.vipMapping[item.levelId] = item.name
    })
  };
  // 页面跳转方法
  const goPage = (name) => {
    if (name == "exchange") {
      showPopup(false);
      isShowExchange.value = true;
      return;
    }
    if (name == "Download") {
      window.open(pageData.linkData.appDownloadLink, "_blank");
      return;
    }
    router.push({ name });
  };
  const goProductDetailPage = (name, item) => {
    router.push({ name, query: { productId: item.productId } });
  };
  const linkTo = (key) => {
    window.open(pageData.linkData[key], "_blank");
  };

  const getJumpUrl = () => {
    getSystemUrlApi().then((res) => {
      pageData.linkData = res.data;
    });
  };

  // 兑换提交
  const exchangeSubmit = () => {
    if (!pageData.exchangeCode) {
      showFailToast("Please enter a valid exchange code to redeem");
      return;
    }
    exchangeApi({ cdkUuid: pageData.exchangeCode }).then(async (res) => {
      showSuccessToast("Exchange successful");
      await user.getProfile();
      isShowExchange.value = false;
    });
  };

  // 首页是否弹窗
  const getIsShowNotice = () => {
    getNoticeApi().then((res) => {
      pageData.readData = res.data || {};
      isShowNotice.value = Boolean(res.data && !pageData.readData.isRead)
    });
  };

  const showPopup = (isShow) => {
    showLeft.value = isShow;
  };

  const initCountInfo = async () => {
    await user.getProfile();
    pageData.countInfoData = user.profile;
  };

  // 获取邀请码
  const getInvitionCode = () => {
    userCodeApi().then((res) => {
      pageData.invitionUrl =
        pageData.invitionUrl + `?invitationCode=${res.data}`;
    });
  };

  // 获取产品列表
  const getProductList = () => {
    getHotProductListApi().then((res) => {
      pageData.productList = res.data;
    });
  };

  const copyLink = () => {
    let input = document.createElement("input"); //创建一个input标签
    input.value = pageData.invitionUrl; //复制的内容，没有先获取标签
    document.body.appendChild(input); //将input添加的document中
    input.select(); //选择input框中的所有文本
    document.execCommand("Copy"); //复制input中的内容到剪切版
    input.style.display = "none"; //隐藏input
    document.body.removeChild(input); //移除input
    if (document.execCommand("Copy")) {
      showSuccessToast("Copy Link Success");
    } else {
      showFailToast("Copy Link Error");
    }
  };

  const getProductCommissionFn = () => {
    getProductCommission().then((res) => {
      pageData.recommendationData = res.data;
    });
    getProductActivationApi().then((res) => {
      pageData.commissionConfigData = res.data;
    });
  };

  // 多语言切换
  // const changeLanguage = () => {
  //   changeLanguageApi({ lang: "en_US" });
  // };

  return {
    goProductDetailPage,
    goPage,
    showPopup,
    initCountInfo,
    getInvitionCode,
    copyLink,
    getProductList,
    exchangeSubmit,
    getIsShowNotice,
    getJumpUrl,
    linkTo,
    getProductCommissionFn,
    getCountlevelName,
    // changeLanguage,
  };
};

const {
  countInfoData,
  invitionUrl,
  productList,
  exchangeCode,
  readData,
  recommendationData,
  commissionConfigData,
  vipMapping
} = useData();
const {
  goPage,
  showPopup,
  initCountInfo,
  getInvitionCode,
  copyLink,
  getProductList,
  exchangeSubmit,
  getIsShowNotice,
  getJumpUrl,
  getProductCommissionFn,
  linkTo,
  goProductDetailPage,
  getCountlevelName,
  // changeLanguage,
} = useMethods();
onMounted(() => {
  getInvitionCode();
  initCountInfo();
  getProductList();
  getIsShowNotice();
  getJumpUrl();
  getProductCommissionFn();
  // changeLanguage()
});
</script>

<style lang="less" scoped>
.home-index {
  position: relative;
  padding: 17px 15px;
  min-height: 100vh;
  background: @default-bg-color;
  box-sizing: border-box;
  // .personal-info {
  //   height: 60px;
  //   display: flex;
  //   align-items: center;
  //   margin-bottom: 16px;
  //   .avatar-box {
  //     width: 60px;
  //     height: 60px;
  //     line-height: 60px;
  //     text-align: center;
  //     margin-right: 15px;
  //     .avatar {
  //       max-width: 100%;
  //     }
  //   }
  //   .account-info {
  //     flex: 1;
  //     height: 100%;
  //     display: flex;
  //     flex-direction: column;
  //     justify-content: space-between;
  //     .info-top {
  //       display: flex;
  //       align-items: center;
  //       .name {
  //         display: inline-block;
  //         margin-right: 10px;
  //         font-family: PingFangSC, PingFang SC;
  //         font-weight: 500;
  //         font-size: 22px;
  //         color: #ffffff;
  //         line-height: 30px;
  //         text-align: right;
  //         font-style: normal;
  //       }
  //       .level {
  //         display: inline-block;
  //         height: 24px;
  //         line-height: 24px;
  //         padding: 0 7px;
  //         color: #fff;
  //         background-color: #3fc186;
  //         border-radius: 12px;
  //         font-size: 14px;
  //       }
  //     }
  //   }
  // }
  .assets-card {
    background: url("/src/assets/images/home/card-bg.png") no-repeat;
    background-size: contain;
    justify-content: space-between;
    padding: 18px 24px 24px 24px;
    box-sizing: border-box;
    width: 100%;
    height: 212px;
    margin-bottom: 14px;
    // background: rgba(36, 36, 36, 0.7);
    border-radius: 16px;
    // border: 1px solid #ccc;
    .assets-top {
      flex: 1;
      display: flex;
      .icon-box {
        margin-right: 9px;
        width: 20px;
        height: 22px;
        img {
          width: 100%;
        }
      }
      .assets-content {
        flex: 1;
        .title {
          font-family: PingFangSC, PingFang SC;
          font-weight: 500;
          font-size: 18px;
          color: #ffffff;
          line-height: 25px;
          font-style: normal;
          margin-bottom: 8px;
        }
        .assets-num {
          font-family: PingFangSC, PingFang SC;
          font-weight: 500;
          font-size: 24px;
          color: #ffb711;
          line-height: 33px;
          text-align: left;
          font-style: normal;
          margin-bottom: 16px;
        }
        .extractable-tip {
          color: #afafaf;
          font-size: 16px;
          .value {
            color: #fff;
            margin-left: 5px;
          }
        }
      }
      .record-box {
        width: 48px;
        height: 48px;
      }
    }
    .assets-btn-box {
      display: flex;
      justify-content: space-between;
      height: 44px;
      .btn {
        width: 140px;
        height: 44px;
        line-height: 44px;
        text-align: center;
        color: #fff;
        font-size: 16px;
        background: rgba(63, 193, 134, 0.3);
        border-radius: 29px;
      }
    }
  }
  .product-card {
    width: 347px;
    // height: 516px;
    background: url("/src/assets/images/home/product-card-bg.png") no-repeat;
    background-size: 100% 100%;
    padding: 20px 12px;
    box-sizing: border-box;
    border-radius: 16px;
    margin-bottom: 14px;
    .product-item {
      border-bottom: 1px solid #494848;
      &:last-of-type {
        border: none;
      }
      .content {
        padding: 22px 0 17px 0;
      }
      .item-top {
        display: flex;
        // height: 85px;
        // margin-bottom: 23px;
        .product-img-box {
          position: relative;
          width: 85px;
          height: 85px;
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
              margin-bottom: 10px;
              .value {
                font-weight: 700;
              }
            }
          }
        }
      }
      .item-bottom {
        display: flex;
        justify-content: space-between;
        .label {
          font-size: 14px;
          color: #ffffff;
          line-height: 20px;
        }
        .value {
          font-family: PingFangSC, PingFang SC;
          font-weight: 500;
          font-size: 16px;
          color: #ffb711;
          line-height: 22px;
          text-align: center;
        }
      }
    }
  }
  .invitation-card {
    width: 347px;
    // height: 681px;
    background: url("/src/assets/images/home/invitation-card-bg.png") no-repeat;
    // background-size: contain;
    background-size: 100% 100%;
    padding: 16px 25px 25px 25px;
    box-sizing: border-box;
    border-radius: 16px;
    .rewards-title {
      display: flex;
      align-items: center;
      margin-bottom: 24px;
      .icon {
        width: 24px;
        height: 24px;
        margin-right: 8px;
      }
      .text {
        font-weight: 500;
        font-size: 18px;
        color: #ffffff;
        line-height: 25px;
      }
    }
    .link-wrap {
      margin-bottom: 25px;
      .link-show-box {
        background: rgba(0, 0, 0, 0.22);
        border-radius: 8px;
        border: 1px solid rgba(200, 200, 200, 0.3);
        padding: 16px;
        box-sizing: border-box;
        margin-bottom: 8px;
        .link {
          font-weight: 500;
          font-size: 16px;
          color: #29513f;
          line-height: 22px;
          word-break: break-all;
          margin-bottom: 16px;
        }
        .copy-btn {
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
        // border-image: linear-gradient(
        //     180deg,
        //     rgba(200, 200, 200, 0.3),
        //     rgba(151, 151, 151, 0.19)
        //   )
        //   1 1;
      }
      .tip {
        font-size: 12px;
        color: #afafaf;
        line-height: 17px;
      }
    }
    .recommendation-box {
      .item {
        display: flex;
        justify-content: space-between;
        margin-bottom: 16px;
        .icon-box {
          width: 18px;
          margin-right: 11px;
        }
        .recommendation-content-box {
          .title {
            font-family: PingFangSC, PingFang SC;
            font-weight: 500;
            font-size: 16px;
            color: #ffffff;
            line-height: 22px;
            margin-bottom: 8px;
          }
          .recommendation-content {
            font-family: PingFangSC, PingFang SC;
            font-size: 14px;
            color: #afafaf;
            line-height: 20px;
          }
        }
      }
      .invitation-btn-box {
        padding-top: 8px;
        .btn {
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 168px;
          height: 44px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 22px;
          border: 1px solid rgba(115, 115, 115, 1);
          font-size: 16px;
          color: #ffffff;
          line-height: 22px;
        }
      }
    }
  }
  .qrcode-box {
    position: absolute;
    right: 0;
    top: 20px;
    width: 49px;
    height: 43px;
  }
  .online-customer {
    position: fixed;
    right: 0px;
    bottom: 120px;
  }
}
.channel-cont {
  padding: 40px 16px 30px 16px;
  .icon {
    width: 100%;
    height: 90px;
    // background-color: skyblue;
    margin-bottom: 20px;
    img{
      width: 100%;
    }
  }
  .text {
    font-weight: 700;
    font-size: 20px;
    text-align: center;
    color: #fff;
  }
}
.bottom-cont {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 15px;
  .link-item {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0 40px;
    box-sizing: border-box;
    height: 92px;
    background: rgba(0, 0, 0, 0.22);
    border-radius: 16px;
    border: 1px solid rgba(200, 200, 200, 0.3);
    .img {
      width: 42px;
      margin-right: 17px;
    }
    .text {
      font-weight: 700;
      font-size: 18px;
      color: #ffffff;
    }
  }
}
.popup-cont {
  height: 100%;
  width: 100%;
  padding: 15px;
  .personal-info-box {
    display: flex;
    margin-bottom: 24px;
    .avatar-box {
      width: 60px;
      height: 60px;
      line-height: 60px;
      text-align: center;
      border-radius: 11px;
      .avatar {
        max-width: 100%;
      }
    }
    .info-box {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-left: 16px;
      .nick-name {
        font-weight: 500;
        font-size: 22px;
        color: #ffffff;
        line-height: 30px;
      }
      .level {
        .level-tag {
          display: inline-block;
          padding: 0 7px;
          height: 24px;
          line-height: 24px;
          text-align: center;
          background: #3fc186;
          border-radius: 12px;
          color: #fff;
          font-size: 14px;
        }
      }
    }
  }
  .menu-list {
    .menu-item {
      width: 100%;
      height: 64px;
      background: rgba(27, 27, 27, 0.4);
      border-radius: 16px;
      border: 1px solid #434343;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16px;
      padding: 0 20px;
      .item-left {
        display: flex;
        .icon {
          margin-right: 19px;
        }
        .text {
          font-size: 16px;
          color: #ffffff;
          line-height: 22px;
        }
      }
    }
  }
}
.exchange-cont {
  text-align: center;
  .title {
    text-align: center;
    font-weight: 700;
    font-size: 24px;
    color: #ffffff;
    line-height: 33px;
    font-style: normal;
    margin-bottom: 12px;
  }
  .sub-title {
    font-size: 12px;
    color: #ffffff;
    line-height: 17px;
    margin-bottom: 16px;
  }
  .input {
    box-sizing: border-box;
    border: none;
    outline: none;
    background-color: transparent;
    font-size: 16px;
    width: 100%;
    height: 52px;
    border-radius: 16px;
    border: 1px solid rgba(200, 200, 200, 0.3);
    padding-left: 14px;
    color: #fff;
    margin-bottom: 26px;
  }
  .btn-box {
    display: flex;
    .btn {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      color: #ffffff;
      line-height: 24px;
      font-weight: 700;
      &:last-of-type {
        color: #3fc186;
      }
    }
  }
}

.notice-cont {
  background-color: #fff;
  height: 100%;
  padding-bottom: 10px;
  .title {
    padding: 0 30px;
    text-align: center;
    color: #ae1942;
    font-size: 23px;
    word-break: break-all;
    margin-bottom: 30px;
  }
  .tip {
    padding: 0 6px;
    font-size: 14px;
    margin-bottom: 30px;
    word-break: break-all;
    color: #000;
    max-height: 200px;
    overflow-y: auto;
  }
  .cancel-btn-box {
    padding: 0 10px;
    .btn {
      width: 100%;
      height: 45px;
      line-height: 45px;
      text-align: center;
      color: #ae1942;
      border-radius: 10px;
      background-color: #f4ccd5;
      font-weight: 700;
    }
  }
}
/deep/.van-popup--center {
  border-radius: 8px;
  border: 1px solid rgba(151, 151, 151, 0.19);
  padding: 25px 15px 15px 15px;
}
</style>
