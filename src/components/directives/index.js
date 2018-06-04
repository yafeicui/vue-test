
import Vue from 'vue'
// form只读的全局指令 
//readonly-patch 子元素上加了这个,readonly指令对其没有作用
Vue.directive(
  'readonly', function (el, binding) {    
    el.querySelectorAll('.el-input').forEach(element => {      
      if(element.className.indexOf('readonly-patch') > -1) return 
      element.className = element.className.replace(/ is-disabled/g, '')
      element.querySelector('input').disabled = false
    })
    el.querySelectorAll('.el-checkbox').forEach(element => {
      if(element.className.indexOf('readonly-patch') > -1) return 
      element.className = element.className.replace(/ is-disabled/g, '')
      element.querySelector('.el-checkbox__input').className = element.querySelector('.el-checkbox__input').className.replace(/ is-disabled/g, '')
      element.querySelector('input').disabled = false
    })
    el.querySelectorAll('.el-textarea').forEach(element => {      
      if(element.className.indexOf('readonly-patch') > -1) return 
      element.className = element.className.replace(/ is-disabled/g, '')
      element.querySelector('.el-textarea__inner').disabled = false
    })
    el.querySelectorAll('.el-cascader').forEach(element => {      
      if(element.className.indexOf('readonly-patch') > -1) return 
      element.className = element.className.replace(/ is-disabled/g, '')
      element.querySelector('input').disabled = false
    })
    
    if (binding.value) {
      el.querySelectorAll('.el-input').forEach(element => {
        if(element.className.indexOf('readonly-patch') > -1) return
        element.className += ' is-disabled'
        element.querySelector('input').disabled = true
      })
      el.querySelectorAll('.el-checkbox').forEach(element => {
        if(element.className.indexOf('readonly-patch') > -1) return 
        element.className += ' is-disabled'
        element.querySelector('.el-checkbox__input').className += ' is-disabled'
        element.querySelector('input').disabled = true
      })
      el.querySelectorAll('.el-textarea').forEach(element => {
        if(element.className.indexOf('readonly-patch') > -1) return 
        element.className += ' is-disabled'
        element.querySelector('.el-textarea__inner').disabled = true
      })
      el.querySelectorAll('.el-cascader').forEach(element => {
        if(element.className.indexOf('readonly-patch') > -1) return 
        element.className += ' is-disabled'
        element.querySelector('input').disabled = true
      })
    }
  }
)

Vue.directive(  
  'enter-input', {    
    bind:function(el, binding){      
      el.querySelectorAll('.el-input').forEach(element => {        
        element.onkeyup = (e)=>{
          if(e.key !== 'Enter') return
          if(binding.value) binding.value(e)
        }
      })
    }
  }
)

