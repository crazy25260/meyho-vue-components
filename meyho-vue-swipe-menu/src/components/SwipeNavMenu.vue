<template>
  <div
      class="wrapper"
      ref="wrapper"
      @touchstart.prevent="onStart"
      @touchmove.prevent="onMove"
      @touchend.prevent="onEnd"
      @touchcancel.prevent="onEnd"
      @mousedown.prevent="onStart"
      @mousemove.prevent="onMove"
      @mouseup.prevent="onEnd"
      @mousecancel.prevent="onEnd"
      @mouseleave.prevent="onEnd"
      @transitionend="onTransitionEnd">
    <ul
        class="list"
        ref="scroller"
        :style="scrollerStyle">
      <li
          class="list-item"
          v-for="(item, index) in list"
          :key="index"
      >
        {{item}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "SwipeNavMenu"
}
</script>

<style scoped>

</style>