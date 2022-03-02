import axios from 'axios'
import { Modal } from 'antd'
import { isServer } from './utils'

export const baseHost = 'https://***/'

let baseURL: string
if( process.env.NODE_ENV === 'production' ) {
    baseURL = baseHost + '/'
} else {
    baseURL = baseHost + '/'
}
let service = axios.create({
    baseURL: baseURL,
    timeout: 10000 // 请求超时时间
});
// 拦截器
service.interceptors.response.use((response) => {
    let res = response.data
    if ((res.code !== 0 || (res.msg && res.msg !== 'success'))) {
        if (isServer) {
            console.log(res.msg)
        } else {
            // Modal.error({
            //     title: '请求出错',
            //     okText: '确定',
            //     content: res.msg,
            // });
            console.log(res)
        }
        console.log(res)
    }
    return res
}, (error) => {
    return Promise.reject(error)
})
service.interceptors.request.use((config: any) => {
    return config;
}, (error) => {
    return Promise.reject(error)
})

// axios的get请求
export function getAxios(url: string, params?: any, headers?: any) {
    return new Promise((resolve, reject) => {
        service.get(url, {
            params,
            ...headers
        }).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}

// axios的post请求
export function postAxios(url: string, data?: any, headers?: any) {
    return new Promise((resolve, reject) => {
        service({ url, method: 'post', data, headers }).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}

export default service
