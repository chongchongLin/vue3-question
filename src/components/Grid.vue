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
        <div class="color-item" :style="{'background':item}" v-for="item in colorLists" :key="item" @click="selectColor(item)"></div>
      </div>
      <div class="grid-box" :class="[gridMode]">
        <div
          class="grid-box-item"
          v-for="item in gridList"
          :key="item"
           :style="{'background':item.color}"
          :class="[{ selected: item.selected }]"
          @click="selectBox(item)"
        >
          {{ item.id }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted } from "vue";

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
];
export default {
  setup() {
    const state = reactive({
      colorLists: colorList,
      radioList: btnList,
      radio3: "2x2",
      gridList: [],
      gridMode: "",
      selectId:'',
    });
    const initList = (num) => {
      let array = [];
      for (let i = 0; i < num; i++) {
        array.push({ id: i, selected: false,color:''});
      }
      return array;
    };
    const selectBox = (item) => {
      state.gridList.forEach((child, index) => {
        if (item.id == child.id) {
          child.selected = true;
          state.selectId = item.id;
        } else {
          child.selected = false;
        }
      });
      console.log("list", state.gridList);
    };
    const selectColor = (color)=>{
        const id = state.selectId;
        state.gridList.forEach((item)=>{
            if(item.id == id){
                item.color = color;
            }
        })
    }
    //宫格转换
    const changeGrid = (item) => {
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
      ]);
      state.gridList = initList(map.get(`${id}`).length);
      state.gridMode = map.get(`${id}`).class;
    };
    onMounted(() => {
      changeGrid({ id: 0 });
    });
    return {
      ...toRefs(state),
      changeGrid,
      selectColor,
      selectBox,
    };
  },
};
</script>

<style lang='scss'>
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
</style>