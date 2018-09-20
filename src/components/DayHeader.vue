<template>
  <g>
    <YearMonth
      :styles="styles"
      :unit="unit"
      :dates="dates"
      :offsetY="offsetY"
      :minTime="minTime"
      :maxTime="maxTime"
      :maxTextWidth="maxTextWidth"
    />
    <g v-for="(tick, index) in ticks" :key="index">
      <rect v-if="tick.day === 0 || tick.day === 6" :x="tick.x" :y="y0" :width="tick.t" :height="RH" :style="styles.week" />
      <line :x1="tick.x" :x2="tick.x" :y1="y0" :y2="offsetY" :style="styles.line" />
      <text :x="tick.x + tick.t / 2" :y="offsetY * 0.75" :style="styles.text3">{{tick.cur.getDate()}}</text>
      <line v-if="index === ticks.length" :x1="tick.x + tick.t" :x2="tick.x + tick.t" :y1="y0" :y2="offsetY" :style="styles.line" />
    </g>
  </g>
</template>
<script>
import { getDates } from "@/assets/utils";
import YearMonth from "./YearMonth";
export default {
  props: [
    "styles",
    "unit",
    "minTime",
    "maxTime",
    "height",
    "offsetY",
    "maxTextWidth",
    "footerHeight"
  ],
  components: { YearMonth },
  computed: {
    y0() {
      return this.offsetY / 2;
    },
    RH() {
      return this.height - this.y0 - this.footerHeight;
    },
    dates() {
      return getDates(this.minTime, this.maxTime);
    },
    ticks() {
      const { dates, maxTextWidth, minTime, unit } = this;
      const x0 = maxTextWidth;
      return Array.from({ length: dates.length - 1 }).map((item, index) => {
        const cur = new Date(dates[index]);
        const day = cur.getDay();
        const x = x0 + (dates[index] - minTime) / unit;
        const t = (dates[index + 1] - dates[index]) / unit;
        return { cur, day, x, t };
      });
    }
  }
};
</script>
