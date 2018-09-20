<template>
  <g>
    <g v-for="(v, i) in data" :key="i">
      <rect :x="v.x" :y="RY" :width="barHeight" :height="barHeight" :style="styles[v.type]" />
      <text :x="v.x + barHeight + 5" :y="y" :style="styles.label">{{v.name}}</text>
    </g>
  </g>
</template>
<script>
export default {
  props: ["styles", "legends", "width", "height", "barHeight", "footerHeight"],
  computed: {
    y() {
      return this.height - this.footerHeight / 2;
    },
    RY() {
      return this.y - this.barHeight / 2;
    },
    data() {
      const W = 100;
      const len = this.legends.length;
      return this.legends.map((v, i) => {
        const x = (this.width - len * W) / 2 + i * W;
        return Object.assign({ x }, v);
      });
    }
  }
};
</script>
