<template>
  <div></div>
</template>
<script>
import { formatTime, textWidth } from "@/assets/utils";
import { getFont } from "@/assets/styles";
export default {
  props: {
    data: Array,
    options: Object
  },
  data() {
    return {
      formatted: {
        data: [],
        options: {}
      }
    };
  },
  mounted() {
    let { data, options } = this;
    data = formatTime(data);
    const font = getFont(options.styleOptions || {});
    options.maxTextWidth = Math.max(
      ...data.map(v => textWidth(v.name, font, 20))
    );
  }
};
</script>
