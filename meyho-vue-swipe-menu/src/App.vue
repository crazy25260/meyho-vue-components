<template>
  <div id="app">
    <!--    <MeyhoVueSwipeMenu></MeyhoVueSwipeMenu>-->

    <!--    新的 <br/>-->
    <!--    <MeyhoSwipeNavMenu class="buttons" :center="false">-->
    <!--      <button v-for="(menuBtn, index) in nav_categories" :key="index">{{ menuBtn.name }}</button>-->
    <!--    </MeyhoSwipeNavMenu>-->

    <!--    <SingleCom></SingleCom>-->
    <SwipeNavMenu :nav_categories="nav_categories">

    </SwipeNavMenu>
    <MySwipeMenu></MySwipeMenu>
  </div>
</template>

<script>
// import MeyhoVueSwipeMenu from "@/components/MeyhoVueSwipeMenu";

// import MeyhoSwipeNavMenu from "@/components/MeyhoSwipeNavMenu";

// import SingleCom from "@/components/SingleCom";
import MySwipeMenu from "@/components/MySwipeMenu";
import SwipeNavMenu from "./components/SwipeNavMenu";

export default {
  name: "App",
  components: {
    SwipeNavMenu,
    MySwipeMenu
    // MeyhoSwipeNavMenu,
    // MeyhoVueSwipeMenu,
    // SingleCom
  },
  data() {
    let cates = [];
    for (let i = 0; i < 20; i++) {
      let cate = {
        id: i,
        name: "类别" + i,
        path: "/demo/path",
        path_name: "demo_path",
        pos: i
      };
      cates.push(cate);
    }
    return {
      nav_categories: cates
    };
  }
};
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

.buttons {
  /*width: 100%;*/
  background-color: rgba(0, 0, 0, 0.5);
  overflow: hidden;
}

.buttons button {
  width: 10rem;
  margin: 0.5rem 2rem;
  height: 40px;
  border-radius: 0.5rem;
  color: rgb(128, 127, 128);
  background-color: #f0f0f0;
  min-width: 4rem;
}
</style>
