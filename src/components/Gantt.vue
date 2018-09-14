<template>
  <svg></svg>
</template>
<script>
import { DAY, getEndTime } from "@/assets/utils";
import getStyles from "@/assets/styles";
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
  props: {
    data: Array,
    options: {
      type: Object,
      default: function() {
        return {
          onClick: NOOP,
          onLabelClick: NOOP,
          viewMode: "week",
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
      }
    }
  },
  data() {
    return {
      box: "",
      styles: {}
    };
  },
  mounted() {
    const {
      viewMode,
      dataMode,
      extTime,
      maxTextWidth,
      rowHeight,
      footerHeight,
      offsetY,
      styleOptions
    } = this.options;
    const unit = UNIT[viewMode];
    const current = new Date().getTime();
    let { minTime, maxTime } = getEndTime({
      data: this.data,
      dataMode,
      current,
      unit
    });
    minTime = extTime[0] || minTime;
    maxTime = extTime[1] || maxTime;
    const width = (maxTime - minTime) / unit + maxTextWidth;
    const height = this.data.length * rowHeight + offsetY + footerHeight;
    this.box = `0 0 ${width} ${height}`;
    this.styles = getStyles(styleOptions);
  }
};
</script>
