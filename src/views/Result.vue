<template>
  <!-- 绑定车牌是否成功 -->
  <div class="result flex_center">
    <img :src="require('../assets/imgs/result.png')">
    <p class="title">车牌号绑定成功</p>
    <p class="msg">当前绑定的车牌号为：{{$route.query.brand}}</p>
    <button @click="define">知道了</button>
  </div>
</template>
<script>
export default {
  mounted() {
    console.log(this.$route);
  },
  methods: {
    define() {
      this.$router.replace({ path: "/code" });
    },
  },
};
</script>
<style scoped lang="less">
.result {
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 0 20px;
}
img {
  width: 106px;
  height: 106px;
}
.title {
  font-size: 16px;
  line-height: 22px;
  color: #292929;
  margin: 16px 0 10px 0;
}
.msg {
  font-weight: 500;
  line-height: 20px;
  color: #adadad;
}
button {
  background-color: #6de0bd;
  border-radius: 20px;
  width: 100%;
  color: #fff;
  height: 40px;
  margin-top: 100px;
}
</style>