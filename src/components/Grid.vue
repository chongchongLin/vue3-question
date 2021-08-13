<template>
  <div class="grid-container">
    <div style="margin-top: 20px">
      <el-radio-group v-model="radio3">
        <el-radio-button
          @click="changeGrid(item)"
          :label="item.name"
          v-for="item in radioList"
          :key="item"
        ></el-radio-button>
      </el-radio-group>
    </div>
    <div class="bottom-container">
      <div class="color-list">
        <div
          class="color-item"
          draggable="true"
          :style="{ background: item }"
          v-for="item in colorLists"
          :key="item"
          @click="selectColor(item)"
          @dragstart="handleDragStart($event, item)"
          @dragover.prevent="handleDragOver($event, item)"
          @dragenter="handleDragEnter($event, item)"
          @dragend="handleDragEnd($event, item)"
        ></div>
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
            height: item.height,
            marginLeft: item.left + 'px',
            marginRight: item.right + 'px',
          }"
          :class="[{ selected: item.selected }]"
          @click="selectBox(item)"
        >
          {{ item.id }}
        </div>
      </div>
    </div>
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
            <el-input v-model="selectInfo.width" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="高度:"
            :label-width="formLabelWidth"
            class="info-size"
          >
            <el-input v-model="selectInfo.height" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button @click="cancelForm">取 消</el-button>
          <el-button
            type="primary"
            @click="submit(selectId)"
            :loading="loading"
            >{{ loading ? "提交中 ..." : "确 定" }}</el-button
          >
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted, toRaw, ref, watch, nextTick } from "vue";
import { ElMessageBox } from "element-plus";
const colorList = [
  "#f30c0c",
  "#f36c0c",
  "#638e48",
  "#486a8e",
  "#53488e",
  "#8e4885",
];
const btnList = [
  { name: "2x2", id: 0 },
  { name: "3x3", id: 1 },
  { name: "4x4", id: 2 },
  { name: "5x5", id: 3 },
  { name: "2x1", id: 4 },
  { name: "头部1格底部2格", id: 5 },
  { name: "左上角一大格", id: 6 },
  { name: "头部1格底部很多格", id: 7 },
  { name: "左上角四格", id: 8 },
  { name: "12x12", id: 9 },
];
export default {
  setup() {
    const gridBox = ref(null);
    const domlist = ref([]);
    const state = reactive({
      timer: null,
      loading: false,
      dialog: false,
      formLabelWidth: "80px",
      selectInfo: {},
      colorLists: colorList,
      radioList: btnList,
      radio3: "2x2",
      gridList: [],
      gridMode: "",
      selectId: "",
      drawer: false,
      direction: "rtl",
    });
    //初始化格子dom
    const initPos = (doms) => {
      let domList = toRaw(doms.value);
       domList = domList.filter((item)=>item)
      domList.forEach((item, index) => {
        const { x, y, width, height } = item.getBoundingClientRect();
        state.gridList[index] = {
          ...state.gridList[index],
          width,
          height,
          x,
          y,
          maxXRange: `${x + width}`,
          minXRange: `${x}`,
          maxYRange: `${y + height}`,
          minYRange: `${y}`,
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
        });
      }
      return array;
    };
    const handleDragStart = (e, item) => {};
    const handleDragOver = (e, item) => {};
    const handleDragEnter = (e, item) => {};
    const handleDragEnd = (e, item) => {
      const { x, y } = e;
      let gridList = toRaw(state.gridList);
      state.selectId = findIndex(x, y, gridList);
      selectColor(item);
    };
    //判断鼠标落点位置并返回相应格子索引值
    const findIndex = (x, y, arr) => {
      let res;
      arr.forEach((item, index) => {
        const { maxXRange, maxYRange, minXRange, minYRange } = item;
        if (x < maxXRange && x > minXRange && y < maxYRange && y > minYRange) {
          res = index;
        }
      });
      return res;
    };
    const selectBox = (item) => {
      state.drawer = true;
      state.gridList.forEach((child, index) => {
        if (item.id == child.id) {
          child.selected = true;
          state.selectId = item.id;
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
      state.selectInfo = {
        width: res.width,
        height: res.height,
        name: `格子${index}号`,
        x: res.x,
        y: res.y,
      };
    };
    const submit = (index) => {
      const { width, height, y } = state.selectInfo;
      state.gridList[index].width = width * 1;
      state.gridList[index].height = height * 1;
      state.dialog = false;
      const container = gridBox.value.getBoundingClientRect();
      let otherWidth = Math.round((container.width - width) / 1);
      let addWidth = container.width / 2 - otherWidth;
      console.log('addwidht',addWidth)
      state.gridList[index].left = -addWidth;
      state.gridList.forEach((item) => {
        if (item.y == y && item.id != index) {
          item.width = otherWidth;
        }
        if(addWidth == 0){
          item.left = 0;
        }
      });

      console.log("gridList", state.gridList);
    };
 
    const selectColor = (color) => {
      const id = state.selectId;
      state.gridList.forEach((item) => {
        if (item.id == id) {
          item.color = color;
        }
      });
    };
    //宫格转换
    const changeGrid = (item) => {
      state.gridList = [];
      const { id } = item;
      let map = new Map([
        [
          "0",
          {
            class: "grid-two-two",
            length: 4,
          },
        ],
        [
          "1",
          {
            class: "gird-three-three",
            length: 9,
          },
        ],
        [
          "2",
          {
            class: "gird-four-four",
            length: 16,
          },
        ],
        [
          "3",
          {
            class: "gird-five-five",
            length: 25,
          },
        ],
        [
          "4",
          {
            class: "gird-two",
            length: 2,
          },
        ],
        [
          "5",
          {
            class: "header-foot-foot",
            length: 3,
          },
        ],
        [
          "6",
          {
            class: "left-one-box",
            length: 6,
          },
        ],
        [
          "7",
          {
            class: "header-more",
            length: 9,
          },
        ],
        [
          "8",
          {
            class: "left-four",
            length: 13,
          },
        ],
            [
          "9",
          {
            class: "twelve-twelve",
            length: 144,
          },
        ],
      ]);
      state.gridList = initList(map.get(`${id}`).length);
      state.gridMode = map.get(`${id}`).class;
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
    onMounted(() => {
      changeGrid({ id: 0 });
    });
    return {
      ...toRefs(state),
      gridBox,
      changeGrid,
      cancelForm,
      selectColor,
      selectBox,
      handleDragStart,
      handleDragOver,
      handleDragEnter,
      handleDragEnd,
      domlist,
      handleClose,
      submit,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/common/mixin.scss";
.grid-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.bottom-container {
  display: flex;
  margin-top: 24px;
}
.color-list {
  @include wh(150px, 500px);
  margin-right: 24px;
  .color-item {
    height: 48px;
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
  @include wh(500px, 500px);
  display: grid;
  .grid-box-item {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
    cursor: pointer;
  }
  .selected {
    border: 3px solid red !important;
  }
}
.grid-two-two {
  grid-template-columns: repeat(2, 50%);
  grid-template-rows: repeat(2, 50%);
}
.gird-three-three {
  grid-template-columns: repeat(3, 33.3%);
  grid-template-rows: repeat(3, 33.3%);
}
.gird-four-four {
  grid-template-columns: repeat(4, 25%);
  grid-template-rows: repeat(4, 25%);
}

.gird-five-five {
  grid-template-columns: repeat(5, 20%);
  grid-template-rows: repeat(5, 20%);
}
.gird-two {
  grid-template-columns: repeat(2, 50%);
  grid-template-rows: repeat(1, 100%);
}
.header-foot-foot {
  grid-template-columns: repeat(2, 50%);
  grid-template-rows: repeat(2, 50%);
  .grid-box-item:nth-child(1) {
    grid-column: 1 / 4;
  }
}
.left-one-box {
  grid-template-columns: repeat(3, 33.3%);
  grid-template-rows: repeat(3, 33.3%);
  .grid-box-item:nth-child(1) {
    grid-column: 1/3;
    grid-row: 1/3;
  }
}

.header-more {
  grid-template-columns: repeat(4, 25%);
  grid-template-rows: repeat(4, 25%);
  .grid-box-item:nth-child(1) {
    grid-column: 1 / 5;
    grid-row: 1 / 3;
  }
}

.left-four {
  grid-template-columns: repeat(5, 20%);
  grid-template-rows: repeat(5, 20%);

  .grid-box-item:nth-child(1) {
    grid-column: 1 / 3;
    grid-row: 1 / 3;
  }
  .grid-box-item:nth-child(2) {
    grid-column: 3 / 5;
    grid-row: 1 / 3;
  }
  .grid-box-item:nth-child(3) {
    grid-column: 1 / 3;
    grid-row: 3 / 5;
  }
  .grid-box-item:nth-child(4) {
    grid-column: 3 / 5;
    grid-row: 3 / 5;
  }
}
.twelve-twelve{
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(12, 1fr);
}
@media (min-width: 375px) and (max-width: 385px) {
  .grid-box {
    @include wh(240px, 240px);
  }
  .color-list {
    @include wh(100px, 300px);
    margin-right: 12px;
  }
}
</style>
