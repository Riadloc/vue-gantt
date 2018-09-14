<template>
  <g>
    <g v-for="(tick, index) in ticks" :key="index">
      <line :x1="tick.x" :x2="tick.x" :y1="0" :y2="y2" :style="styles.line" />
      <text :x="tick.x + tick.t / 2" :y="offsetY * 0.25" :style="styles.text3">{{ tick.str }}</text>
    </g>
  </g>
</template>
<script>
import { formatMonth } from "@/assets/utils";
export default {
  props: [
    "styles",
    "dates",
    "unit",
    "offsetY",
    "minTime",
    "maxTime",
    "maxTextWidth"
  ],
  data() {
    return {
      y2: 0,
      ticks: []
    }
  },
  mounted() {
    const { dates, minTime, maxTime, maxTextWidth, offsetY, unit } = this;
    const months = dates.filter(v => new Date(v).getDate() === 1);
    months.unshift(minTime);
    months.push(maxTime);

    const x0 = maxTextWidth;
    this.y2 = offsetY / 2;
    const len = months.length - 1;
    this.ticks = Array(len).map(i => {
      const cur = new Date(months[i]);
      const str = formatMonth(cur);
      const x = x0 + (months[i] - minTime) / unit;
      const t = (months[i + 1] - months[i]) / unit;
      return { str, x, t };
    });
  }
};
</script>
