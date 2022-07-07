<template>
  <div class="screen-container">
    <button class="btn" @click="scrollMenu()">滚动</button>
    <div class="center-container">
      <div class="three-menu-container">
        <div class="left-container">
          <div class="left-top">
            <img src="../assets/imgs/index-screen/zygl_default.png" alt="" />
          </div>
          <div class="left-bottom">
            <img src="../assets/imgs/index-screen/aqjg_default.png" alt="" />
          </div>
        </div>
        <div class="right-container">
          <img src="../assets/imgs/index-screen/ssdt_active.png" alt="" />
        </div>
      </div>
      <div class="center-circle">
        <div class="center-menu-container">
          <div class="center-logo">
            <img src="../assets/imgs/index-screen/logo.png" alt="" />
          </div>
          <div class="screen-title">市县分智慧文旅平台</div>
        </div>
      </div>
    </div>
    <div class="right-list-container bg-img" v-if="isShow">
      <div
        class="menu-item-container"
        v-for="(item, index) in menuList"
        :key="index"
      >
        <div
          class="max-width-item"
          v-if="(index + 1) % 4 == 1"
          :style="{ transform: listTransform, transition: listTransition }"
        >
          <div class="bg-img-container">
            <img src="../assets/imgs/index-screen/max_right_top.png" alt="" />
          </div>
        </div>
        <div class="max-width-item second-menu" v-if="(index + 1) % 4 == 2">
          <div class="bg-img-container">
            <img
              src="../assets/imgs/index-screen/second_right_top.png"
              alt=""
            />
          </div>
        </div>
        <div class="max-width-item third-menu" v-if="(index + 1) % 4 == 3">
          <div class="bg-img-container">
            <img src="../assets/imgs/index-screen/third_right_top.png" alt="" />
          </div>
        </div>
        <div class="max-width-item four-menu" v-if="(index + 1) % 4 === 0">
          <div class="bg-img-container">
            <img src="../assets/imgs/index-screen/four_right_top.png" alt="" />
          </div>
        </div>
      </div>
    </div>
    <div class="right-list-container content">
      <div
        class="menu-item-container"
        v-for="(item, index) in menuList"
        :key="index"
      >
        <div
          class="max-width-item"
          v-if="(index + 1) % 4 == 1"
          :style="{ transform: listTransform, transition: listTransition }"
        >
          <div
            class="menu-logo-container"
            :style="{ transform: itemTransform, transition: itemTransition }"
          >
            <div class="logo-top">
              <img src="../assets/imgs/index-screen/sskl.svg" alt="" />
            </div>
            <div class="logo-bottom">
              <img src="../assets/imgs/index-screen/dz.png" alt="" />
            </div>
          </div>
          <div class="menu-name">{{ item.name }}</div>
        </div>
        <div class="max-width-item second-menu" v-if="(index + 1) % 4 == 2">
          <div class="menu-logo-container">
            <div class="logo-top">
              <img src="../assets/imgs/index-screen/sskl.svg" alt="" />
            </div>
            <div class="logo-bottom">
              <img src="../assets/imgs/index-screen/dz.png" alt="" />
            </div>
          </div>
          <div class="menu-name">{{ item.name }}</div>
        </div>
        <div class="max-width-item third-menu" v-if="(index + 1) % 4 == 3">
          <div class="menu-logo-container">
            <div class="logo-top">
              <img src="../assets/imgs/index-screen/sskl.svg" alt="" />
            </div>
            <div class="logo-bottom">
              <img src="../assets/imgs/index-screen/dz.png" alt="" />
            </div>
          </div>
          <div class="menu-name">{{ item.name }}</div>
        </div>
        <div class="max-width-item four-menu" v-if="(index + 1) % 4 === 0">
          <div class="menu-logo-container">
            <div class="logo-top">
              <img src="../assets/imgs/index-screen/sskl.svg" alt="" />
            </div>
            <div class="logo-bottom">
              <img src="../assets/imgs/index-screen/dz.png" alt="" />
            </div>
          </div>
          <div class="menu-name">{{ item.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
const isShow = ref(false);
let listTransition = ref("");
let listTransform = ref("");
let itemTransition = ref("");
let itemTransform = ref("");
let index = 0;

let menuList = ref([
  { name: "实时动态" },
  { name: "实时客流" },
  { name: "景区监控" },
  { name: "城市访客" },
  { name: "1" },
  { name: "2" },
]);
const scrollMenu = () => {
  // const firstItem = menuList.value[0];
  // const spliceItem = menuList.value.splice(0, 1);
  // menuList.value.push(firstItem);
  // menuList = menuList;
  // console.log("menuList", menuList);
  // listTransform.value = "translate(55px,173px)";
  index++;
  // let demo = 3;
  // listTransform.value = `translateY(${demo * 173}px)`;
  // listTransition.value = "all 2s linear";
  // itemTransform.value = `translateX(0px)`;
  // itemTransition.value = "all 0.5s linear";
  switch (index) {
    case 1:
      listTransform.value = `translateY(${index * 173}px)`;
      listTransition.value = "all 0.5s linear";

      itemTransform.value = `translateX(${index * 55}px)`;
      itemTransition.value = "all 0.5s linear";
      break;
    case 2:
      listTransform.value = `translateY(${index * 173}px)`;
      listTransition.value = "all 0.5s linear";
      itemTransform.value = `translateX(50px)`;
      itemTransition.value = "all 0.5s linear";
      break;
    case 3:
      listTransform.value = `translateY(${index * 173}px)`;
      listTransition.value = "all 0.5s linear";
      itemTransform.value = `translateX(0px)`;
      itemTransition.value = "all 0.5s linear";
      break;
    default:
      break;
  }
};
const autoScrool = () => {
  // setInterval(() => {
  //  scrollMenu()
  // }, 2000);
};
onMounted(() => {
  // autoScrool();
});
</script>

<style lang="scss" scoped>
img {
  width: 100%;
  height: 100%;
  display: block;
  flex-shrink: 0;
}
.btn {
  width: 100px;
  height: 80px;
  position: absolute;
  top: 20px;
}
.screen-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url("../assets/imgs/index-screen/bg.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: relative;
}

.center-container {
  width: 674px;
  height: 645px;
  border: 1px solid red;
  position: relative;
}

.three-menu-container {
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  .left-container {
    width: 50%;
    height: 100%;
    .left-top {
      width: 100%;
      height: 426px;
      border: 1px solid red;
    }
    .left-bottom {
      width: 50%;
      height: 276px;
      border: 1px solid red;
      position: absolute;
      bottom: 0;
    }
  }
  .right-container {
    width: 50%;
    height: 100%;
    border: 1px solid red;
  }
}

.center-circle {
  width: 432px;
  height: 432px;
  position: absolute;
  left: 50%;
  top: 56%;
  transform: translate(-50%, -50%);
  background-image: url("../assets/imgs/index-screen/center_border.png");
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  .center-menu-container {
    width: 378px;
    height: 378px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: -17px;
    background-image: url("../assets/imgs/index-screen/center.png");
    background-repeat: no-repeat;

    .center-logo {
      width: 131px;
      height: 110px;
      border: 1px solid red;
    }
    .screen-title {
      width: 232px;
      font-family: YouSheBiaoTiHei;
      font-size: 42px;
      color: #ffffff;
      letter-spacing: 0;
      text-align: center;
      text-shadow: 0 0 7px #563407;
      font-weight: 400;
      margin-top: 10px;
    }
  }
}

.right-list-container {
  height: 674px;
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 164px;
  overflow: hidden;
  border: 1px solid red;
  // transition: 0.5s all cubic-bezier(0.14, -1.33, 1, 0.18);

  .menu-item-container:last-child {
    margin-bottom: 0px;
  }
}
.menu-item-container {
  width: 696px;
  margin-bottom: 18px;
  justify-content: flex-end;
  display: flex;
  // animation: runX 2s  infinite cubic-bezier(0.66, 0.01, 1, 1) forwards;

  .max-width-item {
    width: 696px;
    height: 155px;
    display: flex;
    align-items: center;
    position: relative;
    // position: absolute;
    // animation: runY 2s infinite cubic-bezier(0, 0, 0.36, 1) forwards;

    .bg-img-container {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
    }

    .menu-name {
      font-family: MicrosoftYaHei-Bold;
      font-size: 34px;
      color: #27757d;
      letter-spacing: 0;
      font-weight: 700;
    }
  }
}
.menu-logo-container {
  width: 144px;
  height: 108px;
  margin-left: 248px;
  margin-right: 26px;
  position: relative;
  display: flex;
  justify-content: center;
  .logo-top {
    width: 48px;
    height: 48px;
    position: absolute;
    top: 18px;
  }
  .logo-bottom {
    width: 100%;
    height: 100%;
  }
}

.second-menu {
  width: 485px !important;
  .menu-logo-container {
    margin-left: 91.5px;
  }
}

.third-menu {
  width: 485px !important;
  .menu-logo-container {
    margin-left: 91.5px;
  }
}
.four-menu {
}

@keyframes runX {
  0% {
    transform: translateX(0px);
  }
  50% {
    transform: translateX(50px);
  }
  100% {
    transform: translateX(0px);
  }
}

@keyframes runY {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(280px);
  }
  100% {
    transform: translateY(560px);
  }
}
</style>
