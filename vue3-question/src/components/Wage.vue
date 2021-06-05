<template>
  <div class="container">
    <el-input
      v-model="wage"
      placeholder="请输入你目前的工资"
      class="wage-ipt"
    ></el-input>
    <el-radio-group v-model="time" class="wage-ipt">
      <el-radio-button
        :label="item.name"
        v-for="item in timeList"
        :key="item.id"
      ></el-radio-button>
    </el-radio-group>
    <el-input
      v-model="hourWage"
      placeholder="当前的时薪"
      class="wage-ipt"
    ></el-input>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      wage: "",
      hourWage: "",
      time: "995",
      timeList: [
        { name: "996", id: 0 ,time:12},
        { name: "955", id: 1 ,time:8},
        { name: "大小周", id: 2},
      ],
    }
  },
   watch: {
      time:{
        handler(newVal,oldVal){
          const result = this.findTime(newVal);
          let time = result>-1 ? this.timeList[result].time : '';
          this.hourWage = Math.round(this.wage/(time*30));

        }
      }
    },
    methods:{
      findTime(name){
         return this.timeList.findIndex((item)=>item.name == name)
      }
    }
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
