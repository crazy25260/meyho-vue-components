<template>
  <div>
    <SwipeMenu class="buttons"
               :currentPage="currentPageA"
               :itemWidth="224"
               @move="onMoveA"
               @touch-end="onTouchEnd"
               @change-page="onChangePageA">
      <div class="swipe-item" v-for="(button, index) in buttonsA" :key="index">
        <button
            :class="{active: currentPageA===index+1, disabled: button.disabled}"
            @click="onButtonClickA(index+1)">
          {{button.name}}
        </button>
      </div>
    </SwipeMenu>
  </div>
</template>

<script>
import SwipeMenu from 'vue-swipe-menu';
import 'vue-swipe-menu/dist/vue-swipe-menu.css'
export default {
  name: "MeyhoVueSwipeMenu",
  components: {
    SwipeMenu,
  },
  data() {
    return {
      touchTime: 0,
      currentPageA: 1,
      buttonsA: [
        {name: '菜单1'},
        {name: '菜单2'},
        {name: '菜单3'},
        {name: '菜单4'},
      ],
      currentPageB: 1,
      buttonsB: [],
    };
  },
  methods: {
    onButtonClickA: function (page) {
      if (this.touchTime < 300) {
        this.onChangePageA(page);
      }
    },
    onChangePageA: function (page) {
      this.currentPageA = page;
    },
    onMoveA: function (page) {
      if (page <= 0) page = 1;
      if (page > this.buttonsB.length) page = this.buttonsA.length;
      if (page !== this.currentPageA) {
        this.onChangePageA(page);
      }
    },
    onButtonClickB: function (page) {
      if (this.touchTime < 300) {
        this.onChangePageB(page);
      }
    },
    onChangePageB: function (page) {
      this.currentPageB = page;
    },
    onMoveB: function (page) {
      if (page <= 0) page = 1;
      if (page > this.buttonsB.length) page = this.buttonsB.length;
      if (page !== this.currentPageB) {
        this.onChangePageB(page);
      }
    },
    onTouchEnd: function (page, touchTime) {
      this.touchTime = touchTime;
    },
  },
}
</script>

<style scoped>

</style>