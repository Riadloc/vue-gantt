<template>
  <g class="bar">
    <g v-for="(v, i) in bars" :key="i" style="cursor: pointer" @click="($event) => onClick($event, v)">
      <line :x1="cur" :x2="cur" :y1="offsetY" :y2="height - footerHeight" :style="styles.cline" />
      <template v-if="dataMode === 'all' && !v.skip">
        <rect :x="v.x" :y="v.EY" :width="v.w1" :height="barHeight/2" rx="1.8" ry="1.8" :style="styles.yellow" />
        <rect v-if="v.w2" :x="v.x1" :y="v.y" :width="v.w2" :height="barHeight" rx="1.8" ry="1.8" :style="styles.greenA" />
        <rect v-if="v.w3>0" :x="v.x1" :y="v.y" :width="v.w3" :height="barHeight" :style="styles.buleA" />
        <path v-if="v.w3>0" :d="`M${v.x1+v.w3} ${v.y} L${v.x1+v.w3} ${v.y+barHeight} L${v.x1+v.w3+2*barHeight/3} ${v.y+barHeight/2} Z`" :style="styles.buleA"/>
      </template>
      <template v-else-if="dataMode === 'expect' && !v.skip">
        <rect :x="v.x" :y="v.y" :width="v.w1" :height="barHeight" rx="1.8" ry="1.8" :style="styles.yellow" />
      </template>
      <template v-else-if="dataMode === 'reality' && !v.skip">
        <rect v-if="v.w1" :x="v.x1" :y="v.y" :width="v.w1" :height="barHeight" rx="1.8" ry="1.8" :style="styles.greenA" />
        <rect v-if="v.w2" :x="v.x1" :y="v.y" :width="v.w2" :height="barHeight" :style="styles.buleA" />
        <path v-if="v.w2" :d="`M${v.x1+v.w2} ${v.y} L${v.x1+v.w2} ${v.y+barHeight} L${v.x1+v.w2+2*barHeight/3} ${v.y+barHeight/2} Z`" :style="styles.buleA"/>
      </template>
    </g>
  </g>
</template>
<script>
export default {
  props: [
    "data",
    "unit",
    "dataMode",
    "offsetY",
    "minTime",
    "rowHeight",
    "barHeight",
    "maxTextWidth",
    "current",
    "styles",
    "height",
    "onClick",
    "footerHeight"
  ],
  computed: {
    cur() {
      const { maxTextWidth, current, minTime, unit } = this;
      return maxTextWidth + (current - minTime) / unit;
    },
    bars() {
      const {
        data,
        dataMode,
        maxTextWidth,
        rowHeight,
        barHeight,
        offsetY,
        current,
        minTime,
        unit
      } = this;
      const x0 = maxTextWidth;
      const y0 = (rowHeight - barHeight) / 2 + offsetY;
      let bars = [];
      if (dataMode === "all") {
        bars = data.map((v, i) => {
          let [x, x1, w1, w2, w3] = Array.from(5, () => 0);
          if (!v.expt_end) {
            return { skip: true };
          }
          if (!v.expt_begin) {
            // 若无期望开始时间，则期望开始时间置为创建时间
            x = x0 + (v.init_time - minTime) / unit;
            w1 = (v.expt_end - v.init_time) / unit;
          } else {
            x = x0 + (v.expt_begin - minTime) / unit;
            w1 = (v.expt_end - v.expt_begin) / unit;
          }
          if (v.real_begin) {
            x1 = x0 + (v.real_begin - minTime) / unit;
            if (!v.real_end) {
              // 若无实际结束时间，则实际开始时间置为现在
              w3 = (current - v.real_begin) / unit || 1;
            } else {
              w2 = (v.real_end - v.real_begin) / unit;
            }
          } else if (v.real_end) {
            // 若无实际开始时间，则实际开始时间置为创建时间
            x1 = x0 + (v.init_time - minTime) / unit;
            w2 = (v.real_end - v.init_time) / unit;
          }
          // 裁剪越界的范围(剪去0-x0范围内的部分)
          if (x < x0) {
            if (x + w1 > x0) x = x0;
            else w1 = 0;
          }
          if (x1 < x0) {
            if (x1 + w2 > x0 || x1 + w3 > x0) x1 = x0;
            else {
              w2 = 0;
              w3 = 0;
            }
          }
          const y = y0 + i * rowHeight;
          const EY = y + barHeight / 4;
          return Object.assign(
            {
              x,
              x1,
              w1,
              w2,
              w3,
              y,
              EY
            },
            v
          );
        });
      } else if (dataMode === "expect") {
        bars = data.map((v, i) => {
          let [x, w1] = Array.from(5, () => 0);
          if (!v.expt_end) {
            return v;
          } else {
            if (!v.expt_begin) {
              x = x0 + (v.init_time - minTime) / unit;
              w1 = (v.expt_end - v.init_time) / unit;
            } else {
              x = x0 + (v.expt_begin - minTime) / unit;
              w1 = (v.expt_end - v.expt_begin) / unit;
            }
          }
          // 裁剪越界的范围
          if (x < x0) {
            if (x + w1 > x0) x = x0;
            else w1 = 0;
          }
          const y = y0 + i * rowHeight;
          return Object.assign({ x, y, w1 }, v);
        });
      } else if (dataMode === "reality") {
        bars = data.map((v, i) => {
          let [x1, w1, w2] = Array.from(5, () => 0);
          if (v.real_begin) {
            x1 = x0 + (v.real_begin - minTime) / unit;
            if (!v.real_end) {
              w2 = (current - v.real_begin) / unit || 1;
            } else {
              w1 = (v.real_end - v.real_begin) / unit;
            }
          } else if (v.real_end) {
            x1 = x0 + (v.init_time - minTime) / unit;
            w1 = (v.real_end - v.init_time) / unit;
          } else {
            return { skip: true };
          }
          // 裁剪越界的范围
          if (x1 < x0) {
            if (x1 + w1 > x0 || x1 + w2 > x0) x1 = x0;
            else {
              w1 = 0;
              w2 = 0;
            }
          }
          const y = y0 + i * rowHeight;
          return Object.assign({ x1, y, w1, w2 }, v);
        });
      }
      return bars;
    }
  }
};
</script>
