<template>
  <div class="container">
    <el-form ref="form" :model="form" label-width="180px">
      <el-form-item label="目标工资(未交税):">
        <el-input v-model="wage" placeholder="请输入你目前的工资"></el-input>
      </el-form-item>
      <el-form-item label="额外福利:">
        <el-input placeholder='福利金额' v-model="welfare"></el-input>
      </el-form-item>
      <el-form-item label="模式:">
        <el-radio-group v-model="mode" class="mode">
          <el-radio :label="0">默认</el-radio>
          <el-radio :label="1">自定义</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="工作时长:">
        <el-radio-group
          v-model="time"
          class="wage-ipt time-mode"
          v-if="mode === 0"
        >
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
      </el-form-item>
      <el-form-item label="时薪:">
        <el-input
          v-model="hourWage"
          placeholder="当前的时薪"
          class="wage-ipt"
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">

type calculParams = {
  time:number,
  day:number
}

export default {
  data() {
    return {
      welfare:"",
      mode: 0 as number,
      value: "",
      wage: "",
      hourWage: "",
      time: "",
      timeList: [
        { name: "996", id: 0, time: 12, day: 26 },
        { name: "955", id: 1, time: 8, day: 22 },
        { name: "大小周", id: 2, time: 8, day: 24 },
      ] as any,
    };
  },
  watch: {
    time: {
      handler(newVal: string) {
        if (newVal) {
          const result = this.findTime(newVal);
          let time = result > -1 ? this.timeList[result].time : newVal;
          let day = result > -1 ? this.timeList[result].day : 22;
          this.hourWage = this.calculateWage({time,day});
        }
      },
    },
  },
  methods: {
    findTime(name: string):number{
      if(this.mode !== 0) return -1;
      return (this as any).timeList.findIndex((item) => item.name == name);
    },
    calculateWage({time,day}:calculParams):number{
       return Math.round((this.wage*1 + this.welfare*1) / (time * day));
    }
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.wage-ipt {
  width: 300px;
  margin-bottom: 12px;
  display: flex;
}
.mode {
  display: flex;
  height: 40px;
  align-items: center;
}
</style>
