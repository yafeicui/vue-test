<template>
  <el-menu
		class="el-menu-vertical-demo"
		:mode="mode"
		:background-color="backgroundColor"
		:textColor="textColor"
		:activeTextColor="activeTextColor"
    :unique-opened="uniqueOpened"
    :router="router"
		>
		<ht-menu-item :menus="menus" @chnageurl="handleChange"></ht-menu-item>
	</el-menu>
</template>
<script>
import htMenuItem from './ht-menu-item.vue'
export default {
  props: {
    menus: {

    },
    mode: {
      type: String,
      default: "vertical"
    },
    router: {
      type: Boolean,
      default: false
    },
    uniqueOpened: {
      type: Boolean,
      default: false
    },
    backgroundColor: {
      type: String,
      default: "#2e2e3c"
    },
    textColor: {
      type: String,
      default: "#aaa"
    },
    activeTextColor: {
      type: String,
      default: "#fff"
    }
  },
  components: {
    htMenuItem
  },
  methods: {
    handleChange(data) {
      console.log(data, 8)
    }
  }
}
</script>

<style>
	.el-menu {
		height: 100%;
		border-radius: 0px;
		background-color: #333744;
		overflow: auto;
	}
	.el-submenu.is-opened .el-submenu__title {
		color: #fff !important;
	}
	.el-menu-item.is-active {
		background-color: #252734 !important;
	}
</style>
