<template>
  <div class="swipe_menu"
       :class="[{'dragging': dragging}]"
       @touchstart="_onTouchStart"
       @mousedown="_onTouchStart"
       @wheel="_onWheel">
    <div class="wrapper"
         ref="swipeWrapper"
         :style="styleObject"
         @transitionend="_onTransitionEnd">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "MeyhoSwipeNavMenu",
  props: {
    loop: {
      type: Boolean,
      default: false
    },
    speed: {
      type: Number,
      default: 500
    },
    center: {
      type: Boolean,
      default: true
    },
    itemWidth: {
      type: Number,
      default: 100
    }
  },
  data () {
    return {
      translateX: 0,
      startTranslate: 0,
      startTime: 0,
      delta: 0,
      dragging: false,
      startPos: null,
      transitioning: false,
      slideEls: [],
      translateOffset: 0,
      transitionDuration: 0,
      centerOffset: 0,
      bulletWidth: null,
    };
  },
  computed: {
    styleObject: function () {
      return {
        transform: 'translate3d(' + this.translateX + 'px, 0, 0)',
        transitionDuration: this.transitionDuration + 'ms'
      };
    },
  },
  methods: {
    _onTouchStart (e) {
      this.startPos = this._getTouchPos(e);
      this.delta = 0;
      this.startTime = new Date().getTime();
      this.dragging = true;
      this.transitionDuration = 0;
      document.addEventListener('touchmove', this._onTouchMove, {passive: false});
      document.addEventListener('touchend', this._onTouchEnd, false);
      document.addEventListener('mousemove', this._onTouchMove, false);
      document.addEventListener('mouseup', this._onTouchEnd, false);
    },
    _onTouchMove (e) {
      //e 就是触摸点
      this.delta = this._getTouchPos(e) - this.startPos;
      this._setTranslate(this.startTranslate + this.delta);

      // const translate = Math.abs(this._getTranslate() - this.translateOffset);
      // const page = Math.ceil((translate + this.itemWidth / 2) / this.itemWidth);
      //
      // if (page !== this.currentPage) {
      //   this.setPage(page);
      // }
      //
      // this.$emit('move', page);
      // if (Math.abs(this.delta) > 0) {
      //   e.preventDefault();
      // }
    },
    _onTouchEnd () {
      this.dragging = false;
      this.transitionDuration = this.speed;
      // this.setPage(this.currentPage);

      document.removeEventListener('touchmove', this._onTouchMove);
      document.removeEventListener('touchend', this._onTouchEnd);
      document.removeEventListener('mousemove', this._onTouchMove);
      document.removeEventListener('mouseup', this._onTouchEnd);
      this.$emit('touch-end', this.currentPage, new Date().getTime() - this.startTime);
    },
    _onWheel () {
    },
    _getTouchPos (e) {
      let key = 'pageX';
      return e.changedTouches ? e.changedTouches[0][key] : e[key];
    },
    _onTransitionEnd () {
    },
    _setTranslate (value) {
      this.translateX = value;
    },
    _createLoop () {
      // @todo
      //        this.swipe.buttons = this.swipe.buttons.concat(this.swipe.buttons);
    }
  },
}
</script>

<style scoped>
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
}
</style>