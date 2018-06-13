<template>
  <ht-page title="零售详情" class="echart-template">
    <ht-control-bar>
      <div slot="right">
        <el-button round type="primary" @click="goBack">返回</el-button>
      </div>
    </ht-control-bar>
    <ht-card>
      <el-form :model="ruleForm" ref="ruleForm" label-width="130px" class="demo-ruleForm limit-book-form"  v-readonly='true'>
        <el-row>
          <el-col :span="12">
            <el-form-item label="客户号" prop="clientId">
              <el-input v-model="ruleForm.clientId" class="search-input-condition"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="客户姓名" prop="clientName">
              <el-input v-model="ruleForm.clientName" class="search-input-condition"></el-input>      
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <!-- <el-col :span="12">
            <el-form-item label="客户证件类型" prop="idType">
              <el-select v-model="ruleForm.idType" class="search-input-condition" disabled>
                  <el-option v-for="item in dictAll.id_type" :key="item.value" :label="item.name" :value="item.value"></el-option>
              </el-select> 
            </el-form-item>
          </el-col> -->
          <el-col :span="12">
            <el-form-item label="客户证件号" prop="idNum">
              <el-input v-model="ruleForm.idNum" class="search-input-condition"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号码" prop="mobile">
              <el-input v-model="ruleForm.mobile" class="search-input-condition"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="客户经理" prop="cstManager">
              <el-input v-model="ruleForm.managers" class="search-input-condition"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="部门" prop="orgCode">
              <el-input v-model="ruleForm.mgrOrgNames" class="search-input-condition"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </ht-card>
    <div class="bar-box">
      <div class="line-search-box">
        <el-select v-model="barForm.type" placeholder="请选择类型" clearable class="search-condition">
          <el-option v-for="item in selectList" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-date-picker class="search-condition" v-model="barForm.date" type="date" value-format="yyyy-MM-dd" clearable></el-date-picker>
        <el-button round type="primary" @click="handleSearchBarData" :disabled="this.barForm.type && this.barForm.date ? false : true">查询</el-button>
      </div>
      <first-bar :echartData="depositBarData" v-if="isShowBar"></first-bar>
      <second-bar :echartData="secondBarData" v-if="isShowBar"></second-bar>
      <div class="bar-hidden" v-if="!isShowBar">暂无数据</div>
    </div>
    <div class="line-box">
      <div class="line-search-box">
        <el-select v-model="lineForm.type" placeholder="请选择类型" clearable class="search-condition">
          <el-option v-for="item in lineSelectList" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <!-- <el-date-picker class="search-condition" v-model="lineForm.date" type="date" value-format="timestamp" clearable></el-date-picker> -->
        <el-button round type="primary" @click="handleSearchLine" :disabled="this.lineForm.type ? false : true">查询</el-button>
      </div>
      <fold-line :echartData="foldLineData" v-if="isShowLine"></fold-line>
      <div class="bar-hidden" v-if="!isShowLine">暂无数据</div>
    </div>
    <ht-card v-if="leftTableList">
      <el-tabs tab-position="left" v-model="activeName">
        <el-tab-pane v-for="val in leftTableList" :label="val.name" :key="val.code" :name="val.code">
          <component :is="getTableCpn(val.code)" :producttype="val.code" :clientId="tabClientId"/>
        </el-tab-pane>
      </el-tabs>
    </ht-card>
  </ht-page>
