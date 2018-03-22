import Vue from 'vue'
export default {
  getUsers: (state,value) => {
    state.users = value
  },
  addCount: (state, value) => {
    // console.log(value, 'mutation')
    state.count = value
  },
  desMuCount: (state) => {
    // console.log('减1')
    state.count -= 2
  }
}