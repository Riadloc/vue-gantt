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
      <rect :x="tick.x - d" :y="y0" :width="d * 2" :height="RH" :style="styles.week" />
      <line :x1="tick.x" :x2="tick.x" :y1="y0" :y2="offsetY" :style="styles.line" />
      <text :x="tick.x + 3" :y="offsetY * 0.75" :style="styles.text2">{{tick.curDay}}</text>
      <text :x="tick.x - 3" :y="offsetY * 0.75" :style="styles.text1" v-if="tick.x - maxTextWidth > 28">{{tick.prevDay}}</text>
    </g>
  </g>
</template>
<script>
import { getDates, DAY, addDays } from "@/assets/utils";
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
    d() {
      return DAY / this.unit;
    },
    RH() {
      return this.height - this.y0 - this.footerHeight;
    },
    dates() {
      return getDates(this.minTime, this.maxTime);
    },
    ticks() {
      const { dates, maxTextWidth, maxTime, minTime, unit } = this;
      const x0 = maxTextWidth;
      const weeks = dates.filter(v => new Date(v).getDay() === 0);
      weeks.push(maxTime);
      const length = weeks.length - 1;
      return Array.from({ length }).map((item, index) => {
        const cur = new Date(weeks[index]);
        const x = x0 + (weeks[index] - minTime) / unit;
        const curDay = cur.getDate();
        const prevDay = addDays(cur, -1).getDate();
        return { x, curDay, prevDay };
      });
    }
  }
};
</script>
