<template>
  <div class="all">
    <div class="content">
      <div class="item" v-for="item in list" :key="item.id">
        <div class="close-btn" @click="close(item)"></div>
        <span v-if="item.show">{{ item.content }}</span>
        <span class="add" v-if="!item.show && !item.isadd" @click="add(item)"
          >添加</span
        >
        <span v-if="item.isadd">添加中ing</span>
      </div>
    </div>
    <div class="list">
      <div
        class="item"
        v-for="item in list1"
        :key="item.id"
        @click="select(item)"
      >
        {{ item.content }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true,
      list: [
        { id: 1, content: 1 },
        { id: 2, content: 2 },
        { id: 3, content: 3 },
        { id: 4, content: 4 },
        { id: 5, content: 5 },
        { id: 6, content: 6 },
        { id: 7, content: 7 },
        { id: 8, content: 8 },
        { id: 9, content: 9 },
      ],
      list1: [
        { id: 1, content: 1 },
        { id: 2, content: 2 },
        { id: 3, content: 3 },
        { id: 4, content: 4 },
        { id: 5, content: 5 },
        { id: 6, content: 6 },
        { id: 7, content: 7 },
        { id: 8, content: 8 },
        { id: 9, content: 9 },
      ],
    };
  },
  created() {
    this.list = this.list.map((item) => ({
      ...item,
      show: true,
      isadd: false,
    }));
  },
  methods: {
    close(index) {
      for (let item of this.list) {
        if (index.id == item.id) {
          item.show = false;
        } else {
          item.isadd = false;
          item.show = true;
        }
      }
    },
    add(index) {
      for (let item of this.list) {
        if (index.id == item.id) {
          item.isadd = true;
        }
      }
    },
    select(selectItem) {
      for (let item of this.list) {
        if (item.isadd) {
          item.isadd = false;
          item.show = true;
          item.content = selectItem.content;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.all {
  display: flex;
}
.content {
  width: 1000px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  .item {
    width: 300px;
    height: 150px;
    border: 1px solid red;
    line-height: 150px;
    position: relative;
    text-align: center;
    .close-btn {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: red;
      position: absolute;
      right: 15px;
      top: 15px;
      cursor: pointer;
    }
    .add {
      cursor: pointer;
    }
  }
}
.list {
  width: 300px;
  flex-direction: column;
  display: flex;
  .item {
    width: 100%;
    border: 1px solid black;
    height: 50px;
    text-align: center;
    line-height: 50px;
  }
}
</style>
