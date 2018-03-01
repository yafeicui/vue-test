<template>
  <ht-page title="规则分析">

    <div class="firstBar">
      <echartBar :echartData="firstEchartData"></echartBar>
    </div>
    <div class="firstBar">
      <echartBar :echartData="secondEchartData"></echartBar>
    </div>
    
  </ht-page>
</template>
<script>
  import echarts from "echarts";
  import echartBar from "@/components/publicComponents/ht-echart-bar.vue"
  export default {
    data() {
      return {
        width: '100%',
        firstEchartData: {},
        secondEchartData: {}
      }
    },
    components: {
      echartBar
    },
    methods: {
      firstEchart() {
        this.firstEchartData = {
          size: {
            width: this.width,
            height: '300px'
          },
          barData: {
            title: {
              text: '规则1'
            },
            legend: {
                data:['Forest', 'Steppe', 'Desert', 'Wetland']
            },
            xAxis: {
              type: 'category',
              axisTick: {show: false},
              data: ['2012', '2013', '2014', '2015', '2016']
            },
            series: [
              {
                  name: 'Forest',
                  type: 'bar',
                  barGap: 0,
                  data: [320, 332, 301, 334, 390]
              },
              {
                  name: 'Steppe',
                  type: 'bar',
                  data: [220, 182, 191, 234, 290]
              },
              {
                  name: 'Desert',
                  type: 'bar',
                  data: [150, 232, 201, 154, 190]
              },
              {
                  name: 'Wetland',
                  type: 'bar',
                  data: [98, 77, 101, 99, 40]
              }
            ]
          }
        }
      },
      secondEchart() {
        this.secondEchartData = {
          size: {
            width: this.width,
            height: '300px'
          },
          barData: {
            title: {
              text: '规则2'
            },
            legend: {
                data:['销售额']
            },
            xAxis: {
              type: 'category',
              axisTick: {show: false},
              data: ['2012', '2013', '2014', '2015', '2016']
            },
            series:[
              {
                type: 'bar',
                itemStyle: {
                  color: 'green',
                  borderColor: '#ccc'
                },
                data: [1111, 1242, 987, 1536, 888]
              }
            ]
          }
        }
      }
    },
    beforeMount() {
      this.firstEchart();
      this.secondEchart();
    }
  }
</script>
<style scoped>
  .rule {
    display: flex;
    justify-content: space-between;
  }
  .firstBar {
    width: 50%;
    float: left;
  }
</style>
