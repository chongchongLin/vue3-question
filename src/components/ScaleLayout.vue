
<template>
  <div class="grid-container">
    <div class="bg-img">
      <img :src="bgImg" alt="" />
    </div>
    <header class="nav-bar">
      <img src="@/assets/imgs/header.svg" alt="" />
    </header>
    <div class="container">
      <div
        class="left-container"
        ref="bArea"
        @click="setBArea"
        :class="bAreaBtn == '靠右' ? 'right-pos' : ''"
      >
        <!-- <img :src="listImg" alt=""> -->
        <div class="left-box" :style="{ backgroundImage: `url(${listImg})` }">
          <div class="left-top-container">
            <div class="left-title">视频监控</div>
            <div class="btn-group">
              <div
                class="left-btn"
                :style="{ background: `url(${btnDefault})` }"
              >
                售票处
              </div>
            </div>
            <div class="serach-ipt">
              <span class="ipt-icon">
                <img src="@/assets/imgs/icon-search.svg" alt="" />
              </span>
              <input type="text" class="ipt" placeholder="搜索景区名称" />
            </div>
          </div>
          <div class="left-bottom-container">
            <div class="monitor-list">
              <div
                class="monitor-item"
                v-for="(item, index) in monitorList"
                :key="index"
                @click="fillMointor(item, $event)"
              >
                <span class="monitor-icon">
                  <img src="@/assets/imgs/monitor-icon.svg" alt="" />
                </span>
                <span>{{ item.name }}</span>
              </div>
            </div>
            <div class="list-footer">
              <div class="page-info">
                <div class="page-size">
                  共
                  <span class="page-num">304</span>
                  个，
                </div>
                <div class="page-size">
                  第
                  <span class="cur-page">1</span>
                  /34页
                </div>
              </div>
              <div class="page-btns">
                <div class="page-btn">上一页</div>
                <div class="page-btn next-btn">下一页</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="d-area"
        ref="dArea"
        @click="setDArea"
        :class="bAreaBtn == '靠右' ? 'd-area-left' : ''"
      >
        <div class="width-scale">
          <div
            class="scale-item"
            :style="{ left: item + 'px' }"
            v-for="(item, index) in widthScaleList"
            :key="index"
          >
            <span>{{ item }}</span>
          </div>
        </div>
        <div class="height-scale">
          <div
            class="scale-item"
            :style="{ top: item + 'px' }"
            v-for="(item, index) in heightScaleList"
            :key="index"
          >
            <span>{{ item }}</span>
          </div>
        </div>
        <div class="grid-box" :class="[gridMode]" ref="gridBox">
          <div
            :ref="(el) => (domlist[index] = el)"
            class="grid-box-item"
            v-for="(item, index) in gridList"
            :key="item"
            :style="{
              background: item.color,
              width: item.width + 'px',
              height: item.height + 'px',
              left: item.left + 'px',
              top: item.top + 'px',
              fontSize: item.boxFontSize + 'px',
            }"
            :class="item.selected ? 'selected' : ''"
            @click="selectBox(item, $event, false)"
          >
            <div class="box-top">
              <div class="box-status"></div>
              <div class="box-title">{{ item.name }}</div>
              <div class="box-btn" @click="selectBox(item, $event, true)">
                编辑
              </div>
            </div>
            <div class="box-contaner">
              <div class="monitor-box">
                <video-player
                  class="monitor-video"
                  :playsinline="true"
                  :options="item.videoOption"
                  v-if="item.videoOption"
                  style="height: 100%"
                >
                </video-player>
              </div>
              <div class="monitor-info">
                <div class="moitor-name"></div>
                <div class="moitor-name"></div>
                <div class="moitor-name"></div>
                <div class="moitor-name safe-person"></div>
                <div class="moitor-name"></div>
                <div class="moitor-name safe-phone"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- B区域设置 -->
    <el-drawer
      title="B区域设置"
      v-model="bAreaLog"
      :direction="dAreaDirection"
      :before-close="handleClose"
      destroy-on-close
      ref="drawer"
    >
      <div class="b-area">
        <el-radio-group v-model="bAreaBtn">
          <el-radio-button
            :label="item.name"
            v-for="(item, index) in bAreaBtnList"
            :key="index"
          ></el-radio-button>
        </el-radio-group>
      </div>
    </el-drawer>
    <el-drawer
      title="D区域配置"
      v-model="dAreaLog"
      :direction="dAreaDirection"
      :before-close="handleClose"
      destroy-on-close
      ref="drawer"
      custom-class="d-area-drawer"
    >
      <div class="demo-drawer-content">
        <el-form :model="monitorTmp">
          <el-form-item
            label="设置模板"
            :label-width="formLabelWidth"
            class="info-size"
          >
          </el-form-item>
          <el-form-item
            label="监控数量:"
            :label-width="formLabelWidth"
            class="info-size"
          >
            <el-input v-model="monitorTmp.number" autocomplete="off"></el-input>
          </el-form-item>
          <div class="moitor-info">
            <el-form-item
              label="宽度:"
              :label-width="formLabelWidth"
              class="info-size"
            >
              <el-input
                @input="widthChange(monitorTmp)"
                v-model="monitorTmp.width"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="高度:"
              :label-width="formLabelWidth"
              class="info-size"
            >
              <el-input
                @input="heightChange(monitorTmp)"
                v-model="monitorTmp.height"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="X:"
              :label-width="formLabelWidth"
              class="info-size"
            >
              <el-input-number
                :min="0"
                v-model="monitorTmp.left"
                autocomplete="off"
              ></el-input-number>
            </el-form-item>
            <el-form-item
              label="Y:"
              :label-width="formLabelWidth"
              class="info-size"
            >
              <el-input-number
                :min="0"
                v-model="monitorTmp.top"
                autocomplete="off"
              ></el-input-number>
            </el-form-item>
            <el-form-item
              label="比例:"
              :label-width="formLabelWidth"
              class="info-size"
            >
              1920/1080 (16/9)
            </el-form-item>
          </div>
        </el-form>
        <div class="d-area-footer">
          <el-button @click="add" type="primary">新增</el-button>
          <el-button type="primary" @click="submit()" :loading="loading">{{
            loading ? "提交中 ..." : "确 定"
          }}</el-button>
          <el-button @click="cancelForm">取 消</el-button>
        </div>
      </div>
    </el-drawer>
    <el-drawer
      :title="selectInfo.name"
      v-model="dialog"
      :direction="direction"
      :before-close="handleClose"
      destroy-on-close
      ref="drawer"
    >
      <div class="demo-drawer-content">
        <el-form :model="selectInfo">
          <el-form-item
            label="宽度:"
            :label-width="formLabelWidth"
            class="info-size"
          >
            <el-input
              :disabled="true"
              @input="widthChange(selectInfo)"
              v-model="selectInfo.width"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="高度:"
            :label-width="formLabelWidth"
            class="info-size"
          >
            <el-input
              :disabled="true"
              @input="heightChange(selectInfo)"
              v-model="selectInfo.height"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="X:"
            :label-width="formLabelWidth"
            class="info-size"
          >
            <el-input-number
              :min="0"
              @input="xChange()"
              v-model="selectInfo.left"
              autocomplete="off"
            ></el-input-number>
          </el-form-item>
          <el-form-item
            label="Y:"
            :label-width="formLabelWidth"
            class="info-size"
          >
            <el-input-number
              :min="0"
              @input="yChange()"
              v-model="selectInfo.top"
              autocomplete="off"
            ></el-input-number>
          </el-form-item>
          <el-form-item
            label="倍数:"
            :label-width="formLabelWidth"
            class="info-size"
          >
            <el-input
              v-model="selectInfo.scale"
              autocomplete="off"
              @input="scaleChange()"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="比例:"
            :label-width="formLabelWidth"
            class="info-size"
          >
            1920/1080 (16/9)
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button @click="deleteBox">删除</el-button>
          <!-- <el-button
            type="primary"
            @click="submit(selectId)"
            :loading="loading"
            >{{ loading ? "提交中 ..." : "确 定" }}</el-button
          > -->
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import "videojs-contrib-hls";
import { reactive, toRefs, onMounted, toRaw, ref, watch, nextTick } from "vue";
import { ElMessageBox } from "element-plus";
import Header from "./Header.vue";
import Monitor from "./Monitor.vue";
import axios from "axios";
const btnList = [{ name: "3x2", id: 0 }];
//比例 16/9
export default {
  components: { Header, Monitor },
  setup() {
    const dArea = ref();
    const bArea = ref();
    const gridBox = ref(null);
    const domlist = ref([]);
    const num = ref(1);
    const state = reactive({
      bgImg: require("@/assets/imgs/bg.jpg"),
      listImg: require("@/assets/imgs/list.png"),
      btnDefault: require("@/assets/imgs/btn-default.png"),
      widthScaleList: [],
      heightScaleList: [],
      selectIndex: 0,
      monitorList: [],
      bAreaBtn: "靠左",
      bAreaBtnList: [
        {
          name: "靠左",
          pos: "left",
        },
        {
          name: "靠右",
          pos: "right",
        },
      ],
      monitorTmp: {
        selected: false,
        color: "",
        boxFontSize: 14,
        left: 0,
        width: 400,
        height: 225,
        top: 0,
        scale: 1,
        number: 1,
      },
      bAreaLog: false,
      dAreaLog: false,
      dAreaObj: {},
      timer: null,
      loading: false,
      dialog: false,
      formLabelWidth: "80px",
      selectInfo: {
        width: 0,
        height: 0,
        number: 1,
        top: 0,
        left: 0,
        boxFontSize: 14,
        scale: 1,
      },
      gridList: [],
      gridMode: "",
      selectId: "",
      drawer: false,
      lastSelect: {},
      direction: "rtl",
      dAreaDirection: "ltr",
    });
    const initPos = (doms) => {
      let domList = toRaw(doms.value);
      domList = domList.filter((item) => item);
      domList.forEach((item, index) => {
        const { x, y, width, height } = item.getBoundingClientRect();
        state.gridList[index] = {
          ...state.gridList[index],
          width,
          height,
          x,
          y,
        };
      });
    };
    const initList = (monitorObj) => {
      const { number, left, width, height, top, scale } = monitorObj;
      let array = [];
      for (let i = 0; i < number; i++) {
        array.push({
          id: i,
          selected: false,
          color: "",
          boxFontSize: 14,
          left,
          width,
          height,
          top,
          scale,
        });
      }
      return array;
    };

    const selectBox = (item, event, status) => {
      //阻止冒泡
      event.stopPropagation();
      state.gridList.forEach((child) => {
        if (item.id == child.id) {
          state.selectId = item.id;
          selectItemInfo(item.id, status);
          child.selected = true;
        } else {
          child.selected = false;
        }
      });
    };
    //选择单一宫格
    const selectItemInfo = (index, status) => {
      state.dialog = status ? true : false;
      let list = state.gridList;
      state.selectIndex = list.findIndex((item) => item.id == index);
      const res = list.find((item) => item.id == index);
      state.lastSelect = {
        width: res.width,
        height: res.height,
      };
      state.selectInfo = {
        width: res.width,
        height: res.height,
        name: `格子${index}号`,
        boxFontSize: res.boxFontSize,
        left: res.left,
        top: res.top,
        scale: res.width / 400,
      };
    };
    const xChange = () => {
      state.gridList[state.selectIndex].left = state.selectInfo.left;
    };
    const yChange = () => {
      state.gridList[state.selectIndex].top = state.selectInfo.top;
    };

    const setDArea = () => {
      state.dAreaLog = true;
    };
    //改变比例大小
    const scaleChange = () => {
      if (!state.selectInfo.scale) return;
      let selectItem = state.gridList[state.selectId];
      let { width, height, scale } = state.selectInfo;
      //暂定死值
      state.selectInfo.width = 400 * scale;
      state.selectInfo.height = 225 * scale;
      selectItem.scale = state.selectInfo.scale;

      selectItem.width = state.selectInfo.width;
      selectItem.height = state.selectInfo.height;
    };
    const widthChange = (boxObj) => {
      let scale = 9 / 16;
      const width = boxObj.width;
      let height = width * scale;
      boxObj.height = height;
    };
    const heightChange = (boxObj) => {
      let scale = 16 / 9;
      const height = boxObj.height;
      let width = height * scale;
      boxObj.width = width;
    };

    //确认
    const submit = () => {
      state.gridList = initList(state.monitorTmp);
      //更新选中位置信息
      nextTick(() => {
        initPos(domlist);
      });
      state.dAreaLog = false;
    };

    const cancelForm = () => {
      state.dialog = false;
      state.loading = false;
      clearTimeout(state.timer);
    };
    const handleClose = (done) => {
      done();
    };
    //删除格子
    const deleteBox = () => {
      state.gridList.splice(state.selectIndex, 1);
      state.monitorTmp.number -= 1;
      num.value = state.gridList.length;
      state.dialog = false;
    };

    const add = () => {
      state.dAreaLog = false;
      state.gridList.push({
        id: state.gridList.length,
        ...state.monitorTmp,
      });
      state.monitorTmp.number = Number(state.monitorTmp.number);
      state.monitorTmp.number += 1;
      // nextTick(() => {
      //   initPos(domlist);
      // });
    };
    const setBArea = () => {
      state.bAreaLog = true;
    };

    //初始化监控列表
    const initMonitorList = () => {
      axios
        .get(
          `api/cs_foreignscreen/api/queryMonitorInfoList?pageNum=1&pageSize=10&tagTap=&xzqh=320102&inputName=`
        )
        .then(({ data }) => {
          state.monitorList = data.data;
        });
    };
    //填充监控
    const fillMointor = (item, $event) => {
      let selectStatus = state.gridList.every((item) => item.selected == false);
      if (selectStatus) return;
      event.stopPropagation();
      console.log("item", item);
      // state.gridList[state.selectIndex] = {
      //   ...item,
      //   ...state.gridList[state.selectIndex],
      // };
      state.gridList[state.selectIndex].name = item.name;
      console.log("itemLast", state.gridList[state.selectIndex]);
      setMonitorSrc(item.videoStream);
    };
    //获取监控流
    const setMonitorSrc = async (id) => {
      const { data } = await axios.get(
        `api/cs-dataintegrate/api/HkArtemis/getCameraPreviewURL?cameraIndexCode=${id}&xzqh=320102`
      );
      state.gridList[state.selectIndex].src = data.result.content.url;
      state.gridList[state.selectIndex].videoOption = {
        live: false,
        preload: "auto",
        autoplay: true,
        language: "zh-CN",
        aspectRatio: "16:9",
        fluid: true,
        sources: [
          {
            src: data.result.content.url, //url地址
          },
        ],
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: false,
          durationDisplay: false,
          remainingTimeDisplay: false,
          fullscreenToggle: true, //全屏按钮
        },
        flash: {
          hls: {
            withCredentials: false,
          },
        },
      };
      state.gridList[state.selectIndex].selected = false;
    };
    //获取d区域宽高
    const getDAreaSize = () => {
      const { offsetWidth, offsetHeight } = dArea.value;
      state.widthScaleList = getScaleList(50, offsetWidth);
      let heightList = getScaleList(50, offsetHeight);
      heightList.splice(0, 1);
      state.heightScaleList = heightList;
      console.log("list", state.widthScaleList);
    };
    //生成刻度数组
    const getScaleList = (scale, total) => {
      let scaleList = [];
      for (let i = 0; i < total; i++) {
        scaleList.push(i);
      }
      scaleList = scaleList.filter((item) => item % scale == 0);
      return scaleList;
    };
    initMonitorList();
    onMounted(() => {
      getDAreaSize();
    });

    return {
      ...toRefs(state),
      gridBox,
      cancelForm,
      domlist,
      handleClose,
      submit,
      deleteBox,
      widthChange,
      heightChange,
      num,
      add,
      dArea,
      bArea,
      xChange,
      yChange,
      scaleChange,
      setDArea,
      setBArea,
      selectBox,
      fillMointor,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/common/mixin.scss";
.nav-bar {
  @include wh(100%, 11.1%);
  border: 1px solid black;
  text-align: center;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 100%;
    object-fit: cover;
    flex-shrink: 0;
    image-rendering: -moz-crisp-edges; /* Firefox */
    image-rendering: -o-crisp-edges; /* Opera */
    image-rendering: -webkit-optimize-contrast; /*Webkit (non-standard naming) */
    image-rendering: crisp-edges;
    -ms-interpolation-mode: nearest-neighbor; /* IE (non-standard property) */
  }
  .box-num {
    width: 10%;
    margin-right: 4%;
  }
}
.grid-container {
  display: flex;
  flex-direction: column;
  margin-top: 0px !important;
  position: absolute;
  top: 0;
  margin: 0;
  // overflow: hidden;
}
.bg-img {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  img {
    @include wh(100%, 100%);
  }
}
.container {
  display: flex;
  position: relative;
  // height: 100%;
  height: calc(100vh - 11.1%);
  width: 100%;
  .d-area-left {
    margin-left: 0 !important;
  }
  .right-pos {
    left: auto !important;
    right: 0;
  }
  .left-container {
    width: 30%;
    height: 100%;
    position: absolute;
    left: 0;
    border: 1px solid black;
    display: flex;
    font-size: 18px;
    flex-direction: column;
    color: #ffffff;
    padding-left: 40px;
    padding-top: 20px;
    box-sizing: border-box;
    cursor: pointer;
    .left-bg-img {
      position: absolute;
      @include wh(100%, 100%);
    }
  }
  .left-box {
    @include wh(100%, 94.7%);
    @include fa();
    justify-content: center;
    flex-direction: column;
    background-size: 100% 100%;
    position: relative;
    .left-top-container {
      @include wh(91.6%, 20.8%);
      // border-bottom: 1px dashed #173154;
      border-bottom: 1px dashed white;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      padding-bottom: 2%;
    }
    .left-bottom-container {
      @include wh(91.6%, 79.2%);
      display: flex;
      flex-direction: column;
    }
  }
  .monitor-list {
    @include wh(100%, 83%);
    flex-direction: column;
    @include fa();
    margin-top: 2%;
    font-size: 18px;
    .monitor-item {
      box-sizing: border-box;
      @include wh(100%, 10%);
      display: flex;
      align-items: center;
    }
  }
  .monitor-icon {
    @include wh(20px, 16px);
    margin-right: 8px;
    img {
      display: block;
    }
  }
  .list-footer {
    @include wh(91.6%, auto);
    position: absolute;
    bottom: 2.7%;
    display: flex;
    justify-content: space-between;
  }
  .page-info {
    display: flex;
    color: rgba(255, 255, 255, 0.8);
    font-family: MicrosoftYaHei;
    letter-spacing: 0;
    font-weight: 400;
    .page-num {
      color: rgba(255, 255, 255, 1);
    }
    .cur-page {
      color: #5cbfe5;
    }
  }
  .page-btns {
    display: flex;
    color: #5cbfe5;
    .page-btn {
      @include wh(74px, 34px);
      border: 1px solid #5cbfe5;
      border-radius: 4px;
      @include fa();
      justify-content: center;
      margin-right: 16px;
    }
    .next-btn {
      margin-right: 0;
    }
  }
  .d-area {
    width: 70%;
    height: 100%;
    margin-left: 30%;
    @include fa();
    flex-direction: column;
    border: 1px solid black;
    cursor: pointer;
    position: relative;
  }
}
.left-title {
  @include wh(100%, 30%);
  display: flex;
  align-items: center;
}
.btn-group {
  display: flex;
  margin-top: 5%;
  height: 38px;
  .left-btn {
    background-image: radial-gradient(
      rgba(29, 167, 235, 0.32) 50%,
      rgba(0, 92, 245, 0) 100%
    );
    border: 1px solid rgba(70, 191, 255, 0.55);
    box-shadow: inset 0 0 6px 0 #4f7ec8;
    border-radius: 4px;
    @include wh(80px, 100%);
    font-size: 16px;
    @include fa();
    justify-content: center;
  }
}
.serach-ipt {
  @include wh(100%, 40px);
  margin-top: 16px;
  background: rgba(75, 158, 217, 0.2);
  border: 1px solid #4b9ed9;
  border-radius: 4px;
  @include fa();
  position: relative;
  .ipt-icon {
    position: absolute;
    @include wh(16px, 16px);
    left: 16px;
    img {
      display: block;
    }
  }
  .ipt {
    @include wh(70%, 100%);
    background: transparent;
    border: none;
    box-sizing: border-box;
    padding-left: 42px;
  }
  .ipt:focus {
    outline: none;
  }
  .ipt::placeholder {
    font-size: 16px;
    color: rgba(255, 255, 255, 0.45);
    letter-spacing: 0;
    font-weight: 400;
  }
}
.width-scale {
  position: absolute;
  @include wh(100%, 20px);
  top: 0;
  left: 0;
  display: flex;
  .scale-item {
    font-size: 12px;
    position: absolute;
    border-left: 1px solid red;
    height: 5px;
    span {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 2px;
    }
  }
  .scale-item:nth-child(1) {
    left: 1px !important;
  }
}
.height-scale {
  position: absolute;
  @include wh(20px, 100%);
  top: 0;
  left: 0;
  display: flex;
  .scale-item {
    font-size: 12px;
    position: absolute;
    @include wh(5px, 1%);
    border-top: 1px solid red;
    span {
      position: absolute;
      transform: translateY(-50%);
      left: 8px;
    }
  }
}
.b-area {
  @include wh(100%, auto);
  padding-left: 20px;
  display: flex;
}
.info-size {
  width: 200px;
}

.d-area-footer {
  position: fixed;
  bottom: 24px;
  right: 24px;
}
.demo-drawer-content {
  transform: translate(0);
  min-height: 100%;
}
.demo-drawer__footer {
  position: fixed;
  right: 24px;
  bottom: 24px;
}
.grid-box {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  // justify-content: space-around;
  box-sizing: border-box;
  // padding-left: 24px;
  // padding-right: 24px;
  position: relative;
  .grid-box-item {
    display: flex;
    align-items: center;
    border: 1px solid black;
    cursor: pointer;
    flex-direction: column;
    // margin-top: 24px;
    box-sizing: border-box;
    @include wh(400px, 225px);
    position: absolute;
  }
  .selected {
    border: 1px solid blue !important;
  }
}
.box-top {
  @include wh(100%, 10%);
  border: 1px solid red;
  display: flex;
  align-items: center;
  padding-left: 4%;
  box-sizing: border-box;
  margin-bottom: 3%;
  position: relative;
  .box-status {
    @include wh(10px, 10px);
    border-radius: 50%;
    background: #5bd684;
    margin-right: 8px;
  }
  .box-btn {
    position: absolute;
    right: 2%;
  }
}
.box-contaner {
  @include wh(100%, 75%);
  padding-left: 4%;
  box-sizing: border-box;
  display: flex;
  .monitor-box {
    @include wh(60%, 90%);
    border: 1px solid red;
    margin-right: 3%;
    .monitor-video {
      @include wh(100%, 100%);
    }
  }
  .monitor-info {
    display: flex;
    flex-direction: column;
    @include wh(30%, 90%);
    border: 1px solid red;
    .moitor-name {
    }
    .safe-phone {
      font-size: 1.1em;
    }
    .safe-person {
      margin-top: 3%;
    }
  }
}
@media (min-width: 375px) and (max-width: 385px) {
  .grid-box {
    @include wh(240px, 240px);
  }
}
</style>
