<template>
  <g>
    <rect :x="x0" :y="x0" :width="W" :height="H" :style="styles.box" />
    <line :x1="0" :x2="width" :y1="offsetY - x0" :y2="offsetY - x0" :style="styles.bline" />
    <line :x1="maxTextWidth" :x2="width" :y1="offsetY / 2" :y2="offsetY / 2" :style="styles.line" />
  </g>
</template>
<script>
export default {
  props: ["styles", "width", "height", "offsetY", "thickWidth", "maxTextWidth"],
  computed: {
    x0() {
      return this.thickWidth / 2;
    },
    W() {
      return this.width - this.thickWidth;
    },
    H() {
      return this.height - this.thickWidth;
    }
  }
};
</script>
