<template>
  <div class="grid-container">
    <header class="nav-bar">
      <!-- <el-radio-group v-model="radio3">
        <el-radio-button
          @click="changeGrid(item)"
          :label="item.name"
          v-for="item in radioList"
          :key="item"
        ></el-radio-button>
      </el-radio-group> -->
      <span>监控数量</span>
      <el-input
        v-model="num"
        placeholder="请输入初始化监控数量"
        @change="handleChange"
        class="box-num"
      ></el-input>
      <el-button @click="add" type="primary">新增监控</el-button>
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
            @click="selectBox(item,$event)"
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
        <div class="demo-drawer__footer"></div>
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
      dAreaLog:false,
      dAreaObj: {},
      boxFontSize: 14,
      timer: null,
      loading: false,
      dialog: false,
      formLabelWidth: "80px",
      selectInfo: {},
      radioList: btnList,
      radio3: "3x2",
      gridList: [],
      gridMode: "",
      selectId: "",
      drawer: false,
      lastSelect: {},
      direction: "rtl",
      dAreaDirection:"ltr",
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
    const initList = (num) => {
      let array = [];
      for (let i = 0; i < num; i++) {
        array.push({
          id: i,
          selected: false,
          color: "",
          boxFontSize: 14,
          left: 0,
          top: 0,
          scale: 1,
        });
      }
      return array;
    };

    const selectBox = (item) => {
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
    //确认
    const submit = (index) => {
      const { width, height, boxFontSize, left, top } = state.selectInfo;
      console.log("x", left);
      console.log("y", top);
      //缩放字体
      const lastArea = state.lastSelect.width * state.lastSelect.height;
      let area = width * height;
      const scale = area / lastArea;
      //避免字体过大
      state.gridList[index].boxFontSize =
        scale > 1 ? boxFontSize * scale * 0.8 : boxFontSize * scale;
      //更改宽高,x,y
      state.gridList[index].width = width * 1;
      state.gridList[index].height = height * 1;
      state.gridList[index].left = left * 1;
      state.gridList[index].top = top * 1;

      console.log("select", state.gridList[index]);
      state.dialog = false;

      //更新选中位置信息
      nextTick(() => {
        initPos(domlist);
      });
    };

    //宫格转换
    const changeGrid = (length) => {
      state.gridList = [];
      state.gridList = initList(length);
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
    const handleChange = (value) => {
      changeGrid(value);
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
      changeGrid(num.value);
      console.log("state", state.gridList);
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
      num,
      handleChange,
      add,
      dArea,
      xChange,
      yChange,
      scaleChange,
      setDArea,
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
  }
}

.info-size {
  width: 200px;
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
