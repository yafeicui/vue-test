import Vue from 'vue'
import axios from 'axios'
// import qs from 'qs'
// import { currencyType } from '../utils/global-filters';

export function createHttp() {
  Vue.prototype.$http = axios 
  initInterceptersRequest()
  initInterceptersResponse()
}
var configArr = [];
const initInterceptersRequest = () => {
  axios.interceptors.request.use(function (config) {
    // console.log(config, '请求')
    return config
  })
}

const initInterceptersResponse = () => {
  axios.interceptors.response.use(function (response) {
    if (parseInt(response.data.code) === 9000 || parseInt(response.data.respCode) === 9000) {
      return response
    } else {
      var msg = response.data.respDesc ? response.data.respDesc : response.data.message
      // vue.$message({ message: msg, type: 'warning' });
      return Promise.reject({})
    }
  }, function (error) {
    // Do something with response error
    // if (error.response.status === 400) {
    //   // alert('参数错误')
    // } else if (error.response.status === 401) {
    //   if (!window.location.href.match('/login')) {
    //     //router.push('/login')
    //   }
    // } else if (error.response.status === 403
    //   || error.response.status === 404
    //   || error.response.status === 500) {
    //   router.push(`/status/${error.response.status}`)
    // }
    // return Promise.reject(error)
  })
}