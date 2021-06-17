<template>
  <div id="app">
    <router-view class="router-view"> </router-view>
  </div>
</template>

<script lang="ts">
import { reactive, onMounted, toRefs, h, getCurrentInstance } from "vue";

export default {
  setup() {
    const state = reactive({
      date: [],
      dateName: [
        { name: "凌晨", start: 1, end: 4 },
        { name: "早上", start: 5, end: 10 },
        { name: "中午", start: 11, end: 12 },
        { name: "下午", start: 13, end: 15 },
        { name: "黄昏", start: 16, end: 18 },
        { name: "晚上", start: 19, end: 21 },
        { name: "深夜", start: 22, end: 0 },
      ],
    });
    onMounted(() => {
      document.dispatchEvent(new Event("render-event"));
      init();
    });
    const init = () => {
      getTime();
    };
    const getTime = () => {
      let hour = new Date().getHours();
      let timeArr = state.dateName.map((item) => item.start);
      const index = findIndex(0, timeArr.length - 1, timeArr, hour);
      const word = state.dateName[index].name;
      open(word);
    };

    const findIndex = (low, high, arr, val) => {
      let mid = Math.floor((low + high) / 2);
      let midVal = arr[mid];
      if (midVal == val) return mid;
      if (low > high) {
        return low - 1;
      }
      if (midVal > val) {
        high = mid - 1;
        return findIndex(low, high, arr, val);
      } else if (midVal < val) {
        low = mid + 1;
        return findIndex(low, high, arr, val);
      }
    };
    const open = (word:string) => {
      const {
        $notify,
      } = getCurrentInstance().appContext.config.globalProperties;
      $notify({
        title: "友情提示",
        message: h(
          "span",
          { style: "color: teal" },
          `Hey,现在是${word}了`
        ),
      });
    };
    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss">
html,
body {
  height: 100%;
  overflow-x: hidden;
  // overflow-y: scroll;
}
#app {
  height: 100%;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
}
.router-view {
  width: 100%;
  height: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: 0 auto;
  -webkit-overflow-scrolling: touch;
}
</style>
