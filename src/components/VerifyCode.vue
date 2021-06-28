<template>
  <canvas
    id="canvas"
    class="canvas"
    @click="createCanvas()"
    width="300"
    height="300"
  ></canvas>
</template>

<script>
import { onMounted } from "vue";
export default {
  setup() {
    const createCanvas = () => {
      const canvas = document.getElementById("canvas");
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, 1000, 1000);
      ctx.strokeRect(0, 0, 100, 100);
      let text = randomStr();
      text.split("").forEach((item, index) => {
        ctx.font = "48px serif";
        ctx.fillStyle = randomColor();
        ctx.fillText(`${item}`, index * 20, 50);
      });
    };
    const randomStr = () => {
      let str = "0123456789abcdefghijklmnopqrstuvwxyz";
      let len = str.length;
      let strList = [];
      for (let i = 0; i < 4; i++) {
        let res = str[Math.floor(Math.random() * len)];
        strList.push(res);
      }
      console.log("list", strList);
      return strList.join("");
    };
    const randomColor = () => {
      let r = Math.floor(Math.random() * 255);
      let g = Math.floor(Math.random() * 255);
      let b = Math.floor(Math.random() * 255);
      return `rgba(${r},${g},${b},0.8)`;
    };
    onMounted(() => {
      createCanvas();
    });
    return {
      createCanvas,
    };
  },
};
</script>

<style lang='scss' scoped>
.canvas {
  cursor: pointer;
}
</style>