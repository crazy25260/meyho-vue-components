<template>
  <div class="swipe_menu"
       @touchstart="_onTouchStart"
       @mousedown="_onTouchStart">
    <div class="wrapper"
         ref="swipeWrapper"
         :style="styleObject"
         @transitionend="_onTransitionEnd">
      <h3 style="background-color: yellow">I AM A SINGLE COMPONENT.</h3>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "SingleCom",
  props: {
    speed: {
      type: Number,
      default: 100
    },
  },
  data () {
    return {
      translateX: 0,
      startTranslate: 0,
      startTime: 0,
      delta: 0,
      // dragging: false,
      startPos: null,
      transitioning: false,
      // slideEls: [],
      // translateOffset: 0,
      transitionDuration: 0,
      // centerOffset: 0,
      // bulletWidth: null,
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
      // this.dragging = true;
      this.transitionDuration = 0;
      document.addEventListener('touchmove', this._onTouchMove, {passive: false});
      document.addEventListener('touchend', this._onTouchEnd, false);
      document.addEventListener('mousemove', this._onTouchMove, false);
      document.addEventListener('mouseup', this._onTouchEnd, false);
    },
    _getTouchPos (e) {
      return e.changedTouches ? e.changedTouches[0]['pageX'] : e['pageX'];
    },
    _onTouchMove (e) {
      //e 就是触摸点
      this.delta = this._getTouchPos(e) - this.startPos;
      console.log("startPos:" + this.startPos + " | startTranslate:" + this.startTranslate + " | delta:" + this.delta + " | transitionDuration:" + this.transitionDuration)
      this._setTranslate(this.startTranslate + this.delta);
    },
    _setTranslate (value) {
      this.translateX = value;
    },
    _onTouchEnd () {
      this.startTranslate = this.translateX;
      document.removeEventListener('touchmove', this._onTouchMove);
      document.removeEventListener('touchend', this._onTouchEnd);
      document.removeEventListener('mousemove', this._onTouchMove);
      document.removeEventListener('mouseup', this._onTouchEnd);
      // this._onTransitionStart();
      // setTimeout(()=>{
      //   this.startTranslate = this.translateX;
      //   document.removeEventListener('touchmove', this._onTouchMove);
      //   document.removeEventListener('touchend', this._onTouchEnd);
      //   document.removeEventListener('mousemove', this._onTouchMove);
      //   document.removeEventListener('mouseup', this._onTouchEnd);
      // }, 500);

    },
    // 滑动惯性过度效果
    _onTransitionStart () {
      this.transitioning = true;
      this.transitionDuration = this.speed;
    },
    _onTransitionEnd () {
      console.log("_onTransitionEnd entered.")

      this.transitioning = false;
      this.transitionDuration = 0;
      this.delta = 0;
      // // if (this._isPageChanged()) {
      // //   this.$emit('change-end', this.currentPage);
      // // } else {
      // //   this.$emit('revert-end', this.currentPage);
      // // }
    },
  }
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