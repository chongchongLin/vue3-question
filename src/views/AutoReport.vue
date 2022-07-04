<template>
  <div class="container">
    <div class="flex-container">
      <div class="label">主题:</div>
      <el-select
        v-model="themeValue"
        class="m-2"
        placeholder="选择主题"
        size="large"
        @change="changeSelect()"
      >
        <el-option
          v-for="(item, index) in options"
          :key="index"
          :label="item.name"
          :value="item.name"
        />
      </el-select>
    </div>
    <div class="flex-container">
      <div class="label">模板:</div>
      <div class="templete-list" v-if="templeteList.length > 0">
        <div
          v-for="(item, index) in templeteList"
          :key="index"
          @click="selectTmp(index)"
          class="templete-item"
          :class="item.select ? 'select-border' : ''"
        >
          <!-- :preview-src-list="picList" -->
          <div class="item-pic">
            <el-image :src="item.url" :initial-index="index" fit="cover" />
          </div>
          <div class="item-name">{{ item.name }}</div>
          <img class="tmp-pic" :src="item.url" />
        </div>
      </div>
    </div>
    <div class="flex-container" v-if="isSelectTmp">
      <div class="label">时间范围:</div>
      <el-date-picker
        v-model="date"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      />
    </div>
    <div class="flex-container" v-if="isSelectTmp">
      <el-button type="primary">下载word</el-button>
      <el-button type="primary">下载pdf</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const date = ref([
  new Date(2000, 10, 10, 10, 10),
  new Date(2000, 10, 11, 10, 10),
]);
const isSelectTmp = ref(false);
const themeValue = ref("");
const options = [
  {
    name: "景区",
    templeteList: [
      {
        name: "景区客流模板",
        url:
          "",
      },
      {
        name: "景区停车位模板",
        url: "",
      },
      {
        name: "景区监控模板",
        url: "",
      },
    ],
  },
  {
    name: "执法案件",
    templeteList: [
      {
        name: "违纪模板",
        url: "",
      },
      {
        name: "违法数量模板",
        url:
          "",
      },
      {
        name: "成功解决案件模板",
        url:
          "",
      },
    ],
  },
]; //主题模板

const templeteList = ref<any>([]); //主题列表
const picList = ref<any>([]); //图片列表
const changeSelect = (index) => {
  const value = themeValue.value;
  const targetList = options.find((item) => item.name == value);
  templeteList.value = targetList.templeteList;
  picList.value = targetList.templeteList.map((item) => item.url);

  console.log("picList", picList.value);
};
//选择模板
const selectTmp = (targetIndex) => {
  templeteList.value.forEach((item, index) => {
    if (index == targetIndex) {
      item.select = true;
      isSelectTmp.value = true;
    } else {
      item.select = false;
    }
  });
};
</script>

<style lang='scss' scoped>
@import "@/common/mixin.scss";
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.flex-container {
  display: flex;
  align-items: center;
  margin-top: 24px;
  .label {
    margin-right: 24px;
  }
}
.templete-list {
  @include wh(auto, auto);
  margin-top: 24px;
  display: flex;
  .templete-item {
    @include wh(160px, auto);
    border: 1px solid red;
    margin-right: 24px;
    display: flex;
    flex-direction: column;
    position: relative;
    cursor: pointer;
    .item-pic {
      @include wh(160px, 160px);
      overflow: hidden;
      border-radius: 16px;
    }

    .item-name {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 8px;
    }
  }
  .select-border {
    border: 1px solid blue;
  }
  .templete-item:hover .tmp-pic {
    display: block;
  }
}

.tmp-pic {
  @include wh(320px, 320px);
  position: absolute;
  z-index: 1;
  display: none;
  left: 160px;
}
</style>