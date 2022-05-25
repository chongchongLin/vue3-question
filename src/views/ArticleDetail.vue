<template>
  <div class="container">
    <div class="artilce-list">
      <el-descriptions title="遮天" class="article-item"  >
        <el-descriptions-item
          >
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
