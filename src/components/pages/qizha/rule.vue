<template>
  <div class="dragTable">
    <td-draggable element="el-table" :list="tableData" :data="tableData" :options="dragOptions" dragSelector="tbody" @end='endDrag' stripe highlight-current-row  header-row-class-name="header-row">
      <el-table-column resizable show-overflow-tooltip prop="name" label="姓名"></el-table-column>
      <el-table-column resizable show-overflow-tooltip prop="age" label="年龄"></el-table-column>
      <!-- <el-table-column  type="index" label="序号" width="70">
        <template slot-scope="scope">
          {{1+scope.$index}}
        </template>
      </el-table-column> -->

      <!-- <template v-for="column in columns">
        <el-table-column v-if="column.formatter" :fixed="column.fixed" resizable show-overflow-tooltip :prop="column.prop" :key="column.prop" :label="column.label" :formatter="column.formatter" >
        </el-table-column>
        <el-table-column  v-else-if="column.operations" :fixed="column.fixed" :prop="column.prop" :label="column.label" :key="column.prop" >
          <template slot-scope="scope">
            <el-button v-for="(operate, index) in column.operations" :key="index" type="text" @click.native.prevent="operate.func(scope.$index, scope.row)">{{operate.label}}</el-button>
          </template>
        </el-table-column>

        <el-table-column v-else resizable show-overflow-tooltip :fixed="column.fixed" :prop="column.prop"   :label="column.label" :key="column.prop" >
        </el-table-column>
      </template> -->
    </td-draggable>
  </div>
</template>

<script>
import TdDraggable from '@/components/draggable'
export default {
  name: 'elementDraggableTable',
  data () {
    return {
      dragOptions: {
        draggable: '.el-table__row'
      },
      tableData: [
        { name: 'zhang', age: 12},
        { name: 'luo', age: 33},
        { name: 'tang', age: 34},
        { name: 'yang', age: 23},
        { name: 'wang', age: 13},
      ],
      columns: [{
        prop: 'no',
        label: '盘点单号'
      }, {
        prop: 'type',
        label: '盘点类型',
        formatter: function (item) {
          return 'cc'
        }
      }]
    }
  },
  components: {
    TdDraggable
  },
  methods: {
    endDrag (data) {
      console.log('data: ', data)
      console.log(this.tableData)
    }
  }
}
</script>
<style> 
  .header-row th {
    background: rgb(204, 199, 199)!important;
    color: #fff;
  }
</style>
