import qs from 'qs'
import config from "@/api/config";
import axios from 'axios'
import { MessageBox } from 'element-ui'

// 创建axios实例 - 网络上找的封装好的axios实例
const request = axios.create({
    validateStatus(status) {
        return status >= 200 && status < 504 // 设置默认的合法的状态
    },
    baseURL: config.baseUrl, // api 的 base_url
    timeout: config.timeout, // 请求超时时间
})

request.defaults.retry = 3 // 请求重试次数
request.defaults.retryDelay = 1000 // 请求重试时间间隔
request.defaults.shouldRetry = true // 是否重试

// request拦截器
request.interceptors.request.use(
    config => {
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
        config.headers['Accept-Language'] = 'zh-CN'
        if (config.method === 'post') {
            if (!config.data) { // 没有参数时，config.data为null，需要转下类型
                config.data = {}
            }
            config.data = qs.stringify(config.data) // qs序列化参数
        }
        return config
    },
    error => {
        Promise.reject(error)
    }
)
// response 拦截器
request.interceptors.response.use(
    response => {
        if (response.data.message === '依赖服务访问异常') {
            response.data.message = '网络访问异常，请重试～'
        }
        if (response.status !== 200) {
            return Promise.reject(response.data)
        } else {
            return response.data
        }
    },
    err => {
        MessageBox.confirm('程序开小差啦，请点击重试按钮更新信息~', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).catch(() => {
            return Promise.reject(err)
        })
    }
)

export default request

