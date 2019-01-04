<template>
	<ht-page title="json展示数据">
    <div class="firstBar">
        <el-table :data="tableData" stripe style="width: 100%; height: 300px">
          <el-table-column prop="id" label="序号" width="80" align="center"></el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="180" align="center"></el-table-column>
          <el-table-column label="字段" align="center" min-width="100">
            <template slot-scope="scope">
              <el-button type="primary" size="small" @click="showDetail(scope.row)">显示全部</el-button> 
            </template>
          </el-table-column>
        </el-table>
    </div>
		
    <DetailDialog ref="detailDialog"/>
	</ht-page>

</template>

<script>
  import DetailDialog from './detail_dialog.vue'
	export default {
		data() {
			return {
        tableData: [
          {
            "actualLevel":0,
            "createTime":"2018-09-27 14:37:01",
            "description":"0",
            "expectedLevel":0,
            "fields":[],
            "fieldsJson":"[{\"dimension\":\"uid\",\"propertyId\":359,\"propertyName\":\"zombie_uid_user_share\",\"type\":\"Integer\",\"value\":\"0\"},{\"dimension\":\"ip\",\"propertyId\":220,\"propertyName\":\"RL_ip_3600\",\"type\":\"Integer\",\"value\":\"0\"},{\"dimension\":\"mid\",\"propertyId\":336,\"propertyName\":\"RL_mid_3600\",\"type\":\"Integer\",\"value\":\"0\"}]",
            "id":201,
            "name":"user_share_filter",
            "ruleId":113,
            "updateTime":null
          },
          {
            "actualLevel":0,
            "createTime":"2018-09-25 17:10:02",
            "description":"0",
            "expectedLevel":0,
            "fields":[],
            "fieldsJson":"[{\"dimension\":\"uid\",\"propertyId\":1,\"propertyName\":\"ONE_MIN_ONE_MIN_test2\",\"type\":\"Integer\",\"value\":\"0\"}]",
            "id":180,
            "name":"test0914",
            "ruleId":110,
            "updateTime":null
          },
        ]
      }
    },
		components: {
		  DetailDialog,
    },
		methods: {
      showDetail(row) {
        this.$refs.detailDialog.show(row);
      }
    }
	}
</script>