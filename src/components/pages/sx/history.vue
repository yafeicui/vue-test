<template>
	<ht-page title="历史信息">
		<div class="history-box">
			<!-- 历史评分图表 -->
			<history-score-diagram :echart-data="firstLineEchartData" v-if="historyScore.length != 0"></history-score-diagram>
			<div class="no-message" v-if="historyScore.length == 0 && historyCredit.length != 0">暂无数据</div>
			<!-- 历史授信图表 -->
			<div style="width:50%;height:400px;display:flex;justify-content: flex-start;" v-if="historyCredit.length != 0">
				<history-credit-diagram :echart-data="axiosBar" v-if="creditResultData[0]"></history-credit-diagram>
				<history-credit-diagram v-for="(item, index) in creditResultData" :key="index" :echart-data="item" v-if="item.boxSize"></history-credit-diagram>
			</div>
			<div class="show-list">
				<div v-for="(item, index) in productList" :key="index" style="display: flex">
					<div :style="{width: `20px`,height: `10px`, background: item.bgcolor, marginRight: `5px`}"></div>
					<div style="marginRight: 10px; lineHeight: 10px">{{item.name}}</div>
				</div>
			</div>
		</div>
		<!-- 历史额度图表 -->
		<div class="quota-box">
			<fold-line-diagram v-for="(item, index) in foldLineDiagramArr" :key="index" v-if="item.boxSize" :echart-data="item"></fold-line-diagram>
		</div>
	</ht-page>
