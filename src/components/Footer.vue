<template>
  <div class="container">
    <a href="https://beian.miit.gov.cn">浙ICP备2021019201号-1</a>
  </div>
</template>

<script>
export default {};
</script>

<style lang='scss' scoped>
@import "@/common/mixin.scss";
.container {
  @include wh(100%, 50px);
  display: flex;
  align-items: center;
  justify-content: center;
  a {
    text-decoration: none;
    color: #999;
  }
}
</style>