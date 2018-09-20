<template>
  <div id="app">
    <button @click="init">生成数据</button>
    <select @change="changeOpt">
      <option value="day">day</option>
      <option value="week">week</option>
      <option value="month">month</option>
    </select>
    <SVGGantt :data="data" :options="options"/>
  </div>
</template>

<script>
import SVGGantt from "./components/SVGGantt";
export default {
  name: "app",
  components: { SVGGantt },
  data() {
    const options = {
      viewMode: "day",
      dataMode: "all",
      onClick: evt => {
        const ref = evt.currentTarget;
        console.log(ref);
      },
      onLabelClick: v => console.log(v)
    };
    return {
      data: [],
      options: options
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.data = this.getData();
    },
    changeOpt(evt) {
      this.$set(this.options, "viewMode", evt.target.value);
    },
    rand(begin) {
      let date;
      let days;
      if (begin) {
        days = Math.random() * 60 + 5;
        date = new Date(begin);
      } else {
        days = Math.random() * 60 - 60;
        date = new Date();
      }
      date.setDate(date.getDate() + days);
      return date;
    },
    getData() {
      const data = [
        {
          id: 11,
          name: "Requirements"
        },
        {
          id: 12,
          name: "Design"
        },
        {
          id: 13,
          name: "Implement"
        },
        {
          id: 14,
          name: "Verification"
        },
        {
          id: 21,
          name: "Preliminary"
        },
        {
          id: 22,
          name: "Systems design"
        },
        {
          id: 23,
          name: "Development"
        },
        {
          id: 24,
          name: "Integration"
        }
      ];
      data.forEach((item, index) => {
        /* eslint-disable */
        item.expt_begin = this.rand();
        item.expt_end = this.rand(item.expt_begin);
        item.real_begin = this.rand();
        item.real_end = index % 2 ? this.rand(item.real_begin) : null;
      });
      return data;
    }
  }
};
</script>
