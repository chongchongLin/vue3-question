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
    <header class="nav-bar">
      可配置模块A
    </header>
    <div class="container">
      <div class="left-container">可配置模块B</div>
      <div class="d-area" ref="dArea" @click="setDArea">
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
            :class="[{ selected: item.selected }]"
            @click="selectBox(item, $event)"
          >
            <div class="box-top">
              <div class="box-status"></div>
              <div class="box-title">泉山区监控</div>
            </div>
            <div class="box-contaner">
              <div class="monitor-box"></div>
              <div class="monitor-info">
                <div class="moitor-name">负责人</div>
                <div class="moitor-name">周磊</div>
                <div class="moitor-name">13626196182</div>
                <div class="moitor-name safe-person">安全人</div>
                <div class="moitor-name">周磊</div>
                <div class="moitor-name safe-phone">13626196182</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-drawer
      title="D区域配置"
      v-model="dAreaLog"
      :direction="dAreaDirection"
      :before-close="handleClose"
      destroy-on-close
      ref="drawer"
      custom-class="d-area-drawer"
    >
      <div class="demo-drawer__content">
        <el-form :model="selectInfo">
          <el-form-item
            label="监控数量:"
            :label-width="formLabelWidth"
            class="info-size"
          >
            <el-input
              v-model="monitorNum"
              autocomplete="off"
              @input="numChange()"
            ></el-input>
          </el-form-item>
          <div
            class="moitor-info"
            v-for="(item, index) in initMoitorList"
            :key="index"
          >
            <el-form-item
              label="宽度:"
              :label-width="formLabelWidth"
              class="info-size"
            >
              <el-input
                @input="itemWidthChange(item)"
                v-model="item.width"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="高度:"
              :label-width="formLabelWidth"
              class="info-size"
            >
              <el-input
                @input="itemHeightChange(item)"
                v-model="item.height"
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
                v-model="item.left"
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
                v-model="item.top"
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
      <div class="demo-drawer__content">
        <el-form :model="selectInfo">
          <el-form-item
            label="宽度:"
            :label-width="formLabelWidth"
            class="info-size"
          >
            <el-input
              :disabled="true"
              @input="widthChange()"
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
              @input="heightChange()"
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
          <!-- <el-button @click="cancelForm">取 消</el-button> -->
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
import { reactive, toRefs, onMounted, toRaw, ref, watch, nextTick } from "vue";
import { ElMessageBox } from "element-plus";
import Header from "./Header.vue";
import Monitor from "./Monitor.vue";

const btnList = [{ name: "3x2", id: 0 }];
//比例 16/9
export default {
  components: { Header, Monitor },
  setup() {
    const dArea = ref();
    const gridBox = ref(null);
    const domlist = ref([]);
    const num = ref(1);
    const state = reactive({
      monitorNum:1,
      initMoitorList: [
        {
          id: 999,
          selected: false,
          color: "",
          boxFontSize:14,
          left:0,
          width:0,
          height:0,
          top:0,
          scale:1,}
      ],
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
      radioList: btnList,
      radio3: "3x2",
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
    const initList = (number) => {
      let array = [];
      for (let i = 0; i < number; i++) {
        array.push({
          id: i,
          selected: false,
          color: "",
          boxFontSize:14,
          left:0,
          width:0,
          height:0,
          top:0,
          scale:1,
        });
      }
      return array;
    };

    const selectBox = (item, event) => {
      //阻止冒泡
      event.stopPropagation();
      state.drawer = true;
      state.gridList.forEach((child, index) => {
        if (item.id == child.id) {
          child.selected = true;
          state.selectId = index;
          selectItemInfo(index);
        } else {
          child.selected = false;
        }
      });
    };
    //选择单一宫格
    const selectItemInfo = (index) => {
      state.dialog = true;
      const res = state.gridList[index];
      console.log("res", res);
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
      state.gridList[state.selectId].left = state.selectInfo.left;
    };
    const yChange = () => {
      state.gridList[state.selectId].top = state.selectInfo.top;
    };
    const itemWidthChange = (item) => {
      let scale = 9 / 16;
      item.height = item.width * scale;
    };
    const itemHeightChange = (item) => {
      let scale = 16/9;
      item.width = item.height * scale;
    };
    const setDArea = () => {
      state.dAreaLog = true;
      (state.initMoitorList.length = state.monitorNum);
      console.log("initMoitorList", state.initMoitorList);
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
    const widthChange = () => {
      let scale = 9 / 16;
      const width = state.selectInfo.width;
      let height = width * scale;
      state.selectInfo.height = height;
    };
    const heightChange = () => {
      let scale = 16 / 9;
      const height = state.selectInfo.height;
      let width = height * scale;
      state.selectInfo.width = width;
    };
    const numChange = () => {
      state.initMoitorList.length = state.monitorNum;
      state.initMoitorList = initList(state.monitorNum);
    };

    //确认
    const submit = () => {
      state.gridList = state.initMoitorList;
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
      state.gridList.push({
        id: state.gridList.length,
        selected: false,
        color: "",
        boxFontSize: 14,
      });
      num.value = state.gridList.length;
      nextTick(() => {
        initPos(domlist);
      });
    };

    onMounted(() => {
      // changeGrid(num.value);
    });

    return {
      ...toRefs(state),
      gridBox,
      changeGrid,
      cancelForm,
      selectBox,
      domlist,
      handleClose,
      submit,
      deleteBox,
      widthChange,
      heightChange,
      itemWidthChange,
      itemHeightChange,
      num,
      add,
      dArea,
      xChange,
      yChange,
      scaleChange,
      setDArea,
      numChange,
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
  }
  .d-area {
    width: calc(100vw - 30%);
    height: 100%;
    margin-left: 30%;
    @include fa();
    flex-direction: column;
    border: 1px solid black;
    cursor: pointer;
  }
}

.info-size {
  width: 200px;
}

.d-area-footer {
  position: fixed;
  bottom: 24px;
  right: 24px;
}
.demo-drawer__content{
  transform:translate(0);
  min-height:100%
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
    border: 1px solid red !important;
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
  .box-status {
    @include wh(10px, 10px);
    border-radius: 50%;
    background: #5bd684;
    margin-right: 8px;
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
