<template>
  <div class="gold-container">
    <div class="card-chances">
      <div
        class="chance-item"
        v-for="(item, index) in chancesList"
        :key="index"
      >
        <div
          class="item-circle"
          :style="{ 'background-color': item.color }"
        ></div>
        <div class="item-number">{{ item.chances * 100 }}%</div>
      </div>
    </div>
    <div class="card-list">
      <div class="card-action">
        <div class="card-refresh" @click="refreshCard()">刷新</div>
        <div class="card-exp">购买经验值</div>
      </div>
      <div
        class="card-item"
        v-for="(item, index) in cardList"
        :key="index"
        :style="{ border: `5px solid ${item.color}` }"
      >
        <div class="card-top">
          <div class="card-img"></div>
        </div>
        <div class="card-name" :style="{ 'background-color': item.color }">
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  cardList,
  oneFreeHeros,
  twoFreeHeros,
  threeFreeHeros,
  fourFreeHeros,
  fiveFreeHeros,
} from "@/common/gold.js";
import { reactive, onMounted, toRefs } from "vue";
export default {
  setup() {
    const state = reactive({
      chancesList: [
        {
          level: 1,
          chances: 0.5,
        },
        {
          level: 2,
          chances: 0.3,
        },
        {
          level: 3,
          chances: 0.2,
        },
        {
          level: 4,
          chances: 0,
        },
        {
          level: 5,
          chances: 0,
        },
      ],
      levelList: [
        { color: "#fff", level: 1 },
        { color: "#87f73d", level: 2 },
        { color: "#5a85c1", level: 3 },
        { color: "#fe71d3", level: 4 },
        { color: "#fabe67", level: 5 },
      ],
      cardList: [],
    });
    //随机数组
    const randomList = (list) => {
      let num = Math.floor(list.length * Math.random());
      return list[num];
    };

    //根据权重值生成卡片
    const weightToCard = (list, number) => {
      let initList = [];
      let result = [];
      const herosSortList = [
        oneFreeHeros,
        twoFreeHeros,
        threeFreeHeros,
        fourFreeHeros,
        fiveFreeHeros,
      ];
      let weightList = list.map((item) => item.chances * 10);
      weightList.forEach((item, index) => {
        for (let i = 0; i < item; i++) {
          initList.push(randomList(herosSortList[index]));
        }
      });

      for (let i = 0; i < number; i++) {
        result.push(initList[Math.floor(initList.length * Math.random())]);
      }
      return result;
    };
    //刷新
    const refreshCard = () => {
      state.cardList = weightToCard(state.chancesList, 5);
      state.cardList = findColor(state.cardList);
    };
    const findColor = (list) => {
      let result = [];
      result = list.map((item) => ({
        ...item,
        color: state.levelList[item.level - 1].color,
      }));
      return result;
    };
    onMounted(() => {
      state.cardList = weightToCard(state.chancesList, 5);
      state.cardList = findColor(state.cardList);
      state.chancesList = findColor(state.chancesList);
    });
    return {
      refreshCard,
      ...toRefs(state),
    };
  },
};
</script>

<style lang='scss' scoped>
@import "@/common/mixin.scss";
.card-list {
  @include wh(100%, 180px);
  background: #071712;
  display: grid;
  grid-template-columns: repeat(6, 16.6%);
  box-sizing: border-box;
  padding: 4px 0px;
  .card-action {
    display: flex;
    border: 1px solid red;
    width: 100%;
    flex-direction: column;
    cursor: pointer;
    .card-refresh {
      height: 45%;
      color: #fff;
      @include fa();
      justify-content: center;
      width: 100%;
      background: #403c2d;
    }
    .card-exp {
      height: 45%;
      color: #fff;
      @include fa();
      justify-content: center;
      width: 100%;
      background: #1e2b39;
      margin-top: 12px;
    }
  }
  .card-item {
    @include fa();
    flex-direction: column;
    box-sizing: border-box;
    margin-right: 4px;
  }
}
.card-top {
  @include wh(100%, 80%);
}
.card-name {
  width: 100%;
  height: 20%;
  @include fa();
}
.card-chances {
  @include wh(auto, 20px);
  @include fa();
  margin-bottom: 12px;
  .chance-item {
    margin-right: 4px;
    @include fa();
    .item-circle {
      @include wh(10px, 10px);
      border-radius: 50%;
      margin-right: 8px;
    }
  }
}
</style>