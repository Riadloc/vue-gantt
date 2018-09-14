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
      <rect :v-if="day === 0 || day === 6" :x="tick.x" :y="y0" :width="t" :height="RH" :style="styles.week" />
      <line :x1="tick.x" :x2="tick.x" :y1="y0" :y2="offsetY" :style="styles.line" />
      <text :x="tick.x + tick.t / 2" :y="offsetY * 0.75" :style="styles.text3">{{tick.cur.getDate()}}</text>
      <line v-if="i === len" :x1="tick.x + tick.t" :x2="tick.x + tick.t" :y1="y0" :y2="offsetY" :style="styles.line" />
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
  data() {
    return {
      y0: 0,
      RH: 0,
      len: 0,
      dates: [],
      ticks: []
    };
  },
  mounted() {
    const {
      minTime,
      maxTime,
      maxTextWidth,
      offsetY,
      height,
      footerHeight,
      unit
    } = this;
    const dates = getDates(minTime, maxTime);
    this.dates = dates;
    const x0 = maxTextWidth;
    this.y0 = offsetY / 2;
    this.RH = height - this.y0 - footerHeight;
    this.len = dates.length - 1;
    this.ticks = Array.from(this.len).map(i => {
      const cur = new Date(dates[i]);
      const day = cur.getDay();
      const x = x0 + (dates[i] - minTime) / unit;
      const t = (dates[i + 1] - dates[i]) / unit;
      return { cur, day, x, t };
    });
  }
};
</script>
