<template>
  <div class="home">
    <!-- 顶部标题 -->
    <header class="photo" :style="{backgroundImage:'url('+$assetsUrl+'page_bg.png)'}">
      <div class="title">
        <img :src="$assetsUrl+'parking.png'">
        <div class="name">
          <p class="CN">利郎创意园停车管理系统</p>
          <p class="ENG">Parking Management S</p>
        </div>
      </div>
      <div class="logo">
        <img :src="$assetsUrl+'lilanz_logo.png'" />
      </div>
    </header>
    <!-- 主要显示区 -->
    <div class="content">
      <div class="item" v-for="(item ,i) in 6" :key="i" @click="goCode">
        <!-- <div class="icon"></div> -->
        <img :src="$assetsUrl+'coupon.png'" />
        <div class="item_name">
          <p>停车优惠券</p>
          <p>Packing Coupon</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Home",
  components: {},
  methods: {
    goCode() {
      this.$router.push({ name: "Code" });
    },
  },
};
</script>
<style scoped lang="less">
.home {
  height: 100%;
}
header {
  height: 250px;
  position: relative;
  .title {
    margin-left: 20px;
    display: flex;
    padding-top: 80px;
    img {
      width: 30px;
      margin-right: 14px;
    }
    .name {
      .CN {
        font-size: 18px;
        font-weight: 600;
      }
    }
  }
  .logo {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    width: 140px;
    height: 30px;
    border-radius: 30px 30px 0 0;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    img {
      width: 60px;
    }
  }
}
.content {
  padding: 14px 14px 0 14px;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  height: calc(100% - 250px);
  overflow: auto;
  .item {
    text-align: center;
    background-color: #f7fbfa;
    border: 1px solid #d5e1df;
    border-radius: 8px;
    width: 48%;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 12px;
    img {
      width: 60px;
      margin: 0 auto;
    }
    .item_name {
      margin-top: 20px;
      p:first-child {
        font-size: 16px;
      }
      p:last-child {
        color: #888888;
        font-size: 12px;
        margin-top: 12px;
      }
    }
  }
}
</style>


