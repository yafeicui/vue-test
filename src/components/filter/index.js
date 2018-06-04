import Vue from 'vue';
// 时间过滤 年-月-日 时： 分 ：秒
const translateTime = function (timestamp) {
  if(timestamp==undefined) return;
  var time = new Date(timestamp);
  var year = justStyle(time.getFullYear());
  var month = justStyle(time.getMonth() + 1);
  var date = justStyle(time.getDate());
  var hours = justStyle(time.getHours());
  var minutes = justStyle(time.getMinutes());
  var seconds = justStyle(time.getSeconds());
  return year + '-' + month + '-' + date  + "  "+ hours + ':' + minutes + ':' + seconds;
}
Vue.filter('translateTime', translateTime)

// 时间过滤 年-月-日
const translateDate = function (timestamp) {
  if(timestamp==undefined) return;
  var time = new Date(timestamp);
  var year = justStyle(time.getFullYear());
  var month = justStyle(time.getMonth() + 1);
  var date = justStyle(time.getDate());
  return year + '-' + month + '-' + date;
}

Vue.filter('translateDate', translateDate)

Vue.prototype.translateTime = translateTime
Vue.prototype.translateDate = translateDate
function justStyle(val) {
  if(val < 10) {
    return '0' + val
  }else {
    return val
  }
}

// 0  1过滤
const translateNum = function(num) {
  var res = '';
  switch(num) {
    case 0: res = '否'; break;
    case 1 : res = '是'; break;
    default: break;
  }
  return res;
}
Vue.filter('translateNum', translateNum);

// 用户状态
const userStatus = function(num) {
  var res = '';
  switch(num) {
    case 0: res = '试用'; break;
    case 1: res = '正式'; break;
    case 2: res = '临时'; break;
    case 3: res = '试用延期'; break;
    case 4: res = '解聘'; break;
    case 5: res = '离职'; break;
    case 6: res = '退休'; break;
    case 7: res = '无效'; break;
    default: break;
  }
  return res;
}
Vue.filter('userStatus', userStatus);

// 消息状态
const messageStatus = function(num) {
  var res = '';
  switch(num) {
    case 0: res = '未读'; break;
    case 0: res = '已读'; break;
    default: break;
  }
  return res;
}
Vue.filter('messageStatus', messageStatus);

// 交易类型
const bussinessType = function(num) {
  var res = '';
  switch(num) {
    case 0: res = '新增绑定'; break;
    case 1: res = '维护绑定'; break;
    default: break;
  }
  return res;
}
Vue.filter('bussinessType', bussinessType);

// 绑定类型
const bindType = function (num) {
  var res = '';
  switch (num) {
    case 1: res = '客户号绑定'; break;
    case 2: res = '客户账号绑定'; break;
    case 3: res = '借据号绑定'; break;
    default: break;
  }
  return res;
}
Vue.filter('bindType', bindType);

// 金额三位一逗
export const toLocaleNumString = (value) => {
  var result = value.toLocaleString()
  var numberList = result.split('.')
  var integerNum = numberList[0]
  var floatNum = numberList[1]
  if (!floatNum) {
    floatNum = '00'
  } else if (floatNum.length == 1) {
    floatNum += '0'
  }
  result = integerNum + '.' + floatNum
  return result
}

Vue.filter('toLocaleNumString', toLocaleNumString);