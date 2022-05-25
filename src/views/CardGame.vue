<template>
  <div class="container">
    <h2>游戏规则介绍</h2>
    <div class="text-content">
      <p>
        1.游戏开始时,每人有一张起始牌,选择大、小按钮并点击猜牌按钮,出现结果牌。
      </p>
      <p>
        2.当起始牌和结果牌数字大小相同时,根据花型(红桃>黑桃>梅花>方块)进行比较。
      </p>
      <p>3.当结果牌为7,8时则需要重新猜牌,若结果牌大于起始牌则获胜,反之同理。</p>
      <p>
        4.当结果牌为大王,小王时,游戏规则更改为猜颜色,若结果牌与起始牌同色,则获胜,反之同理。
      </p>
      <p>5.其中红桃A最大,方块2最小。</p>
    </div>

    <h2>游戏开始,游戏局数:{{ gameNumber }}</h2>
    <div class="card suit" :class="firstCard.typeValue">
      <div
        class="card-content"
        :style="{ color: firstCard.color }"
        v-if="firstCard.number <= 10"
      >
        {{ firstCard.number }}
      </div>
      <div
        class="card-content"
        :style="{ color: firstCard.color }"
        v-if="firstCard.number == 11"
      >
        J
      </div>
      <div
        class="card-content"
        :style="{ color: firstCard.color }"
        v-if="firstCard.number == 12"
      >
        Q
      </div>
      <div
        class="card-content"
        :style="{ color: firstCard.color }"
        v-if="firstCard.number == 13"
      >
        K
      </div>
      <div
        class="card-content"
        :style="{ color: firstCard.color }"
        v-if="firstCard.number == 14"
      >
        A
      </div>
      <div
        class="card-content"
        :style="{ color: firstCard.color }"
        v-if="firstCard.number == 9999"
      >
        王
      </div>
      <div class="prompt-text">起始牌</div>
    </div>
    <div class="action-btn-area">
      <template v-if="gameRule == 'num'">
        <div
          class="single-btn-group"
          v-for="(item, index) in numBtnList"
          :key="index"
        >
          <el-button
            type="primary"
            class="guess-btn"
            @click="guessCard(item.value)"
            >{{ item.name }}
          </el-button>
          <div class="rate-text">胜率:{{ item.rate || 0 }}%</div>
        </div>
      </template>
      <template v-if="gameRule == 'color'">
        <div
          class="single-btn-group"
          v-for="(item, index) in colorBtnList"
          :key="index"
        >
          <el-button
            type="primary"
            class="guess-btn"
            @click="guessCard(item.value)"
            >{{ item.name }}</el-button
          >
          <div class="rate-text">胜率:{{ item.rate || 0 }}%</div>
        </div>
      </template>
    </div>

    <div class="card suit" :class="guessCardRes.typeValue" v-if="guessCardRes">
      <div
        class="card-content"
        :style="{ color: guessCardRes.color }"
        v-if="guessCardRes.number <= 10"
      >
        {{ guessCardRes.number }}
      </div>
      <div
        class="card-content"
        :style="{ color: guessCardRes.color }"
        v-if="guessCardRes.number == 11"
      >
        J
      </div>
      <div
        class="card-content"
        :style="{ color: guessCardRes.color }"
        v-if="guessCardRes.number == 12"
      >
        Q
      </div>
      <div
        class="card-content"
        :style="{ color: guessCardRes.color }"
        v-if="guessCardRes.number == 13"
      >
        K
      </div>
      <div
        class="card-content"
        :style="{ color: guessCardRes.color }"
        v-if="guessCardRes.number == 14"
      >
        A
      </div>
      <div
        class="card-content"
        :style="{ color: guessCardRes.color }"
        v-if="guessCardRes.number == 9999"
      >
        王
      </div>
      <div class="prompt-text">结果牌</div>
    </div>
    <div v-if="gameRes" class="result-font">结果:{{ gameRes }}</div>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs } from "vue";
