<template>
  <ht-page title="规则分析">
    <div class="firstBar">
      <echartBar :echartData="firstEchartData"></echartBar>
    </div>
    <div class="firstBar">
      <echartBar :echartData="secondEchartData"></echartBar>
    </div>
    <ht-table ref="htTable" :ajaxConfig="tableAjaxConfig" :listKey="listKey" :paginationKey="paginationKey">
      <el-table-column align="center" prop="clientName" label="客户名称" ></el-table-column>
      <el-table-column align="center" prop="clientId" label="客户编号"></el-table-column>
    </ht-table>
  </ht-page>
</template>

<script>
import echarts from 'echarts';
import echartBar from '@/components/publicComponents/ht-echart-bar.vue';
import htTable from '@/components/publicComponents/ht-table';
export default {
  data() {
    return {
      width: '100%',
      firstEchartData: {},
      secondEchartData: {},
      listKey: 'data',
      paginationKey: {
        // 分页信息字段
        size: 'size',
        current: 'current',
        total: 'totalElements'
      }
    };
  },
  components: {
    echartBar,
    htTable
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
            data: ['Forest', 'Steppe', 'Desert', 'Wetland']
          },
          xAxis: {
            type: 'category',
            axisTick: { show: false },
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
      };
    },
    // 获取表格数据
    handleGetPaginationInfo() {
      this.tableAjaxConfig = {
        url: '/api/system/role/tableList',
        method: 'get',
        params: Object.assign({}, this.ruleForm)
      };
    }
  },
  beforeMount() {
    this.firstEchart();
    this.secondEchart();
    this.handleGetPaginationInfo();
  }
};
</script>
<style>
.header-row th {
  background: rgb(204, 199, 199) !important;
  color: #fff;
}
</style>
