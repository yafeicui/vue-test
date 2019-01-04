<template>
	<div :style="{width:echartData.boxSize.width,height:echartData.boxSize.height}" ref="echartname"></div>
</template>
<script>
	import echarts from "echarts";
	export default {
		props: ['echartData'],
		data() {
			return {
        color: ['#61A5E8','#7ECF51','#025ED9','#0067A6','#00ABD8','#008972','#EFC028','#F2572D','#F57773','#DBF977','#DE9DD6','#4FC5C7','#83A6F5']
			}
		},
		methods: {
			drawGrap(){
				var justData = this.echartData.histoGramData//将柱状图得知赋值给justData
        var myChart = echarts.init(this.$refs.echartname, 'vintage');
        var colors = this.color;
				// var option = myChart._option;
				// 绘制图表 配置图标和数据同步更新
				myChart.setOption({
				    title:  Object.assign({},{//标题组件，包含主标题和副标题。
              // text: justData.title.text || '',//文本标题
              left: 'left',
				    	textStyle: {// 字体设置
                fontSize: 16
              }
            }, justData.title),
            //提示框组件
				    tooltip: justData.tooltip === 'radio' ? Object.assign({}, {
              formatter: function(params){
                  var res="";
                    res += params[0]['axisValue'] + ' : ' + (params[0]['data']*100).toFixed(2)+"%";
                  return res;
              }
            }, {trigger: 'axis',axisPointer : {type : 'shadow'}}) : Object.assign({}, {trigger: 'axis',axisPointer : {type : 'shadow'}}, justData.tooltip),
				    grid: {//所有内容所形成的矩形的位置 
				    	containLabel: true
				    },
				    legend:Object.assign({}, justData.legend),
				    xAxis: Object.assign({},{
				        type: 'category',
                boundaryGap: false,
                nameLocation: 'end',
                boundaryGap: ['20%', '20%'],
                data: justData.xAxis.data,
                axisLabel:{  
                  // show: false,
                  interval:0,  
                  rotate:80,//倾斜度 -90 至 90 默认为0  
                  margin:10 
                }  
				    }, justData.xAxis),
				    yAxis:  justData.yAxis === 'radio' ? {
              name: '(单位：%)',
              axisLabel: {
                  formatter: function (val) {
                    return (parseFloat(val * 100)).toFixed(2);
                }
              }
            } : Object.assign({},{ type: 'value' } ,justData.yAxis),
				    series:[
              {
                type: 'bar',
                data: justData.series,
                itemStyle:{
                  normal:{
                    color:function (params){
                      var colorList = colors
                      return colorList[params.dataIndex];
                    }
                  }
                }
              }
            ]
				},true);
			}
		},
		mounted(){
			this.drawGrap();
		}
	}
</script>