<template>
  <div
    class="swipe_menu"
    ref="wrapper"
    @touchstart.prevent="onStart"
    @touchmove.prevent="onMove"
    @mousedown.prevent="onStart"
    @mousemove.prevent="onMove"
    @touchend.prevent="onEnd"
    @mouseup.prevent="onEnd"
    @mouseleave.prevent="onEnd"
    @touchcancel.prevent="onEnd"
    @transitionend="onTransitionEnd"
  >
    <div class="wrapper" ref="scroller" :style="scrollerStyle">
      <div
        class="swipe-item"
        ref="menuItem"
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
      maxX: 0,
      wrapperWidth: 0,
      offsetX: 0,
      duration: 0,
      bezier: "linear",
      startX: 0,
      pointX: 0,
      startTime: 0, // 惯性滑动范围内的 startTime
      momentumStartX: 0, // 惯性滑动范围内的 startX
      momentumTimeThreshold: 300, // 惯性滑动的启动 时间阈值
      isStarted: false // start锁
    };
  },
  computed: {
    scrollerStyle() {
      return {
        transform: `translate3d(${this.offsetX}px, 0, 0)`,
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
      this.wrapperWidth =
        this.$refs.menuItem[0].clientWidth * this.nav_categories.length -
        this.$refs.wrapper.clientWidth;
      this.minX = wrapperWidth - scrollWidth;
      this.maxX = this.wrapperWidth;
      console.log(
        "mounted()->minX:" +
          this.minX +
          ", mounted()->wrapperWidth:" +
          this.wrapperWidth
      );
    });
  },
  methods: {
    onStart(e) {
      const point = e.touches ? e.touches[0] : e;
      this.isStarted = true;
      this.duration = 0;
      // this.stop();
      this.pointX = point.pageX;
      this.momentumStartX = this.startX = this.offsetX;
      this.startTime = new Date().getTime();
    },
    onMove(e) {
      if (!this.isStarted) return;
      const point = e.touches ? e.touches[0] : e;
      const deltaX = point.pageX - this.pointX;
      // 浮点数坐标会影响渲染速度
      let offsetX = Math.round(this.startX + deltaX);
      // 超出边界时增加阻力
      if (offsetX > this.minX || 0 - offsetX > this.maxX) {
        console.log(
          "超出边界时增加阻力 offsetX：" +
            offsetX +
            ", maxX:" +
            this.maxX +
            ", minX:" +
            this.minX
        );
        offsetX = Math.round(this.startX + deltaX / 3);
      }
      this.offsetX = offsetX;
      const now = new Date().getTime();
      // 记录在触发惯性滑动条件下的偏移值和时间
      if (now - this.startTime > this.momentumTimeThreshold) {
        this.momentumStartX = this.offsetX;
        this.startTime = now;
      }
    },
    onEnd() {
      if (!this.isStarted) return;
      this.isStarted = false;
      if (this.isNeedReset()) return;
      // const absDeltaY = Math.abs(this.offsetY - this.momentumStartY);
      // const duration = new Date().getTime() - this.startTime;
      // // 启动惯性滑动
      // if (
      //   duration < this.momentumTimeThreshold &&
      //   absDeltaY > this.momentumYThreshold
      // ) {
      //   const momentum = this.momentum(
      //     this.offsetY,
      //     this.momentumStartY,
      //     duration
      //   );
      //   this.offsetY = Math.round(momentum.destination);
      //   this.duration = momentum.duration;
      //   this.bezier = momentum.bezier;
      // }
    },
    onTransitionEnd() {
      this.isNeedReset();
    },
    // 超出边界时需要重置位置
    isNeedReset() {
      let offsetX;
      if (this.offsetX > this.minX) {
        offsetX = this.minX;
      } else if (0 - this.offsetX > this.maxX) {
        offsetX = 0 - this.maxX;
      }
      if (typeof offsetX !== "undefined") {
        this.offsetX = offsetX;
        this.duration = 500;
        this.bezier = "cubic-bezier(.165, .84, .44, 1)";
        console.log("超出边界，需要重置。this.offsetX:" + this.offsetX);
        return true;
      }

      console.log("没有超出边界，不需要重置。this.offsetX:" + this.offsetX);
      return false;
    },
    stop() {
      // 获取当前 translate 的位置
      const matrix = window
        .getComputedStyle(this.scroller)
        .getPropertyValue("transform");
      this.offsetX = Math.round(+matrix.split(")")[0].split(", ")[5]);
    }
  }
};
</script>

<style lang="scss" scoped>
.swipe_menu {
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 1;
  display: flex;
  -webkit-transition-property: -webkit-transform;
  transition-property: transform;
  box-sizing: content-box;

  .swipe-item {
    //margin-left: 1rem;
    min-width: 4rem;
    border: 1px solid red;
  }
}
</style>
