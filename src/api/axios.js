import axios from 'axios'
import { ElMessage } from 'element-plus'

import qs from 'qs'
// 响应时间
console.log(process.env.NODE_ENV)
const serve = axios.create({
    timeout: 30000,
    baseURL: process.env.NODE_ENV === 'production' ? '/rewrite' : '',
})

// 请求拦截器
serve.interceptors.request.use(
    (config) => {
        ElMessage.error('111')
        const token = sessionStorage.getItem('token')
        token && (config.headers.authorization = token)
        if (config.method === 'post') {
            config.data = qs.stringify(config.data)
        }
        return config
    },
    (error) => {
        ElMessage.error('请求超时')
        return Promise.reject(error)
    },
)
// 响应拦截器
serve.interceptors.response.use(
    (res) => {
        debugger
        if (res.status === 200) {
            return Promise.resolve(res.data)
        } else {
            ElMessage.error(res.data.msg)
            return Promise.reject(res.data.msg)
            // switch (res.data.code) {
            //   case 401:
            //     return Promise.reject(res.data.msg)
            //   case 400:
            //     return Promise.reject(res.data.msg)
            //   case 402:
            //     return Promise.reject(res.data.msg)
            // }
        }
    },
    (error) => {
        return Promise.reject(error)
    },
)

// post
export function fetchPost(url, params = {}) {
    return fetch(url, params, 'post')
}

// put
export function fetchPut(url, params = {}) {
    return fetch(url, params, 'put')
}

// get
export function fetchGet(url, params = {}) {
    return fetch(url, params, 'get')
}

// delete
export function fetchDelete(url, params = {}) {
    return fetch(url, params, 'delete')
}

// fetch
function fetch(url, params = {}, method = 'post') {
    return new Promise((resolve, reject) => {
        serve[method](url, method === 'post' || method === 'put' ? params : { params })
            .then(
                (response) => {
                    resolve(response)
                },
                (err) => {
                    reject(err)
                },
            )
            .catch((error) => {
                reject(error)
            })
    })
}
