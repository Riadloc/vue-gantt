<template>
  <Gantt v-if="formattedData.length" :data="formattedData" :options="formattedOptions"/>
  <div v-else>暂无数据！</div>
</template>
<script>
import { formatData, textWidth } from "@/assets/utils";
import { getFont } from "@/assets/styles";
import Gantt from "./Gantt";
export default {
  components: { Gantt },
  props: {
    data: Array,
    options: Object
  },
  computed: {
    formattedData() {
      return formatData(this.data);
    },
    formattedOptions() {
      const { options } = this;
      const font = getFont(options.styleOptions || {});
      options.maxTextWidth = Math.max(
        ...this.formattedData.map(v => textWidth(v.name, font, 20))
      );
      return options;
    }
  }
};
</script>