import { ElMessageBox } from "element-plus";
export default {
  name: "card-game",
  setup() {
    const state = reactive({
      gameNumber: 1,
      numBtnList: [
        {
          name: "猜大",
          value: "big",
          rate: "",
        },
        {
          name: "猜小",
          value: "small",
          rate: "",
        },
      ],
      colorBtnList: [
        {
          name: "猜红",
          value: "red",
          rate: "",
        },
        {
          name: "猜黑",
          value: "black",
          rate: "",
        },
      ],
      actionBtnList: [
        { name: "猜大", value: "big" },
        { name: "猜小", value: "small" },
      ],
      actionColorBtnList: [
        { name: "red", value: "red" },
        { name: "black", value: "black" },
      ],
      actionColorVal: "red",
      actionVal: "大",
      cardList: [],
      gameRule: "num", //游戏规则方式比大小还是比颜色
      firstCard: "", //第一张到自己的牌
      guessCardRes: "", //猜到的牌
      gameRes: "", //游戏结果
    });
    //初始化卡牌
    const initCard = () => {
      const typeList = [
        {
          typeName: "红桃",
          weight: 4,
          color: "red",
          typeValue: "hearts",
          number: 2,
        },
        {
          typeName: "黑桃",
          weight: 3,
          color: "black",
          typeValue: "spades",
          number: 4,
        },
        {
          typeName: "梅花",
          weight: 2,
          color: "black",
          typeValue: "clubs",
        },
        {
          typeName: "方块",
          weight: 1,
          color: "red",
          typeValue: "diamonds",
        },
      ];
      const ghostCardList = [
        { typeName: "小王", number: 9999, weight: 99999, color: "black" },
        { typeName: "大王", number: 9999, weight: 99999, color: "red" },
      ];
      for (let i = 2; i <= 14; i++) {
        typeList.forEach((item) => {
          state.cardList.push({
            number: i,
            typeName: item.typeName,
            weight: item.weight,
            color: item.color,
            typeValue: item.typeValue,
          });
        });
      }
      state.cardList = [...state.cardList, ...ghostCardList];
      console.log("list", state.cardList);
    };
    //洗牌算法
    const shuffle = (list) => {
      let len = list.length;
      for (let i = len - 1; i >= 0; i--) {
        let randomIndex = Math.floor(Math.random() * i);
        let temp = list[i];
        list[i] = list[randomIndex];
        list[randomIndex] = temp;
      }
      return list;
    };
    //发牌
    const dealCard = (list) => {
      state.gameRes = "";
      list.splice(0, 1);
      // const card = list.splice(0, 1);
      return list;
    };

    //猜牌
    const guessCard = (status) => {
      const dealCardList = dealCard(state.cardList);
      if (dealCardList.length == 0) {
        ElMessageBox.alert("没牌了", "结果", {
          confirmButtonText: "下次再见哦",
        });
        return;
      }
      state.guessCardRes = dealCardList[0]; //猜的牌

      //猜数字的规则
      if (state.gameRule == "num") {
        //如果猜到7,8,重新发牌,并且将拿到的牌更改为7,8
        if (state.guessCardRes.number == 7 || state.guessCardRes.number == 8) {
          showModal("平");
          console.log("因为您抽到7/8了,重新发牌");
          return;
        }
        const compareResult = compareCardNumRes(
          state.firstCard,
          state.guessCardRes
        );

        if (
          status == "big" &&
          state.guessCardRes.typeName != "大王" &&
          state.guessCardRes.typeName != "小王"
        ) {
          state.gameRes = compareResult < 0 ? "赢" : "输";
          showModal(state.gameRes);
        }
        if (
          status == "small" &&
          state.guessCardRes.typeName != "大王" &&
          state.guessCardRes.typeName != "小王"
        ) {
          state.gameRes = compareResult > 0 ? "赢" : "输";
          showModal(state.gameRes);
        }
      }
      //如果猜到大小王,则进行猜颜色
      console.log("state.guessCardRes", state.guessCardRes);
      if (
        state.guessCardRes.typeName == "大王" ||
        state.guessCardRes.typeName == "小王" ||
        state.gameRule == "color"
      ) {
        if (state.gameRule == "num") {
          showModal("王");
        } else {
          console.log("不是第一次");
          changeCardColor(status);
        }
      }

    };
    //重制卡牌状态
    const resetCardStatus = (resRule) => {
      state.firstCard = state.guessCardRes;
      state.guessCardRes = "";
      state.gameRes = "";
      let rule;
      if (
        (state.firstCard.weight == "99999" &&
          state.guessCardRes.weight == "99999") ||
        resRule == "color"
      ) {
        rule = "color";
        calcColorRate();
      } else {
        rule = "num";
        calcWinRate();
      }

      state.gameRule = rule;
    };
    //比较颜色的逻辑
    const changeCardColor = (color) => {
      state.gameRule = "color";
      const compareResult = compareCardColor(color);
      state.gameRes = compareResult > 0 ? "赢" : "输";
      showModal(state.gameRes);

      console.log("result", state.gameRes);
    };
    //弹窗提示
    const showModal = (status) => {
      setTimeout(() => {
        if (status == "赢") {
          ElMessageBox.confirm("恭喜您获得胜利,有两把刷子继续不?", "结果", {
            confirmButtonText: "奥利给,冲",
            cancelButtonText: "不了不了",
          })
            .then(() => {
              console.log("是否继续");
              resetCardStatus();
            })
            .catch(() => {
              //进入下一轮
              resetCardStatus();
              state.gameNumber += 1;
            });
        }

        if (status == "输") {
          ElMessageBox.alert("小伙子你寄了", "结果", {
            confirmButtonText: "拜拜了您",
            callback: () => {
              resetCardStatus();
              state.gameNumber += 1;
            },
          });
        }
        if (status == "平") {
          ElMessageBox.alert("7的意志来咯", "结果", {
            confirmButtonText: "再来一次",
            callback: () => {
              resetCardStatus();
            },
          });
        }
        if (status == "王") {
          ElMessageBox.alert("幸运女神朝你微笑哦", "结果", {
            confirmButtonText: "再来一次",
            callback: () => {
              calcColorRate();
              resetCardStatus("color");
            },
          });
        }
      }, 1000);
    };

    //比较卡牌大小

    //先比较数字大小
    //再比较花色大小
    //再比较大王小王
    const compareCardNumRes = (firstCard, secondCard) => {
      console.log("第一张牌", firstCard);
      console.log("第二张牌", secondCard);
      console.log("比较", firstCard.number - secondCard.number);
      if (firstCard.number == secondCard.number) {
        return firstCard.weight - secondCard.weight;
      }
      return firstCard.number - secondCard.number;
    };
    //比较颜色
    const compareCardColor = (color) => {
      console.log("第一张牌的颜色", color);
      console.log("下一项", state.guessCardRes.color);
      if (color == state.guessCardRes.color) {
        return 1;
      } else {
        return -1;
      }
    };
    //计算数字游戏的赢,输,平的概率
    const calcNumRate = (firstCard, secondCard) => {
      const paceList = [7, 8, 9999]; //7,8,大小王都是再来一次的机会
      if (paceList.includes(secondCard.number)) {
        return 0;
      }
      if (firstCard.number == secondCard.number) {
        return firstCard.weight - secondCard.weight;
      }
      return firstCard.number - secondCard.number;
    };
    //计算颜色规则概率
    const calcColorRate = () => {
      const redWinRate = Math.round(
        (state.cardList.filter((item) => item.color == "red").length /
          state.cardList.length) *
          100
      );
      const blackWinRate = Math.round(
        (state.cardList.filter((item) => item.color == "black").length /
          state.cardList.length) *
          100
      );
      console.log("颜色数组", state.cardList);
      state.colorBtnList[0].rate = redWinRate;
      state.colorBtnList[1].rate = blackWinRate;
    };
    //计算数字规则的概率
    const calcWinRate = () => {
      console.log("state.firstCard.number)", state.firstCard.number);
      const rateList = state.cardList.map((item) => {
        return calcNumRate(state.firstCard, item);
      });
      const bigWinRate = Math.round(
        (rateList.filter((item) => item < 0).length / state.cardList.length) *
          100
      );
      const smallWinRate = Math.round(
        (rateList.filter((item) => item > 0).length / state.cardList.length) *
          100
      );
      state.numBtnList[0].rate = bigWinRate;
      state.numBtnList[1].rate = smallWinRate;
      console.log("卡组", state.cardList.length);
    };
    onMounted(() => {
      initCard();
      let intCard = shuffle(state.cardList);
      console.log("stateCard", state.cardList);
      state.firstCard = dealCard(intCard)[0];
      // console.log("res", state.firstCard);
      state.gameRule = state.firstCard.weight == 99999 ? "color" : "num";
      state.gameRule == "num" ? calcWinRate() : calcColorRate();
    });
    return {
      ...toRefs(state),
      initCard,
      guessCard,
    };
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.card {
  position: relative;
  float: left;
  margin-right: 10px;
  width: 150px;
  height: 220px;
  border-radius: 10px;
  background: #fff;
  -webkit-box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.3);
  box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.3);
  .card-content {
    text-align: center;
    font: 100px/220px Georgia, Times New Roman, serif;
    line-height: 200px;
  }
  .prompt-text {
    position: absolute;
    width: 100%;
    bottom: 12px;
    font-size: 16px;
    text-align: center;
  }
}

.diamonds:before,
.diamonds:after {
  content: "♦";
  color: #ff0000;
}

.hearts:before,
.hearts:after {
  content: "♥";
  color: #ff0000;
}

.clubs:before,
.clubs:after {
  content: "♣";
  color: #000;
}

.spades:before,
.spades:after {
  content: "♠";
  color: #000;
}
div[class*="suit"]:before {
  position: absolute;
  font-size: 35px;
  left: 5px;
  top: 5px;
}

div[class*="suit"]:after {
  position: absolute;
  font-size: 35px;
  right: 5px;
  bottom: 5px;
}

.action-btn-area {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 24px 0px;
}
.single-btn-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 24px;
  .rate-text {
    font-size: 14px;
    margin-top: 8px;
  }
}
.single-btn-group:last-child {
  margin-right: 0px;
}
.result-font {
  font-size: 32px;
}
.text-content {
  text-align: justify;
  padding: 24px;
}
</style>
