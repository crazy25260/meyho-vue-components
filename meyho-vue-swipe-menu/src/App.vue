<template>
  <div id="app">
    <MeyhoVueSwipeMenu></MeyhoVueSwipeMenu>
  </div>
</template>

<script>
import MeyhoVueSwipeMenu from "@/components/MeyhoVueSwipeMenu";
export default {
  name: 'App',
  components: {
    MeyhoVueSwipeMenu
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
