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
  computed: {
    y2() {
      return this.offsetY / 2;
    },
    ticks() {
      const { dates, minTime, maxTime, maxTextWidth, unit } = this;
      const months = dates.filter(v => new Date(v).getDate() === 1);
      months.unshift(minTime);
      months.push(maxTime);
      const x0 = maxTextWidth;
      const length = months.length - 1;
      return Array.from({ length }).map((item, i) => {
        const cur = new Date(months[i]);
        const str = formatMonth(cur);
        const x = x0 + (months[i] - minTime) / unit;
        const t = (months[i + 1] - months[i]) / unit;
        return { str, x, t };
      });
    }
  }
};
</script>
