<template>
  <div class="code photo" :style="{backgroundImage:'url('+$assetsUrl+'bg.png)'}">
    <img class="parking_logo" :src="$assetsUrl+'parking_name.png'" />
    <div class="content photo" :style="{backgroundImage:'url('+$assetsUrl+'code_bg.png)'}">
      <div class="main">
        <div class="name">
          <p>分享二维码</p>
          <p>将此二维码分享给好友领取停车时长</p>
        </div>
        <canvas id="code_img" class="code_img"></canvas>
        <p class="time">二维码失效时间：2021-08-11 16:23:11</p>
      </div>
      <div class="btns flex_between">
        <span class="flex_center">刷新</span>
        <span class="share flex_center" @click="llAppShare">分享</span>
      </div>
    </div>
  </div>
</template>
<script>
import QRCode from "qrcode";
import { showToast, showDialog } from "../utils/tools";
import { getWxInfo } from "../utils/apis";
export default {
  components: { QRCode },
  data() {
    return {
      wxinfo: {},
    };
  },
  mounted() {
    showToast("请稍等。。", { type: "loading" });
    this.setCode();
    this.getWXInfoFun();
    llApp.init();
    // this.initShare(); //微信分享
  },
  methods: {
    // 获得微信要分享需要的东西
    getWXInfoFun() {
      getWxInfo({
        action: "getWXJSsignature",
        parameter: {
          configkey: 5,
          url: window.location.href.replace("\/#", ""), //("\/#", "")要写这样的，不然会出错
        },
      })
        .then((res) => {
          this.$toast.clear();
          console.log(res);
          if (res.errcode != 0) {
            showToast("界面出现错误不允许分享", { duration: 3000 });
            return;
          }
          this.wxinfo = res.data;
          this.initShare();
        })
        .catch((err) => {
          this.$toast.clear();
          showDialog(err+this.$route);
        });
    },
    llAppShare() {
      //init支持链式写法理理论可以写很多层
      llApp
        .init()
        .then(function (res) {})
        .catch(function (err) {
          this.$toast.fail(err);
        });
      let {origin} =window.location
      let thumb = `http://tm.lilanz.com/qywx/res/img/appicons/v2/coupon.png`;
      let title = `LILANZ`;
      let desc = `\r\n利郎停车场优惠券\r\n利郎总部创意园\r\n福建晋江市长兴路200号`;
      let url = `${origin}#/binding`;
      llApp.ShareLinkToWeiXin(url, title, desc, thumb, "friend");
    },
    //  微信分享初始化
    initShare() {
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: this.wxinfo[0], // 必填，公众号的唯一标识，填自己的！
        timestamp: this.wxinfo[1], // 必填，生成签名的时间戳，刚才接口拿到的数据
        nonceStr: this.wxinfo[2], // 必填，生成签名的随机串
        signature: this.wxinfo[3], // 必填，签名，见附录1
        jsApiList: [
          "checkJsApi",
          "onMenuShareTimeline",
          "onMenuShareAppMessage",
          "showMenuItems",
          "updateAppMessageShareData",
        ], // 必填，需要使用的JS接口列表。
      });
      wx.ready(() => {
        //需在用户可能点击分享按钮前就先调用
        let {origin} =window.location;
        // 好友
        wx.updateAppMessageShareData({
          title: "LILANZ", // 分享标题
          desc: `\r\n利郎停车场优惠券\r\n利郎总部创意园\r\n福建晋江市长兴路200号`, // 分享描述
          link: `${origin}#/binding`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl:
            "http://tm.lilanz.com/QYWX/Test/LMTest/assets/img/lilanzLogo/lilanz.png", // 分享图标
          success: function () {},
        });
        wx.error(function (res) {});
      });
    },
    // 分享
    goPage() {
      this.$router.replace("Binding");
    },
    // 生成二维码
    setCode() {
      let { origin } = window.location;
      let ops = {
        text: `XXX`,
        width: document.body.clientWidth * 0.58,
        height: document.body.clientWidth * 0.58,
        margin: 0,
      };
      QRCode.toCanvas(
        document.getElementById("code_img"),
        `${origin}/#/binding?isShow=true`,
        ops,
        function (error) {
          if (error) showToast("二维码生成失败！", { duration: 3000 });
        }
      );
    },
  },
};
</script>
<style scoped lang="less">
.code {
  height: 100%;
  width: 100%;
  padding: 0 22px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
}
.parking_logo {
  width: 100%;
  margin: auto;
  margin-top: 36px;
  margin-bottom: 30px;
}
.content {
  border-radius: 8px;
  width: 100%;
  .main {
    text-align: center;
    .name {
      padding-top: 40px;
      p:first-child {
        font-size: 18px;
        font-weight: 600;
        color: #202d33;
      }
      p:last-child {
        font-size: 16px;
        color: #686868;
        margin: 6px 0 24px 0;
      }
    }
    .code_img {
      width: 190px;
      height: 190px;
      max-width: 350px;
      max-height: 350px;
      background-color: aquamarine;
      margin: auto;
    }
    .time {
      margin: 10px 0 62px 0;
    }
  }
  .btns {
    height: 46px;
    position: relative;
    span {
      width: 50%;
      text-align: center;
    }
    .share {
      color: #99d6f3;
    }
  }
  .btns::before {
    content: "";
    height: 1px;
    width: 100%;
    background-color: rgba(230, 230, 230, 0.6);
    position: absolute;
    top: 0;
  }
}
</style>