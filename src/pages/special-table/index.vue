<template>
  <div class="dragTable">
    <td-draggable element="el-table" :list="tableData" :data="tableData" :options="dragOptions" dragSelector="tbody" @end='endDrag' stripe highlight-current-row  header-row-class-name="header-row">
      <el-table-column resizable show-overflow-tooltip prop="name" label="姓名"></el-table-column>
      <el-table-column resizable show-overflow-tooltip prop="age" label="年龄"></el-table-column>
    </td-draggable>
    <el-button @click="insertMongodb">添加mongodb数据</el-button>
    <el-button @click="getMongodb">获取mongodb数据</el-button>
    <el-button @click="updateMongodb">修改mongodb数据</el-button>
    <el-button @click="delMongodb">删除mongodb数据111</el-button>
    <el-button @click="fetchTable">拖拽后的table</el-button>
  </div>
</template>

<script>
import TdDraggable from '@/components/draggable';
import TdDraggable111 from '@/components/draggable';
export default {
  name: 'elementDraggableTable',
  data() {
    return {
      dragOptions: {
        draggable: '.el-table__row',
      },
      tableData: [
        { name: 'zhang', age: 12 },
        { name: 'luo', age: 33 },
        { name: 'tang', age: 34 },
        { name: 'yang', age: 23 },
        { name: 'wang', age: 13 },
      ],
      columns: [
        {
          prop: 'no',
          label: '盘点单号',
        },
        {
          prop: 'type',
          label: '盘点类型',
          formatter: function(item) {
            return 'cc';
          },
        },
      ],
    };
  },
  components: {
    TdDraggable,
  },
  methods: {
    endDrag(data) {
      console.log('data: ', data);
      // console.log(this.tableData)
    },
    fetchTable() {
      console.log(this.tableData, '拖拽后的table');
    },
    insertMongodb() {
      this.$http({
        url: `/api/testRouter/mongodbCui/save`,
        method: 'post',
      });
    },
    getMongodb() {
      this.$http({
        url: `/api/testRouter/mongodbCui/get`,
        method: 'get',
      });
    },
    updateMongodb() {
      this.$http({
        url: `/api/testRouter/mongodbCui/update`,
        method: 'put',
      });
    },
    delMongodb() {
      this.$http({
        url: `/api/testRouter/mongodbCui/delete`,
        method: 'delete',
      });
    },
  },
};
</script>
<style>
.header-row th {
  background: rgb(204, 199, 199) !important;
  color: #fff;
}
</style>
