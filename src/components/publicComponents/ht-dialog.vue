<template>
	<el-dialog :visible.sync="dialogVisible" :class="['ht-dialog', size ? size: '']" @close="hide">
		<div slot="title" class="title-wrap">{{title}}</div>
		<slot></slot>
		<div slot="footer" class="footer-wrap">
			<el-button plain @click="hide">取消</el-button>
			<el-button type="primary" @click="$emit('confirm')">{{confirmLabel | labelDefault}}</el-button>
		</div>
	</el-dialog>
</template>
<script>
	export default {
		props: ['title', 'confirmLabel', 'size'],
		data() {
			return {
				dialogVisible: false
			}
		},
		methods: {
			show() {
				this.dialogVisible = true
			},
			hide() {
				this.dialogVisible = false
				this.$emit('close')
			}
		},
		filters: {
			labelDefault(val) {
				return !val ? '确定' : val;
			}
		}
	}
</script>

<style lang="less" scoped>
	@line-color: #eee;
	.title-wrap {
		padding: 0 15px 15px;
		margin: 0 -15px;
		height: 30px;
		border-bottom: 1px solid @line-color;
	}
	
	.footer-wrap {
		border-top: 1px solid @line-color;
		padding: 10px 15px 0px;
		margin: 0 -15px;
	}
</style>
<style lang="less">
	/*弹出框的样式*/
	
	.ht-dialog .el-dialog {
		min-width: 600px;
		line-height: normal;
	}
	
	.ht-dialog.small .el-dialog {
		min-width: 400px;
		line-height: normal;
	}
	
	.ht-dialog.middle .el-dialog {
		min-width: 800px;
		line-height: normal;
	}
	
	.ht-dialog.medium .el-dialog {
		min-width: 900px;
		line-height: normal;
	}
	
	.ht-dialog.large .el-dialog {
		min-width: 1200px;
		line-height: normal;
	}
</style>