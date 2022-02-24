import axios from 'axios'
export const baseHost = 'http://z.gc.chaomeifan.com/api'
let baseURL: string
if( process.env.NODE_ENV === 'production' ) {
    baseURL = baseHost + '/guangcheng/'
} else {
    baseURL = baseHost + '/guangcheng/'
}
let service = axios.create({
    baseURL: baseURL,
    timeout: 10000 // 请求超时时间
});
// 拦截器
service.interceptors.response.use((response) => {
    return response.data
}, (error) => {
    return Promise.reject(error)
})
service.interceptors.request.use((config: any) => {
    config.headers['Authorization'] = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMzA0ODg3Mjg1MSIsInRpbWUiOjE2NDU1Nzg2OTIwMzgsImlzcyI6InNlY3VyaXR5IiwiaWF0IjoxNjQ1NTc4NjkyLCJleHAiOjE2NDU2OTg2OTJ9.vNK2NLXVJe8pSq9Y3zXEU5OeewH8674WUq9T0lQIHpWkd1Puo5-RS5MQ5C6HBX0fjV2iEOJcDrT_nRV6M6FnzA'
    return config;
}, (error) => {
    return Promise.reject(error)
})

// axios的get请求
export function getAxios(url: string, params?: any) {
    return new Promise((resolve, reject) => {
        service.get(url, {
            params,
        }).then(res => {
            resolve(res.data)
        }).catch(err => {
            console.log(err, '1')
            reject(err)
        })
    })
}

// axios的post请求
export function postAxios(url: string, data?: any) {
    return new Promise((resolve, reject) => {
        service({
            url,
            method: 'post',
            data
        }).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
}

export default service
