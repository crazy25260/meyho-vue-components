<template>
  <div>
    <SwipeMenu
      :currentPage="currentPageA"
      :itemWidth="224"
      @move="onMoveA"
      @touch-end="onTouchEnd"
      @change-page="onChangePageA"
    >
      <div class="swipe-item" v-for="(button, index) in buttonsA" :key="index">
        <button @click="onButtonClickA(index + 1)">
          {{ button.name }}
        </button>
      </div>
    </SwipeMenu>
  </div>
</template>

<script>
import SwipeMenu from "vue-swipe-menu";
import "vue-swipe-menu/dist/vue-swipe-menu.css";
export default {
  name: "MeyhoVueSwipeMenu",
  components: {
    SwipeMenu
  },
  data() {
    return {
      touchTime: 0,
      currentPageA: 1,
      buttonsA: [
        { name: "メニュー１" },
        { name: "メニュー２" },
        { name: "メニュー３" },
        { name: "メニュー４" }
      ],
      currentPageB: 1,
      buttonsB: []
    };
  },
  created() {
    let count = 0;
    while (count < 50) {
      this.buttonsB.push({
        color:
          "#" +
          (
            "00" + Math.floor(Math.random() * Math.floor(255)).toString(16)
          ).slice(-2) +
          (
            "00" + Math.floor(Math.random() * Math.floor(255)).toString(16)
          ).slice(-2) +
          (
            "00" + Math.floor(Math.random() * Math.floor(255)).toString(16)
          ).slice(-2)
      });
      count++;
    }
  },
  methods: {
    onButtonClickA: function(page) {
      if (this.touchTime < 300) {
        this.onChangePageA(page);
      }
    },
    onChangePageA: function(page) {
      this.currentPageA = page;
    },
    onMoveA: function(page) {
      if (page <= 0) page = 1;
      if (page > this.buttonsB.length) page = this.buttonsA.length;
      if (page !== this.currentPageA) {
        this.onChangePageA(page);
      }
    },
    onButtonClickB: function(page) {
      if (this.touchTime < 300) {
        this.onChangePageB(page);
      }
    },
    onChangePageB: function(page) {
      this.currentPageB = page;
    },
    onMoveB: function(page) {
      if (page <= 0) page = 1;
      if (page > this.buttonsB.length) page = this.buttonsB.length;
      if (page !== this.currentPageB) {
        this.onChangePageB(page);
      }
    },
    onTouchEnd: function(page, touchTime) {
      this.touchTime = touchTime;
    }
  }
};
</script>

<style scoped>
.screen {
  font-size: 30px;
  text-align: center;
  width: 100%;
  height: 200px;
  line-height: 200px;
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
}

.buttons button.active {
  color: #000;
  background-color: #fef;
}
.buttons button.btn-color {
  width: 50px;
  margin: 0;
  padding: 0;
  border: 1px solid black;
  font-size: 10px;
}
</style>
