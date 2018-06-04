<template>
  <ht-page title="客户经理信息" class="echart-template">
    <div class="search-box" v-if="isOperate">
      <el-input ref="deptInput" v-model="searchForm.orgName" placeholder="部门" @focus="deptFocus" @blur="deptBlur" @clear="deptClear" @keydown.native="handlePrevent" clearable class="dept-tree"></el-input>
      <dept-tree ref="deptTree" v-if="isDeptShow" :data="deptList" @clicktree="deptClickTree" @nohidden="ifHiddenDeptTree" :defaultProps="treeDefaultProps" width="250px"></dept-tree>
      <el-select v-model="searchForm.cstManager" filterable :disabled="!isOperateCst" clearable>
        <el-option
        v-for="item in managerList"
        :key="item.value"
        :label="item.userName"
        :value="item.userCode">
        </el-option>
      </el-select> 
      <el-button type="primary" round @click="handleSearchForm">查询</el-button>
    </div>
    <ht-card>
      <el-form :model="ruleForm" ref="ruleForm" label-width="150px" class="demo-ruleForm limit-book-form" style="marginTop:20px" v-readonly='formReadonly'>
        <el-row>
          <el-col :span="12">
            <el-form-item label="客户经理姓名" prop="userName">
              <el-input v-model="ruleForm.userName" class="search-input-condition"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="客户经理号" prop="userCode">
              <el-input v-model="ruleForm.userCode" class="search-input-condition"></el-input>      
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="部门" prop="orgName">
              <el-input v-model="ruleForm.orgName" class="search-input-condition"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="客户数" prop="orgCode">
              <el-input v-model="ruleForm.amount" class="search-input-condition"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </ht-card>
    <div class="bar-box bar-contain">
      <div class="line-search-box">
        <el-select v-model="barForm.value" placeholder="请选择" clearable class="search-condition">
          <el-option v-for="item in list_type" :key="item.value" :label="item.name" :value="item.value"></el-option>
        </el-select>
        <el-date-picker class="search-condition" v-model="barForm.barDate" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" clearable></el-date-picker>
        <el-button round type="primary" @click="handleGetBarData">查询</el-button>
      </div>
      <first-bar :echartData="firstBarData" v-if="isShowBar"></first-bar>
      <second-bar :echartData="secondBarData" v-if="isShowBar"></second-bar>
      <!-- <div class="bar-hidden" v-if="!isShowBar">暂无数据</div> -->
    </div>
  </ht-page>
</template>
<script>
  import FirstBar from '@/components/echart/bar';
  import SecondBar from '@/components/echart/bar';
  import DeptTree from '@/components/comment-tree';
  import mixinDeptTree from '@/components/mixin/mixin-dept-tree.js';
  import mixinFormSearch from '@/components/mixin/mixin-form-search.js';
  export default {
    mixins: [mixinFormSearch,mixinDeptTree],
    data() {
      return {
        list_type: [
          {value: '1', name: '存款'},
          {value: '2', name: '贷款'},
        ],
        deptList: [],
        managerList: [],
        isOperateCst: false,
        isOperate: false,
        searchForm: {
          orgName: '',
          orgCode: '',
          cstManager: ''
        },
        isDeptShow: false,
        treeDefaultProps: {
          children: 'children',
          label: 'orgName'
        },
        ruleForm: {},
        tableAjaxConfig: null,
        // ...this.config.PAGINATION_CONTENT,
        firstBarData: {},//第一个柱状图数据
        secondBarData: {},//第二个柱状图	
        barForm: {
          barDate: '',//柱状图搜素条件
          value: ''
        },
        isShowBar: false,
        user:{},
        userCode:"",
        formReadonly: false,
        requestPar: false,
      };
    },
    components: {
      FirstBar,
      SecondBar,
      DeptTree
    },
    watch: {
      'searchForm.orgName': function(newValue, oldValue) {
        newValue && this.isOperate ? this.isOperateCst = true : this.isOperateCst = false;
      }
    },
    methods: {
      // 部门查询
      deptClear() {
        this.searchForm.orgCode = '';
        this.searchForm.orgName = '';
        this.searchForm.cstManager = '';
      },
      deptClickTree(val) {
        this.searchForm.orgCode = val.orgCode;
        this.searchForm.orgName = val.orgName;
        this.handleGetManagerList(val);//查询客户经理下拉框列表
      },
      // 客户经理
      handleGetManagerList(data) {
        this.$http({
          // url: `/api/orgs/`+data.orgCode+'/users',
          url: `/api/orgs/`+'040000'+'/users',
          method: 'get',
          params: {
            username: '',
            limit: 1000,
            page: 1
          }
        }).then(res => {
          this.managerList = res.data.data;
        })
      },
      // 查询表单
      handleSearchForm() {
        this.userCode = this.searchForm.cstManager;
        this.handleGetUserInfo();
      },
      //搜索客户经理信息数据
      handleGetUserInfo() {
        this.$http({
          url: `/api/managers/`+ '00000000',
          method: 'get'
        }).then((res) => {
          this.ruleForm = res.data.data
        })
      },
      handleGetBarData(path,ele){
        this.isShowBar = false;
        this.$http({
          url: `/api/managers/`+'00000000'+'/balances/'+ this.barForm.value ,
          method: 'get',
          params:{
            date: this.barForm.barDate,
          }
        }).then((res) => {
          var res = res.data.data;
          // if(!res) {
          //   return 
          // }
           var firstArr = [res.balance,res.balanceBasis,res.balanceChain,res.dayOfYearBalance,res.yearBasis,res.yearChain,res.dayOfQuarterBalance,res.quarterBasis,res.quarterChain,res.dayOfMonthBalance,res.monthBasis,res.monthChain,res.interestValue];
          var secondArr = [res.balanceBasisRatio,res.balanceChainRatio,res.yearBasisRatio,res.yearChainRatio,res.quarterBasisRatio,res.quarterChainRatio,res.monthBasisRatio,res.monthChainRatio];
          this.handleSetBarData(firstArr, secondArr);
        })
      },
      handleSetBarData(firstData, secondData) {
        this.isShowBar = true;
        this.firstBarData = {
          boxSize: { //柱状图尺寸
						width: '49%',
						height: '500px'
          },
          histoGramData: {
            title: {
              text: '余额增长量'
            },
						xAxis:  {
              type : 'category',
              data: ['时点余额金额','时点余额同比增长量','时点余额环比增长量','年日均余额','年日均同比增长量','年日均环比增长量','季日均余额','季日均同比增长量','季日均环比增长量','月日均余额','月日均同比增长量','月日均环比增长量','利息估值'],
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
              text: '余额增长率'
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
      },
      // 默认柱状图数据
      defaultBarData() {
        this.barForm.value = '1';
        this.barForm.barDate = this.timeFormat(Date.parse(new Date()), 0);
        this.handleGetBarData(); 
      },
    },
    beforeMount() {  
      this.user = Object.assign( {},JSON.parse(localStorage.getItem("user")) );
      this.defaultBarData();
      this.handleGetUserInfo();
      this.isCanOperate();
    }
  }
</script>
<style lang="less" scoped>
  .echart-template .search{
    display: flex;
  }
  .echart-template .search-box {
    margin-bottom: 30px;
    .dept-tree {
      width: 250px;
    }
  }
  .echart-template {
    .bar-box,.bar-contain {
      padding-top: 50px;
    }
  }
</style>

