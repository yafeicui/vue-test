<template>
	<el-tooltip class="item" effect="dark" :content="tipname" placement="top">
		<ht-text-button>
			<slot></slot>
		</ht-text-button>
    </el-tooltip>
</template>
<script>
	export default {
		props: ['tipname'],
		data() {
			return {

			}
		}
	}
</script>
<style scoped lang="less">
	* {
		outline: none;
	}
</style>