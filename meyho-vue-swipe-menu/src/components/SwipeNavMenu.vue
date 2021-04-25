<template>
  <div class="md-layout-item" ref="scroller" :style="scrollerStyle">
    <div
      class="md-layout"
      ref="wrapper"
      @touchstart.prevent="onStart"
      @mousedown.prevent="onStart"
    >
      <div
        class="md-layout-item menu-item"
        v-for="(item, index) in nav_categories"
        :key="index"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SwipeNavMenu",
  props: {
    nav_categories: Array
  },
  data() {
    return {
      wrapper: null,
      scroller: null,
      minX: 0,
      maxY: 0,
      wrapperWidth: 0,
      offsetY: 0,
      duration: 0,
      bezier: "linear",
      isStarted: false // start锁
    };
  },
  computed: {
    scrollerStyle() {
      return {
        transform: `translate3d(${this.offsetY}px, 0, 0)`,
        "transition-duration": `${this.duration}ms`,
        "transition-timing-function": this.bezier
      };
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.wrapper = this.$refs.wrapper;
      this.scroller = this.$refs.scroller;
      const { width: wrapperWidth } = this.wrapper.getBoundingClientRect();
      const { width: scrollWidth } = this.scroller.getBoundingClientRect();
      this.wrapperWidth = wrapperWidth;
      this.minX = wrapperWidth - scrollWidth;
    });
  },
  methods: {
    onStart(e) {
      const point = e.touches ? e.touches[0] : e;
      this.isStarted = true;
      this.duration = 0;
      this.stop();
      this.pointY = point.pageY;
      this.momentumStartY = this.startY = this.offsetY;
      this.startTime = new Date().getTime();
    },
    stop() {
      // 获取当前 translate 的位置
      const matrix = window
        .getComputedStyle(this.scroller)
        .getPropertyValue("transform");
      this.offsetY = Math.round(+matrix.split(")")[0].split(", ")[5]);
    }
  }
};
</script>

<style lang="scss" scoped>
.menu-item {
  border: 1px solid red;
}
</style>
