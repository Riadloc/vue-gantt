<template>
  <g class="labels">
    <g v-for="(v, i) in data" :key="i" :style="{cursor: 'pointer'}" @click="(v) => onLabelClick(v)">
      <text
        :x="10"
        :y="(i + 0.5) * rowHeight + offsetY"
        :style="styles.groupLabel"
      >{{v.name}}
      </text>
    </g>
  </g>
</template>
<script>
export default {
  props: ["styles", "data", "onLabelClick", "offsetY", "rowHeight"]
};
</script>
