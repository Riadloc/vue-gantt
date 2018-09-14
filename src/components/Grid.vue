<template>
  <g class="grid">
    <rect v-for="(v, i) in data" :x="thickWidth" :y="i * rowHeight + offsetY" :width="W" :height="rowHeight" :style="styles.groupBg" :key="index"/>
    <line :v-for="(v, i) in data" :key="i" :x1="0" :x2="width" :y1="i * rowHeight + offsetY" :y2="i * rowHeight + offsetY" :style="styles.line" />
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
  data() {
    return {
      W: 0,
      H: 0
    };
  },
  mounted() {
    const { width, height, thickWidth, footerHeight } = this;
    this.W = width - thickWidth * 2;
    this.H = height - footerHeight;
  }
}
</script>