<template>
  <div class="header-container">
    <span class="title" @click="returnHome()">技术改变生活</span>
    <span class="article-title" @click="jumpPage('articleList')">个人文章</span>
    <div class="tag">
      <a href="https://github.com/chongchongLin">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-github"></use>
        </svg>
      </a>
      <span>Github</span>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const returnHome = () => {
      router.push({ path: "./home" });
    };
    const jumpPage = (path)=>{
      router.push({ path: `./${path}` });
    }
    return {
      returnHome,
      jumpPage
    };
  },
};
</script>

<style lang="scss" scoped>
.header-container {
  width: 100%;
  height: 60px;
  position: fixed;
  top: 0;
  left: 0;
  background: #ffffff;
  z-index: 999;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 24px;
}
.title {
  color: #999;
  cursor: pointer;
}
.article-title{
   color: #999;
  cursor: pointer;
  margin: 0 16px;
}
.article-title:hover,.title:hover{
  color: #000;
}
.tag {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 24px;
  a {
    color: #000;
    text-decoration: none;
  }
  .icon {
    width: 28px;
    height: 28px;
    fill: currentColor;
    overflow: hidden;
  }
  span {
    color: #999;
    font-size: 14px;
  }
}
</style>
