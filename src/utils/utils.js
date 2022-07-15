/**
 * 格式化时间-年月日 时分秒
 * @param date 时间字符串
 * @return 格式化的后时间
 */
function formatTime(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return (
    [year, month, day].map(formatNumber).join('-') +
    ' ' +
    [hour, minute, second].map(formatNumber).join(':')
  );
}

/**
 * 格式化时间-年月日
 * @param date 时间字符串
 * @return string
 */
function year(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return [year, month, day].map(formatNumber).join('-');
}

/**
 * 格式化时间-时分
 * @param date 时间字符串
 * @return  string
 */
function hour(date) {
  const hour = date.getHours();
  const minute = date.getMinutes();
  return [hour, minute].map(formatNumber).join(':');
}

function formatNumber(n) {
  n = n.toString();
  return n[1] ? n : '0' + n;
}

/**
 * 去掉字符串中所有空格
 * @param str 字符串
 * @param isGlobal 是否去掉中间空格
 * @return 去掉空格后的str
 */
function Trim(str, isGlobal = 'g') {
  let result = str.replace(/(^\s+)|(\s+$)/g, '');
  if (isGlobal === 'g') {
    result = result.replace(/\s/g, '');
  }
  return result;
}

/**
 * 在js中if条件为null/undefined/0/NaN/""表达式时，统统被解释为false,此外均为true .
 * @param arg
 */
function isNull(arg) {
  return !!(!arg && arg !== 0 && typeof arg !== 'boolean');
}

/**
 * 生成guid
 * @return string
 */
function guid() {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return (
    S4() +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    S4() +
    S4()
  );
}

/**
 * 获取localStorage
 * @param key localStorage的key
 * @return  string
 */
function getItem(key) {
  const local = localStorage.getItem(key);
  if (local) {
    return JSON.parse(local);
  }
  return '';
}

/**
 * 设置localStorage，会进行JSON.stringify
 * @param key localStorage的key
 * @param obj localStorage的value
 */
function setItem(key, obj) {
  localStorage.setItem(key, JSON.stringify(obj));
}

/**
 * 删除指定key的localStorage
 * @param key localStorage的key
 */
function removeItem(key) {
  localStorage.removeItem(key);
}

/**
 * url编码
 * @param str url
 * @return
 */
function urlEncode(str = '') {
  return encodeURIComponent(str)
    .replace(/!/g, '%21')
    .replace(/'/g, '%27')
    .replace(/\(/g, '%28')
    .replace(/\)/g, '%29')
    .replace(/\*/g, '%2A')
    .replace(/%20/g, '+');
}

/**
 * url解码
 * @param str url
 * @return
 */
function urlDecode(str = '') {
  return decodeURIComponent(str.replace(/\+/g, '%20'));
}

/**
 * url参数提取
 * @param value
 * @return json {}
 */
function formatUrlData(value) {
  // 1. 监测是否传递参数
  if (value.indexOf('?') === -1) {
    return {};
  }
  const str = value.split('?')[1];

  const attr = {};
  // 空值检测 错误检测
  if (!str || str.indexOf('=') === -1) {
    return attr;
  }
  // 1. 首先检测是否存在 & 符号 如果没有
  if (str.indexOf('&') === -1) {
    attr[str.split('=')[0]] = str.replace(/\s*/g, '').split('=')[1];
  } else {
    const arr = str.split('&');
    arr.forEach((v) => {
      attr[v.split('=')[0]] = v.replace(/\s*/g, '').split('=')[1];
    });
  }
  return attr;
}

/**
 * 空位合并运算符
 * @param value
 * @returns {string|*}
 */

function voidMerge(value) {
  if (value === 0 || value === false) {
    return value;
  }
  return value || '-';
}

/**
 * 格式化金额
 * @param number
 * @returns {string}
 */

function formatMoney(number) {
  // 转为字符串，并按照.拆分
  const arr = (number + '').split('.');
  // 整数部分再拆分
  const int = arr[0].split('');
  // 小数部分
  const fraction = arr[1] || '';
  // 返回的变量
  let r = '';
  int.reverse().forEach(function (v, i) {
    // 非第一位并且是位值是3的倍数，添加“,”
    if (i !== 0 && i % 3 === 0) {
      r = v + ',' + r;
    } else {
      // 正常添加字符(这是好写法)
      r = v + r;
    }
  });
  // 整数部分和小数部分拼接
  return r + (fraction ? '.' + fraction : '');
}

export {
  formatTime,
  hour,
  year,
  isNull,
  Trim,
  guid,
  getItem,
  setItem,
  removeItem,
  urlDecode,
  urlEncode,
  formatUrlData,
  voidMerge,
  formatMoney,
};
