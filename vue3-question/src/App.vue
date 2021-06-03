<template>
  <div>
    <Moitor></Moitor>
  </div>
</template>

<script>
import Moitor from '@/components/Monitor.vue'

export default {
  name: 'App',
  components: {
    Moitor
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