</template>
<script>
  import FirstBar from '@/components/echart/bar';
  import SecondBar from '@/components/echart/bar';
  import FoldLine from '@/components/echart/line';
  import LoanTable from './table/loan-table.vue';
  import CurrentTable from './table/current-table.vue';
  import ZhengcunTable from './table/zheng-cun-table.vue';
  import SmartDepositTable from './table/smart-deposit-table.vue';
  // import StructureTable from '../comment-table/structure-table.vue';
  import echarts from "echarts";
  
  export default {
    data() {
      return {
        tableAjaxConfig: null,
        // ...this.config.PAGINATION_CONTENT,
        listKey:'data',
        ruleForm: {
          clientId: '',//客户号
          clientName: '',//客户姓名
          idType: '',//证件类型
          idNum: '',//证件号码
          mobile: '',//联系号码
          cstManager: '',//客户经理
          orgCode: ''//部门
        },
        // 柱状图查询条件
        barForm: {
          type: '/loans',
          date: this.timeFormat(Date.parse(new Date()), 0)
        },
        selectList: [
          {
            value: '/loans',
            label: '贷款'
          }, {
            value: '/deposits',
            label: '存款'
          }, {
            value: '/aumData',
            label: 'AUM'
          }
        ],
        //折线图查询条件
        lineForm: {
          type: 7,
          date: Date.parse(new Date())
        },
        lineSelectList: [
          { label: '近七天', value: 7 },
          { label: '近一个月', value: 30 },
          { label: '近三个月', value: 90 },
          { label: '近半年', value: 182 },
        ],
        depositBarData: {},//第一个柱状图数据
        secondBarData: {},//第二个柱状图
        foldLineData: {},//折线图
        leftTableList: {},
        tabClientId: '',//传到表格查询的条件 
        activeName: '0',
        barDate: '',//柱状图横坐标日期
        isShowBar: false,
        isShowLine: false,
      }
    },
    components: {
      FirstBar,
      SecondBar,
      FoldLine,
      LoanTable,
      CurrentTable,
      ZhengcunTable,
      SmartDepositTable,

      // StructureTable
    },
    methods: {
      // 返回按钮
      goBack() {
        this.$router.go('-1');
      },
      getTableCpn(activeName) {
        // console.log(activeName, 8989)
        // PERSON_HQ // 活期
        // PERSON_ZCZQ_DQ 整存整取
        // PERSON_ZNCK_DQ 智能存款
        // ORG_HQ 单位活期存款 
        // ORG_DQ 单位定期存款
        // ORG_ZNTZ_DQ 智能通知存款 定期
        // ORG_JGXCK_DQ 结构性存款
        // FINANCE_HQ 同业存放活期
        // FINANCE_DQ 同业存放定期
        // FINANCE_XYCK_DQ 同业协议存款  定期
        // FINANCE_JGXCK_DQ 同业结构性存款
        // PERSON_DK 个人贷款
        // ORG_DK 单位贷款
        // FINANCE_DK 单位贷款

        const dict = {
          "PERSON_HQ": CurrentTable,
          "PERSON_ZCZQ_DQ": ZhengcunTable,
          "PERSON_ZNCK_DQ": SmartDepositTable,
          'PERSON_DK': LoanTable,
          'ORG_DK': LoanTable,
          'FINANCE_DK': LoanTable,
        }
        return dict[`${activeName}`]
      },
      // 获取表单数据
      handleGetFormData() {
        this.$http({
          // url: `/api/personCsts/`+ this.$route.query.clientId,
          url: `/api/personCsts/`+ 100000106128,
          method: 'get'
        }).then((res) => {
          Object.assign(this.ruleForm, res.data.data)
        })
      },
      // 搜索柱状图数据
      handleSearchBarData() {
        this.handleGetBarData(this.barForm.date,this.barForm.type);
      },
      handleGetBarData(date,url) {
        var path = '';
        switch(url) {
          case '/loans': path = `/api/crm/loans`; break;
          case '/deposits': path = `/api/crm/deposits`; break;
          case '/aumData': path = `/api/crm/aumData/`; break;
          default: break;
        }
        this.isShowBar = false;//隐藏柱状图
        this.$http({
          url: path,
          method: 'get',
          params: {
            date: date,
            clientId: this.$route.query.clientId
          }
        }).then(res => {
          var res = res.data.data;
          // if(!res) return;
          var firstArr = [res.balance,res.balanceBasis,res.balanceChain,res.dayOfYearBalance,res.yearBasis,res.yearChain,res.dayOfQuarterBalance,res.quarterBasis,res.quarterChain,res.dayOfMonthBalance,res.monthBasis,res.monthChain];
          var secondArr = [res.balanceBasisRatio,res.balanceChainRatio,res.yearBasisRatio,res.yearChainRatio,res.quarterBasisRatio,res.quarterChainRatio,res.monthBasisRatio,res.monthChainRatio];
          this.handleSetBarData(firstArr, secondArr);
        })
      },
      handleSetBarData(firstData, secondData) {
        this.isShowBar = true;//显示柱状图
        this.depositBarData = {
          boxSize: { //柱状图尺寸
						width: '49%',
						height: '500px'
          },
          histoGramData: {
            title: {
              text: '增长量'
            },
						xAxis:  {
              type : 'category',
							data: ['时点余额金额','时点余额同比增长量','时点余额环比增长量','年日均余额','年日均同比增长量','年日均环比增长量','季日均余额','季日均同比增长量','季日均环比增长量','月日均余额','月日均同比增长量','月日均环比增长量']
            },
            yAxis: {
              name: '(单位： 元)'
            },
            series: firstData
					}
        }
        this.secondBarData = {
          boxSize: { //柱状图尺寸
						width: '49%',
						height: '500px'
          },
          histoGramData: {
            title: {
              text: '增长率'
            },
						xAxis:  {
              type : 'category',
							data: ['时点余额同比增长率','时点余额环比增长率','年日均同比增长率','年日均环比增长率','季日均同比增长率','季日均环比增长率','月日均同比增长率','月日均环比增长率']
            },
            yAxis: 'radio',
            tooltip: 'radio',
						series: secondData
					}
        }
      },
      // 折线图
      handleSearchLine() {
        this.isShowLine = false;//隐藏折线图
        var start = '';
        var end = this.timeFormat(this.lineForm.date, 0);
        // switch(this.lineForm.type) {
        //   case 7: start = this.timeFormat(this.lineForm.date, 7); break;
        //   case 30: start = this.timeFormat(this.lineForm.date, 30);break;
        //   case 90: start = this.timeFormat(this.lineForm.date, 90);break;
        //   case 182: start = this.timeFormat(this.lineForm.date, 182);break;
        //   case 365: start = this.timeFormat(this.lineForm.date, 365);break;
        // }
        start = this.timeFormat(this.lineForm.date, this.lineForm.type);
        this.handleSearchLineData(start, end);
      },
      handleSearchLineData(start, end) {
        this.foldLineData = {};
        this.$http({
          // url: `/api/personCsts/`+ this.$route.query.clientId + '/aum',
          url: `/api/personCsts/`+ 100000106128 + '/aum',
          method: 'get',
          params: {
            clientId: this.$route.query.clientId,
            // start: start,
            // end: end
            num: this.lineForm.type
          }
        }).then(res => {
          this.handleGetLineData(res.data.data);
        })
      }, 
      handleGetLineData(val) {
        var lineData = [...val];
        var date = [];
        var data = [];
        lineData.map(ele => {
          date.push(Object.keys(ele));
          data.push(Object.values(ele)[0])
        })
        this.isShowLine = true;
        this.foldLineData = {
          boxSize: { //柱状图尺寸
						width: '100%',
						height: '400px'
          },
          histoGramData: {
            title: {
              text: 'AUM走势图'
            },
            xAxis: {
                data: date
            },
            yAxis: {
              name: ''
            },
            series: [
                {
                  name:'数值',
                  type:'line',
                  smooth:true,
                  symbol: 'none',
                  sampling: 'average',
                  itemStyle: {
                      normal: {
                          color: 'green'
                      }
                  },
                  smooth: false,
                  data: data
                }
            ]
          }
        }
      },      
      // 获取循环表格数据
      handleGetTableData() {
        this.$http({
          url:`/api/personCsts/`+ this.$route.query.clientId + '/productType',
          method: 'get'
        }).then(res => {
          this.tabClientId = this.$route.query.clientId;
          this.leftTableList =  [...res.data.data]; 
          this.activeName = this.leftTableList[0].code;//默认激活第一个
        })
      },
      // 转换日期样式
      add0(m){return m<10?'0'+m:m },
      timeFormat(timestamp,num){
        //timestamp是整数，否则要parseInt转换,不会出现少个0的情况
        timestamp -= Number(num)*24*60*60*1000;
        var time = new Date(timestamp);
        var year = time.getFullYear();
        var month = time.getMonth()+1;
        var date = time.getDate();
        return year+'-'+this.add0(month)+'-'+this.add0(date);
      }
    },
    beforeMount() {
      // console.log(this.$route.params, 'par') //路由通过name和 params传值
      this.handleGetFormData();//form表单
      this.handleGetTableData();//表格侧边
      this.handleSearchBarData();//柱状图默认查询当日数据
      // 折线图查询数据  默认查询近7天数据
      this.handleSearchLine();
      
    }
  }
</script>



