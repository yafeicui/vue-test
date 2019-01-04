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
				var justData = this.echartData.histoGramData//将折线图得知赋值给justData
				var myChart = echarts.init(this.$refs.echartname, 'vintage');
        // var option = myChart._option;
        // console.log(justData)
				// 绘制图表 配置图标和数据同步更新
				myChart.setOption({
          tooltip: {
            trigger: 'axis',
            position: function (pt) {
                return [pt[0], '10%'];
            }
          },
          title: {
            text: justData.title.text || '',//文本标题
              left: 'left',
				    	textStyle: {// 字体设置
                fontSize: 16
              }
          },
          xAxis: {
              type: 'category',
              boundaryGap: false,
              data: justData.xAxis.data
          },
          yAxis: {
            type: 'value',
            name: justData.yAxis.name || '',
            boundaryGap: [0, '10%']
          },
          dataZoom: [{
            type: 'inside',
            start: 0,
            end: 10
          }, {
              start: 0,
              end: 10,
              handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
              handleSize: '80%',
              handleStyle: {
                color: '#fff',
                shadowBlur: 3,
                shadowColor: 'rgba(0, 0, 0, 0.6)',
                shadowOffsetX: 2,
                shadowOffsetY: 2
              }
          }],
          series: justData.series

        },true);
			}
		},
		mounted(){
			this.drawGrap();
		}
	}
</script>