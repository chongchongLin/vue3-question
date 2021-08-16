/* 
  思考
    1.是否可以把initMointorList替换成gridList？
    // 不能,如果是同一个变量就不需要确认按钮了
    2.设置完D区域后,再点击D区域是否应该已展示已有信息？
    //是
    3.新增单个监控如何进行？
    4.是否需要确认按钮？
    
  未完成
    1.接数据进行测试
 */
<template>
  <div class="grid-container">
    <header class="nav-bar">可配置模块A</header>
    <div class="container">
      <div
        class="left-container"
        ref="bArea"
        @click="setBArea"
        :class="bAreaBtn == '靠右' ? 'right-pos' : ''"
      >
        <div class="left-top-container">可配置模块B</div>
        <div class="left-bottom-container">
          <div class="monitor-list">
            <div
              class="monitor-item"
              v-for="(item, index) in monitorList"
              :key="index"
              @click="fillMointor(item, $event)"
            >
              {{ item.name }}
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
            :class="item.id==selectId?'selected':''"
            @click="selectBox(item, $event)"
          >

            <div class="box-top">
              <div class="box-status"></div>
              <div class="box-title">{{ item.name }}</div>
              <div class="box-btn" @click="editorBox(item, $event)">编辑</div>
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
        width: 0,
        height: 0,
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
    const selectBox = (item, event) => {
      //阻止冒泡
      event.stopPropagation();
       state.selectId = item.id;
      // state.gridList.forEach((child, index) => {
      //   if (item.id == child.id) {
      //     child.selected = true;
      //     state.selectId = index;
      //   } else {
      //     child.selected = false;
      //   }
      // });
    };
    const editorBox = (item, event) => {
      //阻止冒泡
      event.stopPropagation();
      state.selectId = item.id;
      selectItemInfo(item.id);

    };
    //选择单一宫格
    const selectItemInfo = (index) => {
      state.dialog = true;
      let list = state.gridList;
      const res = list.find((item)=>item.id == index);
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
      console.log('id',state.selectId)
      state.gridList[state.selectId].left = state.selectInfo.left;
    };
    const yChange = () => {
      state.gridList[state.selectId].top = state.selectInfo.top;
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

    //宫格转换
    const changeGrid = (initObj) => {
      state.gridList = [];
      state.gridList = initList(initObj);
      const { offsetWidth, offsetHeight } = dArea.value;
      state.dAreaObj.width = offsetWidth;
      state.dAreaObj.height = offsetHeight;
      nextTick(() => {
        initPos(domlist);
      });
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
      state.gridList.splice(state.selectId, 1);
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
      event.stopPropagation();
      // if (!state.gridList[state.selectId].selected) return;
      state.gridList[state.selectId] = {
        ...item,
        ...state.gridList[state.selectId],
      };
      setMonitorSrc(item.videoStream);
      // state.gridList[state.selectId].selected = false;
    };
    //获取监控流
    const setMonitorSrc = async (id) => {
      const { data } = await axios.get(
        `api/cs-dataintegrate/api/HkArtemis/getCameraPreviewURL?cameraIndexCode=${id}&xzqh=320102`
      );
      state.gridList[state.selectId].src = data.result.content.url;

      state.gridList[state.selectId].videoOption = {
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
    };
    initMonitorList();
    onMounted(() => {});

    return {
      ...toRefs(state),
      gridBox,
      changeGrid,
      cancelForm,
      editorBox,
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
  @include wh(100%, 72px);
  border: 1px solid black;
  text-align: center;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
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
}
.container {
  display: flex;
  position: relative;
  height: 100%;
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
    align-items: center;
    justify-content: center;
    font-size: 30px;
    flex-direction: column;
    cursor: pointer;
    .left-top-container {
      @include wh(100%, 30%);
      border: 1px solid black;
      @include fa();
      justify-content: center;
    }
    .left-bottom-container {
      @include wh(100%, 70%);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
  .monitor-list {
    @include wh(90%, 90%);
    flex-direction: column;
    @include fa();
    font-size: 20px;
    border: 1px solid red;
    .monitor-item {
      box-sizing: border-box;
      padding-left: 2%;
      @include wh(100%, 10%);
      display: flex;
      align-items: center;
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
