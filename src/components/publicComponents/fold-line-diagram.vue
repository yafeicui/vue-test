<template>
	<div :style="{width:echartData.boxSize.width,height:echartData.boxSize.height,padding:0}" ref="echartname"></div>
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
				echarts.registerTheme('customed',{
					"color": ["#28C2F5", "#3E8EDA", "#F4516C", "##716ACA","#FFB822","#33D7A7", "#ca8622", "#bda29a", "#6e7074", "#546570", "#c4ccd3"]
				})
				var justData = this.echartData.histoGramData//将折线图得知赋值给justData
				var myChart = echarts.init(this.$refs.echartname, 'customed');
				// 绘制图表 配置图标和数据同步更新
				myChart.setOption({
				    title: {//标题组件，包含主标题和副标题。
				    	text: justData.title.text || '',//文本标题
				    	subtext: justData.title.subtext || '',
				    	textStyle: justData.title.textStyle || {// 字体设置
							fontSize: 12
						}
				    },
				    tooltip: justData.tooltip || {//提示框组件
				        trigger: 'axis',
				    },
				    grid: justData.grid || {//所有内容所形成的矩形的位置 
				    	containLabel: true
				    },
				    legend:justData.legend || {},
				    xAxis: {
				        type: justData.xAxis.type || 'category',
						boundaryGap: justData.xAxis.boundaryGap || false,//是否x轴从零点开始
						axisLabel: {  
							interval: 0  
						},
				        data: justData.xAxis.data
				    },
				    yAxis: justData.yAxis || {
				        type: 'value'
				    },
				    series:justData.series || []
				},true);
			}
		},
		mounted(){
			this.drawGrap();
		}
	}
</script>
<style scoped>
	
</style>