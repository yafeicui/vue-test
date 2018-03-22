export default {
  changeCount({commit, state}, payload) {
    // console.log(payload, 'action')
    commit('addCount', payload)
  },
  desCount({commit, state}) {
    commit('desMuCount');
  }
}