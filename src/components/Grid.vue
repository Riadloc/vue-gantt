<template>
  <g class="grid">
    <rect v-for="(v, i) in data" :key="`rect-${i}`" :x="thickWidth" :y="i * rowHeight + offsetY" :width="W" :height="rowHeight" :style="styles.groupBg" />
    <line v-for="(v, i) in data" :key="`line-${i}`" :x1="0" :x2="width" :y1="i * rowHeight + offsetY" :y2="i * rowHeight + offsetY" :style="styles.line" />
    <line :x1="maxTextWidth" :x2="maxTextWidth" :y1="0" :y2="H" :style="styles.bline" />
  </g>
</template>
<script>
export default {
  props: [
    "styles",
    "data",
    "width",
    "height",
    "offsetY",
    "thickWidth",
    "rowHeight",
    "footerHeight",
    "maxTextWidth"
  ],
  computed: {
    W() {
      return this.width - this.thickWidth * 2;
    },
    H() {
      return this.height - this.footerHeight;
    }
  }
};
</script>
