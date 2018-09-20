<template>
  <svg :width="width" :height="height" :viewBox="`0 0 ${width} ${height}`">
    <Layout
      :styles="styles"
      :width="width"
      :height="height"
      :offsetY="mergedOptions.offsetY"
      :thickWidth="mergedOptions.thickWidth"
      :maxTextWidth="mergedOptions.maxTextWidth"
    />
    <DayHeader
      v-if="mergedOptions.viewMode === 'day'"
      :styles="styles"
      :unit="unit"
      :height="height"
      :offsetY="mergedOptions.offsetY"
      :minTime="minTime"
      :maxTime="maxTime"
      :maxTextWidth="mergedOptions.maxTextWidth"
      :footerHeight="mergedOptions.footerHeight"
    />
    <WeekHeader
      v-else-if="mergedOptions.viewMode === 'week'"
      :styles="styles"
      :unit="unit"
      :height="height"
      :offsetY="mergedOptions.offsetY"
      :minTime="minTime"
      :maxTime="maxTime"
      :maxTextWidth="mergedOptions.maxTextWidth"
      :footerHeight="mergedOptions.footerHeight"
    />
    <MonthHeader
      v-else-if="mergedOptions.viewMode === 'month'"
      :styles="styles"
      :unit="unit"
      :offsetY="mergedOptions.offsetY"
      :minTime="minTime"
      :maxTime="maxTime"
      :maxTextWidth="mergedOptions.maxTextWidth"
      :footerHeight="mergedOptions.footerHeight"
    />
    <Grid
      :styles="styles"
      :data="data"
      :width="width"
      :height="height"
      :offsetY="mergedOptions.offsetY"
      :rowHeight="mergedOptions.rowHeight"
      :thickWidth="mergedOptions.thickWidth"
      :footerHeight="mergedOptions.footerHeight"
      :maxTextWidth="mergedOptions.maxTextWidth"
    />
    <Labels
      :styles="styles"
      :data="data"
      :onLabelClick="mergedOptions.onLabelClick"
      :offsetY="mergedOptions.offsetY"
      :rowHeight="mergedOptions.rowHeight"
    />
    <Bar
      :styles="styles"
      :data="data"
      :dataMode="mergedOptions.dataMode"
      :unit="unit"
      :height="height"
      :current="current"
      :offsetY="mergedOptions.offsetY"
      :minTime="minTime"
      :onClick="mergedOptions.onClick"
      :rowHeight="mergedOptions.rowHeight"
      :barHeight="mergedOptions.barHeight"
      :maxTextWidth="mergedOptions.maxTextWidth"
      :footerHeight="mergedOptions.footerHeight"
    />
    <Legend
      :styles="styles"
      :legends="mergedOptions.legends"
      :width="width"
      :height="height"
      :barHeight="mergedOptions.barHeight"
      :footerHeight="mergedOptions.footerHeight"
    />
  </svg>
</template>
<script>
import { DAY, getEndTime } from "@/assets/utils";
import getStyles from "@/assets/styles";
import Layout from "./Layout";
import DayHeader from "./DayHeader";
import WeekHeader from "./WeekHeader";
import MonthHeader from "./MonthHeader";
import Grid from "./Grid";
import Labels from "./Labels";
import Bar from "./Bar";
import Legend from "./Legend";
const LEGENDS = [
  { type: "yellow", name: "期望" },
  { type: "greenA", name: "实际" },
  { type: "buleA", name: "进行中" }
];
const UNIT = {
  day: DAY / 28,
  week: (7 * DAY) / 56,
  month: (30 * DAY) / 56
};
function NOOP() {}
export default {
  components: {
    Layout,
    DayHeader,
    WeekHeader,
    MonthHeader,
    Grid,
    Labels,
    Bar,
    Legend
  },
  props: {
    data: Array,
    options: Object
  },
  data() {
    return {
      current: new Date().getTime()
    };
  },
  computed: {
    mergedOptions() {
      const defaultOptions = {
        onClick: NOOP,
        onLabelClick: NOOP,
        viewMode: "day",
        dataMode: "all",
        maxTextWidth: 140,
        offsetY: 60,
        rowHeight: 30,
        barHeight: 16,
        thickWidth: 1.4,
        footerHeight: 36,
        legends: LEGENDS,
        extTime: [],
        styleOptions: {}
      };
      return Object.assign(defaultOptions, this.options);
    },
    unit() {
      const { viewMode } = this.mergedOptions;
      return UNIT[viewMode];
    },
    endTime() {
      return getEndTime({
        data: this.data,
        dataMode: this.mergedOptions.dataMode,
        current: this.current,
        unit: this.unit
      });
    },
    minTime() {
      const { extTime } = this.mergedOptions;
      return extTime[0] || this.endTime.minTime;
    },
    maxTime() {
      const { extTime } = this.mergedOptions;
      return extTime[1] || this.endTime.maxTime;
    },
    width() {
      const { maxTextWidth } = this.mergedOptions;
      return (this.maxTime - this.minTime) / this.unit + maxTextWidth;
    },
    height() {
      const { rowHeight, offsetY, footerHeight } = this.mergedOptions;
      return this.data.length * rowHeight + offsetY + footerHeight;
    },
    styles() {
      const { styleOptions } = this.mergedOptions;
      return getStyles(styleOptions);
    }
  }
};
</script>
