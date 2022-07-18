/**
 * 格式化时间-年月日 时分秒
 * @param date 时间字符串
 * @return 格式化的后时间
 */
export function formatTime(date) {
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
 * @return 格式化后的年月日
 */
export function year(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return [year, month, day].map(formatNumber).join('-');
}

/**
 * 格式化时间-时分
 * @param date 时间字符串
 * @return  格式化后的时间
 */
export function hour(date) {
  const hour = date.getHours();
  const minute = date.getMinutes();
  return [hour, minute].map(formatNumber).join(':');
}

export function formatNumber(n) {
  n = n.toString();
  return n[1] ? n : '0' + n;
}

/**
 * 去掉字符串中所有空格
 * @param str 字符串
 * @param isGlobal 是否去掉中间空格
 * @return 去掉空格后的str
 */
export function Trim(str, isGlobal = 'g') {
  let result = str.replace(/(^\s+)|(\s+$)/g, '');
  if (isGlobal === 'g') {
    result = result.replace(/\s/g, '');
  }
  return result;
}

/**
 * 在js中if条件为null/undefined/0/NaN/""表达式时，统统被解释为false,此外均为true .
 * @param arg1 参数
 */
export function isNull(arg) {
  return !!(!arg && arg !== 0 && typeof arg !== 'boolean');
}

/**
 * 生成guid
 * @return guid
 */
export function guid() {
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
 * @return  格式化之后的localStorage
 */
export function getItem(key) {
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
export function setItem(key, obj) {
  localStorage.setItem(key, JSON.stringify(obj));
}

/**
 * 删除指定key的localStorage
 * @param key localStorage的key
 */
export function removeItem(key) {
  localStorage.removeItem(key);
}

/**
 * url编码
 * @param str url
 * @return
 */
export function urlEncode(str = '') {
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
export function urlDecode(str = '') {
  return decodeURIComponent(str.replace(/\+/g, '%20'));
}

/**
 * url参数提取
 * @param value
 * @return json {}
 */
export function formatUrlData(value) {
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
 * 防抖函数,在事件被触发wait秒后再执行回调，如果在这wait秒内又被触发，则重新计时。
 * @param fn
 * @param wait
 * @param defer 如果后续这个单位时间内触再次函数，不再执行回调。可用于合并请求，执行第一次 后续单位时间内不再执行。
 * @return {(function(...[*]): void)|*}
 */
export function debounce(fn, wait = 300, defer = false) {
  let timer, deferTimer;
  return function (...args) {
    let that = this;
    if (timer) {
      clearTimeout(timer);
    }
    if (defer && !deferTimer) {
      deferTimer = true;
      fn.apply(that, args);
    }
    timer = setTimeout(() => {
      deferTimer = null;
      !defer && fn.apply(that, args);
    }, wait);
  };
}

/**
 * 节流函数：规定在一个单位时间内，只能触发一次函数。如果这个单位时间内触发多次函数，只有一次生效。单位时间内循环执行
 * @param fun
 * @param wait
 * @return {(function(...[*]): void)|*}
 */
export function throttle(fun, wait = 300) {
  let last, deferTimer;
  return function (...args) {
    let that = this;
    let now = +new Date();
    if (last && now < last + wait) {
      clearTimeout(deferTimer);
      deferTimer = setTimeout(() => {
        last = now;
        fun.apply(that, args);
      }, wait);
    } else {
      last = now;
      fun.apply(that, args);
    }
  };
}

/**
 * 单位转换 元转分
 * @param m
 * @return {number}
 */
export function regYuanToFen(m) {
  if (!parseFloat(m)) {
    return 0;
  }
  return Math.round(m * 100);
}

/**
 * 单位转换 分转元, float = true 保留两位小数,不足两位则补0；false 没有小数位或不足两位，不补0
 * @param m
 * @param float
 * @return {string|number|string}
 */
export function regFenToYuan(m, float = true) {
  if (!parseInt(m)) {
    return '0.00';
  }
  let num = Math.round((m / 100) * 100) / 100;
  return float ? num.toFixed(2) : num;
}

/**
 * 导出文件csv文件
 * @param data
 * @param name
 * @param type
 */
export function exportFile(data, name, type = 'text/csv;charset=utf-8') {
  let blob;
  if (type.includes('csv')) {
    blob = new Blob(['\ufeff' + data], { type: type });
  } else {
    blob = new Blob([data], { type: type });
  }
  let a = document.createElement('a');
  a.download = name; //指定下载的文件名
  a.href = URL.createObjectURL(blob); //  URL对象
  if (document.all) {
    a.click(); // 模拟点击
  } else {
    //兼容火狐点击事件
    let evt = document.createEvent('MouseEvents');
    evt.initEvent('click', true, true);
    a.dispatchEvent(evt);
  }
  URL.revokeObjectURL(a.href); // 释放URL 对象
}

/**
 * 通过 url 导出文件
 * @param url
 * @param name
 */
export function exportFileByUrl(url, name) {
  let a = document.createElement('a');
  a.download = name;
  a.href = url;
  if (document.all) {
    a.click(); // 模拟点击
  } else {
    //兼容火狐点击事件
    let evt = document.createEvent('MouseEvents');
    evt.initEvent('click', true, true);
    a.dispatchEvent(evt);
  }
  URL.revokeObjectURL(a.href); // 释放URL 对象
}

/**
 * 复制string到粘贴板
 */
export function copyCommand(str) {
  let oInput = document.createElement('textarea');
  oInput.value = str;
  document.body.appendChild(oInput);
  oInput.select();
  document.execCommand('Copy');
  oInput.style.display = 'none';
  document.body.removeChild(oInput);
}

/**
 * 原生判断dom节点是否包含class
 * @param el
 * @param cls
 * @return {*}
 */
export function hasClass(el, cls) {
  if (el && el.className) {
    return el.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
  }
}

/**
 * 给dom节点添加class
 * @param el
 * @param cls
 */
export function addClass(el, cls) {
  if (!hasClass(el, cls)) {
    el.className += ' ' + cls;
  }
}

/**
 * 删除dom节点class
 * @param el
 * @param cls
 */
export function removeClass(el, cls) {
  if (hasClass(el, cls)) {
    let reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
    el.className = el.className.replace(reg, ' ');
  }
}

/**
 * 原生切换dom节点class
 * @param el
 * @param cls
 */
export function toggleClass(el, cls) {
  if (hasClass(el, cls)) {
    removeClass(el, cls);
  } else {
    addClass(el, cls);
  }
}

/**
 * 判断对象类型
 */
export function typeOfSting(obj) {
  const { toString } = Object.prototype;
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object',
    '[object Map]': 'map',
    '[object Set]': 'set',
  };
  return map[toString.call(obj)];
}

/**
 * 获取设备系统类型，主要区分ios与android
 */
export function getDeviceOSType() {
  let _type = 'pc';
  let ua = navigator.userAgent.toLowerCase();
  if (/iphone|ipad|ipod/.test(ua)) {
    _type = 'ios';
  } else if (/android/.test(ua)) {
    _type = 'android';
  }
  return _type;
}

/**
 * 深度克隆
 * @param target
 * @param map
 * @return {*[]|*}
 */
export function deepClone(target, map = new WeakMap()) {
  const isObject = (target) =>
    (typeof target === 'object' || typeof target === 'function') &&
    target !== null;
  if (map.get(target)) return target;
  if (isObject(target)) {
    map.set(target, true);
    const cloneTarget = Array.isArray(target) ? [] : {};
    for (let prop in target) {
      // eslint-disable-next-line no-prototype-builtins
      if (target.hasOwnProperty(prop)) {
        cloneTarget[prop] = deepClone(target[prop], map);
      }
    }
    return cloneTarget;
  } else {
    return target;
  }
}

/**
 * 格式化金额，也封装了指令
 * @param money
 * @return {string}
 */
export function formatMoney(money) {
  return (money + '').replace(/^-?\d+/g, (m) =>
    m.replace(/(?=(?!\b)(\d{3})+$)/g, ',')
  );
}
