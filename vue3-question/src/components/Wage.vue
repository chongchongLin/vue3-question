<template>
  <div class="container">
    <el-input
      v-model="wage"
      placeholder="请输入你目前的工资"
      class="wage-ipt"
    ></el-input>
    <el-radio-group v-model="mode">
      <el-radio :label="0">默认</el-radio>
      <el-radio :label="1">自定义</el-radio>
    </el-radio-group>
    <el-radio-group v-model="time" class="wage-ipt" v-if="mode === 0">
      <el-radio-button
        :label="item.name"
        v-for="item in timeList"
        :key="item.id"
      ></el-radio-button>
    </el-radio-group>
    <el-input
      v-else
      v-model="time"
      placeholder="请输入一天的工作时间"
      class="wage-ipt"
    ></el-input>
    <el-input
      v-model="hourWage"
      placeholder="当前的时薪"
      class="wage-ipt"
    ></el-input>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      mode: 0 as number,
      value: "",
      wage: "",
      hourWage: "",
      time: "",
      timeList: [
        { name: "996", id: 0, time: 12 },
        { name: "955", id: 1, time: 8 },
        { name: "大小周", id: 2 },
      ] as any,
    };
  },
  watch: {
    time: {
      handler(newVal: string) {
        if (newVal) {
          const result = this.findTime(newVal);
          let time = result > -1 ? this.timeList[result].time : newVal;
          this.hourWage = Math.round(this.wage / (time * 30));
        }
      },
    },
  },
  methods: {
    findTime(name: string): void {
      return (this as any).timeList.findIndex((item) => item.name == name);
    },
  },
};
</script>

<style lang="scss">
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.wage-ipt {
  width: 300px;
}
</style>
