<template>
	<ht-page title="零售客户"  class="echart-template">
    <ht-card>
      <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-width="150px" class="demo-ruleForm limit-book-form" style="marginTop:20px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="客户号" prop="clientId">
              <el-input v-model="ruleForm.clientId" placeholder="客户号" class="search-input-condition"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="客户姓名" prop="clientName">
              <el-input v-model="ruleForm.clientName" placeholder="客户姓名" class="search-input-condition"></el-input>      
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="isOperate">
          <el-col :span="12">
            <el-form-item label="部门" prop="orgCode" class="manager-input">
              <el-input ref="deptInput" v-model="orgName" placeholder="部门" class="search-input-condition" @focus="deptFocus" @blur="deptBlur" @clear="deptClear" @keydown.native="handlePrevent" clearable></el-input>
              <dept-tree ref="deptTree" v-if="isDeptShow" :data="deptList" @clicktree="deptClickTree" @nohidden="ifHiddenDeptTree" :defaultProps="treeDefaultProps"></dept-tree>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="客户经理" prop="cstManager" class="manager-input">
              <el-select v-model="ruleForm.cstManager" filterable class="search-input-condition" :disabled="!isOperateCst" clearable>
                  <el-option
                  v-for="item in managerList"
                  :key="item.value"
                  :label="item.userName"
                  :value="item.userCode">
                  </el-option>
              </el-select>   
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="content-layout-center">
        <el-button round type="primary" @click="handleSearch">查询</el-button>
        <el-button round type="primary" @click="handleResetClick">重置</el-button>
      </div>
    </ht-card>
    <div class="table-box">
      <ht-table ref="htTable" :ajaxConfig="tableAjaxConfig" :listKey="listKey" :paginationKey="paginationKey">
        <el-table-column label="客户号" align="center" prop="clientId" fixed="left" width="180px">
          <template slot-scope="scope">
            <span @click="lookDetail(scope.$index, scope.row)">{{scope.row.clientId}}</span>
          </template>
        </el-table-column>
        <el-table-column label="客户姓名" align="center" prop="clientName" width="120px"></el-table-column> 
        <el-table-column label="客户证件号" align="center" prop="idNum" width="180px"></el-table-column>
        <el-table-column label="联系方式" align="center" prop="mobile" width="150px"></el-table-column> 
        <el-table-column label="开户时间" align="center" prop="date" width="180px">
          <template slot-scope="scope">
            {{scope.row.createTime | translateDate}}
          </template>
        </el-table-column>
        
        <el-table-column label="客户经理" align="center" prop="managers" width="130px"></el-table-column> 
        <el-table-column label="部门" align="center" prop="mgrOrgNames" width="120px"></el-table-column>
        <el-table-column label="存款时点余额(元)" align="center" prop="depositBalance" width="140px">
          <template slot-scope="scope">
            {{ scope.row.depositBalance | toLocaleNumString}}
          </template>  
        </el-table-column> 
        <el-table-column label="存款日均余额(元)" align="center" prop="depositDayBalance" width="140px">
          <template slot-scope="scope">
            {{ scope.row.depositDayBalance | toLocaleNumString}}
          </template>
        </el-table-column>
        <el-table-column label="贷款时点余额(元)" align="center" prop="loanBalance" width="140px">
          <template slot-scope="scope">
            {{ scope.row.loanBalance | toLocaleNumString}}
          </template>
        </el-table-column> 
        <el-table-column label="贷款日均余额(元)" align="center" prop="loanDayBalance" width="140px">
          <template slot-scope="scope">
            {{ scope.row.loanDayBalance | toLocaleNumString}}
          </template>
        </el-table-column>
        <el-table-column label="AUM时点余额(元)" align="center" prop="aumBalance" width="150px">
          <template slot-scope="scope">
            {{ scope.row.aumBalance | toLocaleNumString}}
          </template>
        </el-table-column>
        <el-table-column label="AUM日均余额(元)" align="center" prop="aumDayBalance" width="150px">
          <template slot-scope="scope">
            {{ scope.row.aumDayBalance | toLocaleNumString}}
          </template>
        </el-table-column>
      </ht-table>
    </div>
	</ht-page>
</template>

<script>
import mixinFormSearch from '@/components/mixin/mixin-form-search.js';
import ManagerTree from '@/components/comment-tree';
import DeptTree from '@/components/comment-tree';
import mixinDeptTree from '@/components/mixin/mixin-dept-tree.js';
import htTable from '@/components/publicComponents/ht-table'
export default {
  mixins: [mixinFormSearch,mixinDeptTree],
  data() {
    var clientIdValidator = (rule,value,callback)=>{
      var reg = /^[0-9]{12}$/;
      if(!reg.test(value)){
        callback(new Error('客户号必须是12位数字'));
      }else{
        callback();
      }
    }
    return {
      isOperate: false,
      isOperateCst: false,
      treeDefaultProps: {
        children: 'children',
        label: 'orgName'
      },
      orgName: '',//部门
      ruleForm: {
        clientId: '',//客户号
        clientName: '',//客户姓名
        idType: '',//证件类型
        idNum: '',//证件号码
        cstManager: '',//客户经理
        orgCode: '',//部门
        oneAcctFlag: '',//一类户标示
        eleAcctFlag: '',//电子账户标示 
      },
      // 部门下拉框
      deptList: [],
      // 客户经理下拉框
      managerList: [],
      tableAjaxConfig: null,
      // ...this.config.PAGINATION_CONTENT,
      listKey:'data',
      paginationKey: {  // 分页信息字段
        size: 'size',
        current: 'current',
        total: 'totalElements'
      },
      isDeptShow: false,
      isDeptClose: false,
      deptInputFocus: false,
      rules:{
        clientId : [
          {validator:clientIdValidator , trigger:'blur'}
        ]
      }
    };
  },
  components: {
    ManagerTree,
    DeptTree,
    htTable
  },
  watch: {
    orgName: function(newValue, oldValue) {
      if(newValue && this.isOperate) {
        this.isOperateCst = true;
      }else {
        this.isOperateCst = false;
      }
    }
  },
  methods: {
    lookDetail (scope, row) {
      this.$router.push({
        path: "/crm/lingshou/detail",
        query: {
          clientId: row.clientId
        }
      })
      // 路由通过name和params传值跳转， 参数不会拼接在url上
      // this.$router.push({
      //   name: "lsdetail",
      //   params: {
      //     clientId: row.clientId
      //   }
      // })
    },
    handleResetClick() {
      this.orgName = '';
      this.handleReset();
    },
    handleGetPaginationInfo() {
      // this.$refs['ruleForm'].validate((valid) => {
      //   if (valid) {
          this.tableAjaxConfig = {
            url: `/api/crm/personCsts`,
            method: "get",
            params: Object.assign({}, this.ruleForm)
          };
      //   }
      // });
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
    // 部门
    deptClickTree(val) { 
      this.ruleForm.cstManager = '';
      // if(!val.children) {
        this.ruleForm.orgCode = val.orgCode;
        this.orgName = val.orgName;
        this.handleGetManagerList(val);//查询客户经理下拉框列表
      // }
    },
    deptClear(val) {
      this.ruleForm.orgCode = '';
      this.ruleForm.cstManager = '';
    }
  },
  beforeMount() {
    this.isCanOperate();
    this.handleGetPaginationInfo();
  }
};
</script>
<style scoped lang="less">
  .manager-input{
    position: relative;
  }
</style>