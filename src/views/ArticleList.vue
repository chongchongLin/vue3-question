<template>
  <div class="container">
    <div class="artilce-list">
      <el-descriptions title="遮天" class="article-item"  extra='查看全文' @click="showComponent('articleDetail')">
        <el-descriptions-item
          >冰冷与黑暗并存的宇宙深处，九具庞大的龙尸拉着一口青铜古棺，亘古长存。
          这是太空探测器在枯寂的宇宙中捕捉到的一幅极其震撼的画面。
          九龙拉棺，究竟是回到了上古，还是来到了星空的彼岸？
          一个浩大的仙侠世界，光怪陆离，神秘无尽。热血似火山沸腾，激情若瀚海汹涌，欲望如深渊无止境……
          登天路，踏歌行，弹指遮天。 [1]
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
export default {
  name: "home",
  setup() {
    const router = useRouter();
    const state = reactive({});
    const showComponent = (pathCtn) => {
      router.push({ path: `${pathCtn}` });
    };
    return {
      ...toRefs(state),
      showComponent,
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
  .artilce-list {
    background: #fff;
    width: 80%;
    padding: 24px;
    .article-item {
      cursor: pointer;
    }
  }
}
</style>
