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
      <line :x1="tick.x" :x2="tick.x" :y1="y0" :y2="offsetY" :style="styles.line" />
      <text :x="tick.x + tick.t / 2" :y="offsetY * 0.75" :style="styles.text3">{{MONTH[tick.month]}}</text>
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
    "offsetY",
    "maxTextWidth",
    "footerHeight"
  ],
  components: { YearMonth },
  data() {
    const MONTH = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    return {
      MONTH: MONTH
    };
  },
  computed: {
    y0() {
      return this.offsetY / 2;
    },
    dates() {
      return getDates(this.minTime, this.maxTime);
    },
    ticks() {
      const { dates, maxTextWidth, maxTime, minTime, unit } = this;
      const months = dates.filter(v => new Date(v).getDate() === 1);
      months.unshift(minTime);
      months.push(maxTime);
      const x0 = maxTextWidth;
      const length = months.length - 1;
      return Array.from({ length }).map((item, index) => {
        const cur = new Date(months[index]);
        const month = cur.getMonth();
        const x = x0 + (months[index] - minTime) / unit;
        const t = (months[index + 1] - months[index]) / unit;
        return { x, t, month };
      });
    }
  }
};
</script>
