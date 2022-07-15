import { fetchGet } from '@/api/axios'
/** 获取 */
export function getList(data) {
    return fetchGet('http://pv.sohu.com/cityjson?ie=utf-8', data)
}
