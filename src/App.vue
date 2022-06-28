<template>
  <div id="app">
    <nav-header v-if="route.meta.isHeader"></nav-header>
    <router-view class="router-view"> </router-view>
    <web-footer v-if="route.meta.isHeader"></web-footer>
  </div>
</template>

<script lang="ts">
import {
  reactive,
  onMounted,
  toRefs,
  h,
  getCurrentInstance,
  computed,
  ref,
  toRaw,
} from "vue";
import { useRoute} from "vue-router";
import navHeader from "@/components/Header.vue";
import webFooter from "@/components/Footer.vue";
export default {
  components: {
    navHeader,
    webFooter,
  },
  setup() {
    const route = useRoute();
    const state = reactive({
      date: [],
      count: 1,
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
      let res = calcul.value;
      console.log(toRaw(res));
    };
    const calcul = computed(() => {
      return state.dateName;
    });
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
    const open = (word: string) => {
      const {
        $notify,
      } = getCurrentInstance().appContext.config.globalProperties;
      $notify({
        title: "友情提示",
        message: h("span", { style: "color: teal" }, `Hey,现在是${word}了`),
        duration:1000
      });
    };
    return {
      route,
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss">
@import "./common/mixin.scss";
@import "./common/media.css";
html,
body {
  min-width: 320px;
  min-height: 100%;
  overflow-x: hidden;
  background: #f4f5f5;
  margin: 0;
  // overflow-y: scroll;
}
#app {
  display: flex;
  flex-direction: column;
}
.router-view {
  width: 100%;
  min-height: calc(100vh - 70px);
  // position: absolute;
  top: 0;
  bottom: 0;
  margin: 74px auto;
  -webkit-overflow-scrolling: touch;
}
.el-drawer, .d-area-drawer{
  overflow: scroll !important;
}
.video-js{
  height: 100% !important;
}

</style>
