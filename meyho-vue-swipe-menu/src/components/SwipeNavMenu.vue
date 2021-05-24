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
        :class="{ hover: hover }"
        @mouseover="hover = true"
        @mouseleave="hover = false"
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
      momentumXThreshold: 15, // 惯性滑动的启动 距离阈值
      isStarted: false, // start锁
      menuOverflow: true, // 菜单是否处于溢出状态，即是否菜单超出可是界面宽度。 如没有溢出，左滑到界限后，惯性距离设为0.
      momentumMoving: false, // 是否处于惯性滑动中，如果处于惯性滑动中，那么当按下鼠标或者手指触摸的时候，要先停止惯性滑动。
      hover: false
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

      // 先看菜单和界面可视区域谁更宽。即菜单栏是否处于overflow（溢出）的状态
      let menuBarWidth =
        this.$refs.menuItem[0].clientWidth * this.nav_categories.length;
      let visibalWidth = this.$refs.wrapper.clientWidth;

      this.menuOverflow = menuBarWidth > visibalWidth;
      this.wrapperWidth =
        menuBarWidth > visibalWidth
          ? menuBarWidth - visibalWidth
          : menuBarWidth;
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
      // 如果正在惯性滑动，那么需要先停止惯性滑动。
      if (this.momentumMoving) {
        this.stop();
      }
      this.duration = 0;
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
      const absDeltaX = Math.abs(this.offsetX - this.momentumStartX);
      const duration = new Date().getTime() - this.startTime;
      // 启动惯性滑动
      if (
        duration < this.momentumTimeThreshold &&
        absDeltaX > this.momentumXThreshold
      ) {
        const momentum = this.momentum(
          this.offsetX,
          this.momentumStartX,
          duration
        );
        this.offsetX = Math.round(momentum.destination);
        this.duration = momentum.duration;
        this.bezier = momentum.bezier;
      }
    },
    onTransitionEnd() {
      this.isNeedReset();
      this.momentumMoving = false;
    },
    momentum(current, start, duration) {
      const durationMap = {
        noBounce: 2500,
        weekBounce: 800,
        strongBounce: 400
      };
      const bezierMap = {
        noBounce: "cubic-bezier(.17, .89, .45, 1)",
        weekBounce: "cubic-bezier(.25, .46, .45, .94)",
        strongBounce: "cubic-bezier(.25, .46, .45, .94)"
      };

      this.momentumMoving = true;
      let type = "noBounce";
      // 惯性滑动加速度
      const deceleration = 0.003;
      // 回弹阻力
      const bounceRate = 10;
      // 强弱回弹的分割值
      const bounceThreshold = 300;
      // 回弹的最大限度
      const maxOverflowX = this.wrapperWidth / 6;
      let overflowX;

      const distance = current - start;
      const speed = (2 * Math.abs(distance)) / duration;
      let destination =
        current + (speed / deceleration) * (distance < 0 ? -1 : 1);

      console.log("AAAAAAAAAA:" + maxOverflowX);
      console.log("0000000000:destination:" + destination);

      // 菜单右滑超出界限
      if (destination > this.minX) {
        overflowX = destination - this.minX;
        type = overflowX > bounceThreshold ? "strongBounce" : "weekBounce";
        destination = Math.max(
          maxOverflowX - this.minX,
          overflowX / bounceRate - this.minX
        );
        console.log("1111111111:" + destination);
      }
      // 菜单左滑超出界限
      else if (0 - destination > this.maxX) {
        overflowX = 0 - destination - this.maxX;
        type = overflowX > bounceThreshold ? "strongBounce" : "weekBounce";
        destination = Math.min(
          0 - (this.maxX + maxOverflowX),
          0 - (this.maxX + maxOverflowX / bounceRate)
        );

        if (!this.menuOverflow) {
          destination = 0;
        }
        console.log("2222222222:" + destination);
      }

      return {
        destination,
        duration: durationMap[type],
        bezier: bezierMap[type]
      };
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
      this.offsetX = Math.round(+matrix.split(")")[0].split(", ")[4]);
      console.log(
        "3333333333:matrix:" +
          JSON.stringify(matrix) +
          ", this.offsetX:" +
          this.offsetX
      );
      this.momentumMoving = false;
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
    //border: 1px solid red;
  }
}

.hover {
  cursor: pointer;
}
</style>
