<template>
	<div :style="{width:echartData.boxSize.width,height:echartData.boxSize.height}" ref="echartname"></div>
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
			drawGrap(){
				var justData = this.echartData.histoGramData//将饼状图得知赋值给justData
				var myChart = echarts.init(this.$refs.echartname, 'vintage');
				// var option = myChart._option;
				// 绘制图表 配置图标和数据同步更新
				myChart.setOption({
          title : Object.assign({},
          {
            text: '',
            subtext: '',
            x:'left',
            textStyle: {// 字体设置
              fontSize: 16
            }, },justData.title) ,

          tooltip : Object.assign({}, {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
          }, justData.tooltip) ,
          legend: Object.assign({}, {
              type: 'scroll',
              orient: 'vertical',
              right: 10,
              top: 20,
              bottom: 20
            },justData.legend) ,
          color: justData.color,
          series: justData.series || []
				},true);
			}
		},
		mounted(){
			this.drawGrap();
		}
	}
</script>