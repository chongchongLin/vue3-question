<template>
  <div class="row">
    <el-col :span="8" class="col">
      <label for="" class="ipt-label" :style="{ color: hexadecimalVal }"
        >16进制</label
      >
      <el-input
        v-model="hexadecimalVal"
        placeholder="请输入16进制"
        @change="toRgba()"
      />
    </el-col>
    <el-icon size="50" @click="changePos()"><operation /></el-icon>
    <el-col :span="8" class="col">
      <label for="" class="ipt-label" :style="{ color: rgbaVal }">rgba</label>
      <el-input
        v-model="rgbaVal"
        placeholder="请输入rgba的值"
        @change="toHexadecimal()"
      />
    </el-col>
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
  defineComponent,
} from "vue";
import { Operation } from "@element-plus/icons";
export default defineComponent({
  components: {
    Operation,
  },
  setup() {
    const state = reactive({
      rgbaVal: ref(""),
      hexadecimalVal: ref(""),
    });
    const changePos = () => {};
    //转换为RGBA
    const toRgba = () => {
      state.rgbaVal = `rgba(${parseInt(
        "0x" + state.hexadecimalVal.slice(1, 3)
      )},${parseInt("0x" + state.hexadecimalVal.slice(3, 5))},${parseInt(
        "0x" + state.hexadecimalVal.slice(5, 7)
      )},1)`;
    };
    //转换为16进制
    const toHexadecimal = () => {
      // RGB颜色值的正则
      let reg = /^(rgba|RGBA)/;
      let color = state.rgbaVal;
      if (reg.test(color)) {
        let strHex = "#";
        // 把RGB的3个数值变成数组
        let colorArr:any = color.replace(/(?:\(|\)|rgba|RGBA)*/g, "").split(",");
        // 转成16进制
        for (let i = 0; i < colorArr.length-1; i++) {
          let hex = Number(colorArr[i]).toString(16);
          if (hex === "0") {
            hex += hex;
          }
          strHex += hex;
        }
        strHex = `${strHex},${colorArr[3]*100}%`
        state.hexadecimalVal = strHex;
      }
    };
    return {
      ...toRefs(state),
      toRgba,
      toHexadecimal,
      changePos,
    };
  },
});
</script>

<style lang="scss" scoped>
.row {
  width: 100%;
  display: flex;
  justify-content: center;
}

.el-col {
  display: flex;
  border-radius: 4px;
  align-items: center;
  flex-direction: column;
  height: 50px;
  .ipt-label {
    min-width: 70px;
    align-self: flex-start;
    margin-bottom: 12px;
  }
}
.el-icon {
  margin: 0 12px;
  cursor: pointer;
  margin-top: 24px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>