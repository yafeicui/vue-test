<template>
  <div class="rule">
    <div id="main" :style="{width: echartData.size.width, height:echartData.size.height}" ref="echartname"></div>
  </div>
</template>
<script>
  import echarts from "echarts";
  export default {
    props: ['echartData'],
    data() {
      return {

      }
    },
    methods: {
      drawEchart() {
        var justData = this.echartData.barData//将柱状图得知赋值给justData
				var myChart = echarts.init(this.$refs.echartname);
        var option = {
            title: {
                text: justData.title.text || '',
                textStyle: {
                  fontSize: 16
                }
            },
            tooltip: {},
            legend: justData.legend || {},
            xAxis: justData.xAxis || {},
            yAxis: {},
            series: justData.series || []
        };
        myChart.setOption(option);
      }
    },
    mounted() {
      this.drawEchart()
    }
  }
</script>
<style scoped>

</style>
