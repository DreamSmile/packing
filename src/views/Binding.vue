<template>
  <div class="all">
    <div class="photo"></div>
    <div class="content">
      <div class="input_box">
        <h2>请输入车牌</h2>
        <div class="inps flex_between" @click="showKeyBoard=true">
          <span class="flex_center">{{proinces}}</span>
          <span class="flex_center">{{letters}}</span>
          <div class="spot"></div>
          <span class="flex_center" v-for="(item ,i) in showList" :key="i">{{item}}</span>
        </div>
      </div>
      <div class="notice_bar">注意事项：请输入正确无误的车牌号，否则有可能将无法正常使用停车优惠时长</div>
      <button class="sure" @click="goResult">确认绑定</button>
    </div>
    <!-- 键盘 -->
    <div class="keyboard" v-show="showKeyBoard">
      <!-- 省 -->
      <div class="proinces flex_between" v-show="showKey=='proinces'">
        <button class="keys" @click="keyenter('proinces',item)" v-for="(item,i) in provinceList" :key="i">{{item}}</button>
        <button class="del_icon" @click="showKeyBoard=false">↓</button>
        <button class="del_icon" @click="del">×</button>
      </div>
      <div class="letters flex_between" v-show="showKey=='letters'">
        <button class="letter" @click="keyenter('letters',item)" v-for="(item,i) in lettersList" :key="i">{{item}}</button>
        <button class="del_icon" @click="showKeyBoard=false">↓</button>
        <button class="del_icon" @click="del">×</button>
      </div>
      <div class="nums flex_between" v-show="showKey=='nums'">
        <button class="num" @click="keyenter('nums',j)" v-for="(items,j) in 10" :key="j+'J'">{{j}}</button>
        <button class="nums" @click="keyenter('nums',item)" v-for="(item,i) in lettersList" :key="i">{{item}}</button>
        <button class="del_icon" @click="showKeyBoard=false">↓</button>
        <button class="del_icon" @click="del">×</button>
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
.all {
  height: 100%;
  background-color: #f8f8f8;
}
.photo {
  width: 100%;
  height: 30%;
  background-image: url("../assets/imgs/keyboard_bg.png");
  position: absolute;
  z-index: 1;
  max-width: 540px;
}
.content {
  padding: 150px 20px 0;
  margin: auto;
  z-index: 2;
  position: relative;
}
.input_box {
  padding: 0 20px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0px 2px 8px 0px rgba(174, 174, 174, 0.1);
  height: 144px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  h2 {
    text-align: center;
  }
  .inps {
    span {
      background: #fbfffd;
      border-radius: 1px 0px 0px 1px;
      border: 1px solid #b8e6d0;
      height: 38px;
      max-width: 36px;
      width: 14%;
    }
    .spot {
      height: 3px;
      width: 3px;
      border-radius: 50%;
      background-color: #6de0bd;
    }
  }
}
.sure {
  background-color: #6de0bd;
  border-radius: 20px;
  color: #fff;
  font-weight: 600;
  height: 40px;
  width: 100%;
}
.notice_bar {
  line-height: 18px;
  color: #ff9824;
  font-size: 12px;
  background-color: #ffead1;
  border-radius: 4px;
  padding: 6px 18px;
  margin: 16px 0 26px 0;
}
// 键盘
.keyboard {
  background-color: #d1d6dc;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px 6px;
  max-width: 540px;
  margin: auto;
  z-index: 3;
  .proinces {
    flex-wrap: wrap;
  }

  .del_icon {
    flex: 1;
  }
  button {
    background-color: #fefefe;
    border-radius: 6px;
    color: #545454;
    height: 50px;
    width: 32px;
    margin: 7px 3px;
  }
}
</style>
<script>
import { showToast } from "../utils/tools";
export default {
  data() {
    return {
      provinceList: [
        "京",
        "津",
        "沪",
        "渝",
        "翼",
        "豫",
        "云",
        "辽",
        "黑",
        "湘",
        "皖",
        "鲁",
        "新",
        "苏",
        "浙",
        "赣",
        "鄂",
        "桂",
        "甘",
        "晋",
        "蒙",
        "陕",
        "吉",
        "闵",
        "贵",
        "粤",
        "青",
        "藏",
        "川",
        "宁",
        "琼",
        "使",
        "领",
        "警",
        "港",
        "澳",
        "学",
        "挂",
      ],
      lettersList: [
        "Q",
        "W",
        "E",
        "R",
        "T",
        "Y",
        "U",
        "I",
        "O",
        "P",
        "A",
        "S",
        "D",
        "F",
        "G",
        "H",
        "J",
        "K",
        "L",
        "Z",
        "X",
        "C",
        "V",
        "B",
        "N",
        "M",
      ],
      showList: new Array(5), //车牌数字
      showKeyBoard: true, //是否展示键盘
      showKey: "proinces", //展示省还是英文
      proinces: "", //省
      letters: "", //英文
    };
  },
  mounted() {
    console.log(this.$route.query);
  },
  methods: {
    //   确认绑定，跳转到成功结果界面
    goResult() {
      if (!this.showList[this.showList.length - 1]) {
        showToast("请填写完整车牌号", { duration: 2000 });
        return;
      }
      this.$router.push({
        path: "/result",
        query: {
          brand: `${this.proinces}${this.letters}•${this.showList
            .toString()
            .replace(/,/g, "")}`,
        },
      });
    },
    //   键盘按下
    keyenter(type, val) {
      if (type == "proinces") {
        this.proinces = val;
        this.showKey = "letters";
      } else if (type == "letters") {
        this.letters = val;
        this.showKey = "nums";
      } else {
        if (this.showList[this.showList.length - 1]) return;
        for (let i = 0; i < this.showList.length; i++) {
          if (!this.showList[i]) {
            this.$set(this.showList, i, val);
            if (i == this.showList.length - 1) {
              //当输入最后位置的时候，键盘下移
              this.showKeyBoard = false;
            }
            return;
          }
        }
      }
    },
    // 删除
    del() {
      if (this.showList[0]) {
        for (let i = 4; i > -1; i--) {
          if (this.showList[i]) {
            this.$set(this.showList, i, "");
            return;
          }
        }
        return;
      }
      if (this.letters) {
        this.letters = "";
        this.showKey = "letters";
        return;
      }
      if (this.proinces) {
        this.proinces = "";
        this.showKey = "proinces";
      }
    },
    // 键盘隐藏
    keyDown() {
      this.showKey = "";
    },
  },
};
</script>