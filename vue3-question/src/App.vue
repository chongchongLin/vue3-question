<template>
  <div>
    <Wage></Wage>
  </div>
</template>

<script>
import Wage from '@/components/Wage.vue'

export default {
  name: 'App',
  components: {
    Wage
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