</template>
  <script>
      import historyScoreDiagram from "@/components/publicComponents/fold-line-diagram.vue";
      import historyCreditDiagram from "@/components/publicComponents/fold-line-diagram.vue";
      import foldLineDiagram from "@/components/publicComponents/fold-line-diagram.vue";
      export default {
				props: ['payload'],
				data() {
    	    return {
						firstLineEchartData: null,//第一个折线图数据
						// 图形数据
						historyScore: [],
						historyCredit: [],
						historyUse: [],
						// 历史评分折线图
						historyScoreDate: [],
						historyScoreValue: [],
						// 历史授信柱状图
						historyCreditName: [],
						historyCreditDate: [],
						historyCreditValue: [],
						// 历史额度折线图
						historyUseDate: [],
						historyUseValue: [],
						// 历史额度折线图数据数组
						foldLineDiagramArr: [],
						// 柱状图
						axiosBar: null,//单独纵轴
						maxAxios: 0, //纵轴最大数据
						creditBarData: [],
				  creditResultData: [],//循环时间轴数据
				  bgColor: ["#60D5EE", "#596AD6", "#8B31EB", "#E25C6F", "#F5BA49", "#61BCA4"],
				  productList: [],
              }
          },
          components: {
              historyScoreDiagram,
              historyCreditDiagram,
              foldLineDiagram
          },
		methods: {
			// 判断数组中是否有某元素
			contains(arr, obj) {  
				var i = arr.length;  
				while (i--) {  
					if (arr[i] === obj) {  
						return true;  
					}  
				}  
				return false;  
			},
			// 数组去重
			unique (arr) {
				var res = [];
				var json = {};
				for(var i = 0; i < arr.length; i++){
					if(!json[arr[i]]){
						res.push(arr[i]);
						json[arr[i]] = 1;
					}
				}
				return res;
			},
			handleGetDiagramDate () {
				this.historyScore = [
					{
						"creditScore": 19, //评分
						"acctDate": "2018-1-4", //日期
					},
					{
						"creditScore": 25, //评分
						"acctDate": "2018-2-14", //日期
					},
					{
						"creditScore": 13, //评分
						"acctDate": "2018-3-4", //日期
					}
				];//历史评分折线数据
				this.historyCredit = [
					{
						acctDate: '2018-01-03',
						limitAmt: 6000000,
						productCd: "pro1",
						productName: '信用贷'
					},
					{
						acctDate: '2018-01-03',
						limitAmt: 9000000,
						productCd: "pro2",
						productName: '消费贷'
					},
					{
						acctDate: '2018-01-09',
						limitAmt: 8000000,
						productCd: "pro2",
						productName: '消费贷'
					},
					{
						acctDate: '2018-01-09',
						limitAmt: 6000000,
						productCd: "pro1",
						productName: '信用贷'
					},
					{
						acctDate: '2018-01-15',
						limitAmt: 3000000,
						productCd: "pro1",
						productName: '信用贷'
					},
					{
						acctDate: '2018-01-16',
						limitAmt: 3000000,
						productCd: "pro1",
						productName: '信用贷'
					},
					{
						acctDate: '2018-01-16',
						limitAmt: 5600000,
						productCd: "pro3",
						productName: '信用贷1'
					},
					{
						acctDate: '2018-01-17',
						limitAmt: 3000000,
						productCd: "pro1",
						productName: '信用贷'
					}
				];// 历史授信数据
				this.foldLineDiagramArr = [
					{
						name: '理财',
						content: [
							{
								"outstndAmt": 1243, //已用金额
								"limitAmt": 3432, // 总金额
								"acctDate": "2018-1-4", //日期
								"productCd": "333" //产品编号
							},
							{
								"outstndAmt": 2453,  //已用金额
								"limitAmt": 3252, // 总金额
								"acctDate": "2018-2-4", //日期
								"productCd": "22" //产品编号
							},
							{
								"outstndAmt": 2453,  //已用金额
								"limitAmt": 3252, // 总金额
								"acctDate": "2018-2-5", //日期
								"productCd": "33" //产品编号
							}
						]
					},
					{
						name: '基金',
						content: [
							{
								"outstndAmt": 524,  //已用金额
								"limitAmt": 2453, // 总金额
								"acctDate": "2018-1-4", //日期
								"productCd": "11" //产品编号
							},
							{
								"outstndAmt": 2453,  //已用金额
								"limitAmt": 3252, // 总金额
								"acctDate": "2018-2-4", //日期
								"productCd": "22" //产品编号
							},
							{
								"outstndAmt": 2453,  //已用金额
								"limitAmt": 3252, // 总金额
								"acctDate": "2018-2-5", //日期
								"productCd": "33" //产品编号
							}
						]
					},
					{
						name: '基金',
						content: [
							{
								"outstndAmt": 524,  //已用金额
								"limitAmt": 2453, // 总金额
								"acctDate": "2018-1-4", //日期
								"productCd": "11" //产品编号
							},
							{
								"outstndAmt": 2453,  //已用金额
								"limitAmt": 3252, // 总金额
								"acctDate": "2018-2-4", //日期
								"productCd": "22" //产品编号
							},
							{
								"outstndAmt": 2453,  //已用金额
								"limitAmt": 3252, // 总金额
								"acctDate": "2018-2-5", //日期
								"productCd": "33" //产品编号
							},
							{
								"outstndAmt": 524,  //已用金额
								"limitAmt": 2453, // 总金额
								"acctDate": "2018-3-4", //日期
								"productCd": "11" //产品编号
							},
							{
								"outstndAmt": 2453,  //已用金额
								"limitAmt": 3252, // 总金额
								"acctDate": "2018-4-4", //日期
								"productCd": "22" //产品编号
							}
						]
					}
				];//历史额度数据
				// 历史评分折线图数据
				for(var i = 0; i < this.historyScore.length; i++) {
					this.historyScoreDate.push(this.historyScore[i].acctDate);
					this.historyScoreValue.push(this.historyScore[i].creditScore);
				}
				// 历史授信数据柱状图数据
				var middleDate = this.historyCredit;
				var dateArr = [];
				var numArr = [];
				//循环数据绘制图表
				middleDate.forEach((item, index) => {
					numArr.push(item.limitAmt);
					if(!this.contains(this.productList, item.productName)) {
						this.productList.push(item.productName);
					}
					if(!this.contains(dateArr, item.acctDate)) {
						dateArr.push(item.acctDate);
					}
					var obj = {};
					obj.name = item.productName;//柱子名称
					obj.type = 'bar';//柱子类型
					obj.data = [];
					obj.data.push(item.limitAmt);//柱子高度
					obj.barWidth = '15';//柱子宽度
					obj.barGap = 0,
					item.series = obj;
					item.time = item.acctDate;
				})
				this.productList.forEach((item, index) => {
					this.productList[index] = {name: item, bgcolor: this.bgColor[index]}
				})
				this.maxAxios = Math.max.apply(null, numArr);//获取最大的纵轴数据
				// 将同产品数据设置相同背景的颜色
				middleDate.forEach((item, index) => {
					this.productList.forEach((tar, sub) => {
						if(item.productName == tar.name) {
							item.series.itemStyle = {
								normal: {
									color: tar.bgcolor
								}
							}
						}
					})
				})
				// 将同日期的数据塞到同一数组
				dateArr.forEach((item, index) => {
					var obj = {};
					var sameArr = [];
					obj.time = item;
					obj.series = sameArr;
					middleDate.forEach((val, num) => {
						if(item == val.acctDate) {
							sameArr.push(val.series);
						}
					})
					this.creditBarData.push(obj);
				})
				// 赋值给图表数据
				this.historyScoreEchart();
				this.historyCreditEchart();
				this.historyQuotaEchart();
			},
			// 历史评分折线图数据
			historyScoreEchart () {
				this.firstLineEchartData = {
					boxSize: { //柱状图尺寸
						width: '49%',
						height: '400px'
					},
					histoGramData: {
						title: {
							text: '历史评分信息'
						},
						legend: {
							data:['评分'],
						},
						xAxis:  {
							data: this.historyScoreDate
						},
						series: [
							{
								name: '评分',
								type: 'line',
								data: this.historyScoreValue,
								lineStyle: {
									normal: {
										color: '#3A77CF'
									}
								},
								itemStyle: {
									normal: {
										color: '#3876CF'
									}
								}
							}
						]
					}
				}
			},
			// 历史授信数据柱状图数据
			historyCreditEchart () {
				this.axiosBar = {
					boxSize: { //柱状图尺寸
						width: '140px',
						height: '400px'
					},
					histoGramData: {
						title: {
							text: '历史授信信息'
						},
						grid: {
							right: '0%',
							left: '100'
						},
						xAxis : {
							type: 'category',
							data : []
						},
						yAxis: {
							max: this.maxAxios,
							splitLine : {
								show: false
							}
						},
						series : [
							{
								name: 'name',
								type: 'bar',
								data: [0],
								barWidth : 0//柱状图宽度
							}
						]
					}
				}
				for(let i = 0; i < this.creditBarData.length; i++) {
					var obj = {
						width: '16%',
						height: '400px'
					}
					this.creditResultData[i] = {
						boxSize: obj,
						histoGramData: {
							title: {
								text: ''
							},
							grid: {
								left: '0',
								right: '0',
							},
							xAxis : {
								data : [this.creditBarData[i].time]
							},
							yAxis: {
								max: this.maxAxios,
								show: false,
								splitLine : {
									show: false
								}
							},
							series: this.creditBarData[i].series
						}
							
					}
				}
			},
			// 历史额度折线图
			historyQuotaEchart () {
				for(var i = 0; i < this.foldLineDiagramArr.length; i++) {
					var xAxisDate = [];
					var used = [];
					var remain = [];
					// 对折线图数据进行拆分
					for(var j = 0; j < this.foldLineDiagramArr[i].content.length; j++) {
						xAxisDate.push(this.foldLineDiagramArr[i].content[j].acctDate);
						used.push(this.foldLineDiagramArr[i].content[j].limitAmt);
						remain.push(this.foldLineDiagramArr[i].content[j].outstndAmt);
					}
					var obj = null;
					obj = { //柱状图尺寸
						width: '49%',
						height: '400px'
					}
					this.foldLineDiagramArr[i] = {
						boxSize: obj,
						histoGramData: {
							title: {
								text: i == 0 ? '历史额度使用情况' : '',
								subtext: this.foldLineDiagramArr[i].name
							},
							legend: {
								data: ['总额度', '已用金额']
							},
							xAxis:  {
								boundaryGap: false,
								data: xAxisDate
							},
							yAxis: {
								type: 'value',
								// axisLabel: {//设置y轴单位
								// 	formatter: '{value} 元'
								// }
							},
							series: [
								{
									name: '总额度',
									type: 'line',
									data: used,
									lineStyle: {
										normal: {
											color: '#F4516C'
										}
									},
									itemStyle: {
										normal: {
											color: '#F4516C'
										}
									}
								},
								{
									name: '已用金额',
									type: 'line',
									data: remain,
									lineStyle: {
										normal: {
											color: '#4F86D4'
										}
									},
									itemStyle: {
										normal: {
											color: '#4F86D4'
										}
									}
								}
							]
						}
					}
				}
			}
		},
		beforeMount() {
			this.handleGetDiagramDate ()
		}
	}
</script>
<style scoped>
	.history-box {
		display: flex;
		justify-content: space-between;
		position: relative;
	}
	.show-list {
		display: flex;
		position: absolute;
		left: 75%;
		transform: translateX(-50%)
	}
	.no-message {
		width: 50%;
		height: 400px;
		line-height: 400px;
		text-align: center;
	}
	.quota-box {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
</style>

  