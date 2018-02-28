<template>
  <div class="hello">
    <el-button>默认按钮</el-button>
    <el-button type="primary">主要按钮</el-button>
    <el-button type="success">成功按钮</el-button>
    <el-button type="info">信息按钮</el-button>
    <el-button type="warning">警告按钮</el-button>
    <el-button type="danger">危险按钮</el-button>
    <hr>
    <div v-if="num === 1">第一个</div>
    <div v-else-if="num === 2">第二个</div>
    <div v-else="num === 1">第三个</div>
    <hr>
    <el-input v-model="inp" style="width: 200px;"></el-input>
    <el-button @click="addArr">添加</el-button>
    <br>
    <li v-for="(item, index) in arr" :key="index">{{item.label}}---{{item.name}}</li>
    <br>
    <li v-for="(value, key, index) in obj" :key="key">{{value}}---{{key}}---{{index}}</li>
    <br>
    <span @click.once="clickOnce" style="border: 1px solid #ccc;">只产生一次点击效果</span>
    <hr>
    <input style="width: 200px;" @keyup.enter="shoeDialog" placeholder="点击enter弹出提示框" v-focus></input>
    <hr>
    <el-button @click="handleShow">动画</el-button>
    <transition name="fade">
      <!-- <htButton :msg="'这是测试'" v-if="isShow"></htButton> -->
    </transition>
    
  </div>
</template>

<script>
export default {
  name: 'cui',
  data () {
    return {
      isShow: true,
      num: 1,
      inp: '',
      arr: [
        {label: 1, name: 'c'},
        {label: 2, name: 'y'},
        {label: 3, name: 'f'}
      ],
      labelNum: 4,
      obj: {
        first: 11,
        second: 22,
        third: 33
      }
    }
  },
  directives: {
    focus: {
      // 指令的定义
      inserted: function (el) {
        el.focus()
      }
    }
  },
  methods: {
    addArr() {
      if(this.inp != "") {
        this.arr.push({
          label: this.labelNum, name: this.inp
        })
        this.labelNum++;
        this.inp = '';
      }
    },
    clickOnce() {
      alert('test');
    },
    shoeDialog() {
      alert(1111)
    },
    handleShow() {
      this.isShow = !this.isShow;
    }
  },
  mounted () {
    // this.obj.four = 44;//检测不到obj的变化
    // this.$set(this.obj, 'four', 44);//对象添加不存在的属性，应该使用$set

    // this.obj = Object.assign(this.obj, {four: 44, five: 55});//检测不到obj的变化
    // this.obj = Object.assign({}, this.obj, {four: 44, five: 55});//合并对象应该添加空对象
  }
}
</script>
<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity 1s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>

