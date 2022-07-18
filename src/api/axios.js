import axios from 'axios';
import { Notify } from 'vant';
import { useUserStore } from '@/store/user';

const pendingMap = new Map();

const serve = axios.create({
  timeout: 30000,
  baseURL:
    process.env.NODE_ENV === 'production'
      ? '/rewrite'
      : 'http://192.168.8.131:8100/rpr/api/v1',
});

// 请求拦截器
serve.interceptors.request.use(
  (config) => {
    //删除重复请求开始，配置cancelRequest参数
    removePending(config);
    addPending(config);
    config?.cancelRequest && addPending(config);
    //删除重复请求结束
    const { accessToken } = useUserStore();
    config.headers.access_token = accessToken;
    return config;
  },
  (error) => {
    Notify('请求超时');
    return Promise.reject(error);
  }
);
// 响应拦截器
serve.interceptors.response.use(
  (res) => {
    removePending(res.config);
    if (res.status === 200) {
      return Promise.resolve(res.data);
    } else {
      Notify(res.data.msg);
      return Promise.reject(res.data.msg);
    }
  },
  (error) => {
    error.config && removePending(error.config);
    return Promise.reject(error);
  }
);

// post
export function fetchPost(url, params = {}, config = {}) {
  return fetch(url, params, 'post', config);
}

// put
export function fetchPut(url, params = {}, config = {}) {
  return fetch(url, params, 'put', config);
}

// get
export function fetchGet(url, params = {}, config = {}) {
  return fetch(url, params, 'get', config);
}

// delete
export function fetchDelete(url, params = {}, config = {}) {
  return fetch(url, params, 'delete', config);
}

/**
 * 基础请求,get请求不用拼接url，传个对象过来就行，这里会统一处理
 * @param url 请求地址
 * @param params 参数
 * @param method 请求类型
 * @param config 需要传递的其他axios参数，会覆盖前面的
 * @return {Promise}
 */
export function fetch(url, params = {}, method = 'post', config = {}) {
  return new Promise((resolve, reject) => {
    let data = {
      url,
      method,
      ...config,
    };
    data[method === 'get' ? 'params' : 'data'] = params;
    serve(data)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

/**
 * 删除重复请求开始
 * 生成每个请求唯一的键
 * @param {*} config
 * @returns string
 */
function getPendingKey(config) {
  let { url, method, params, data } = config;
  if (typeof data === 'string') data = JSON.parse(data); // response里面返回的config.data是个字符串对象
  return [url, method, JSON.stringify(params), JSON.stringify(data)].join('&');
}

/**
 * 储存每个请求唯一值, 也就是cancel()方法, 用于取消请求
 * @param {*} config
 */
function addPending(config) {
  const pendingKey = getPendingKey(config);
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken((cancel) => {
      if (!pendingMap.has(pendingKey)) {
        pendingMap.set(pendingKey, cancel);
      }
    });
}

/**
 * 删除重复请求结束
 * 删除重复的请求
 * @param {*} config
 */
function removePending(config) {
  const pendingKey = getPendingKey(config);
  if (pendingMap.has(pendingKey)) {
    const cancelToken = pendingMap.get(pendingKey);
    cancelToken(pendingKey);
    pendingMap.delete(pendingKey);
  }
}
