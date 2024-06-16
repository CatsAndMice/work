import ajax from 'uni-ajax'
import { config } from './config.js'
import toast from '@/utils/toast.js'
import { eq } from "lodash-es"

// 创建请求实例
const instance = ajax.create({
    // 默认配置 
    baseURL: `${config.baseURL}`,
    timeout: 30000,
    header: {
        'content-type': 'application/json'
    },
})

instance.defaults.validateStatus = status => {
    return /^200$/.test(status)
}

// 添加请求拦截器
instance.interceptors.request.use(
    config => {
        return config
    },
    error => {
        console.log(error) // for debug
        Promise.reject(error)
    }
)

// 添加响应拦截器
instance.interceptors.response.use(
    response => {
        const { statusCode } = response
        if (statusCode === 200) {
            const data = response.data
            if (data.code == 200) return data
            toast(data.msg)
            return null
        }
        return null
    },
    error => {
        // 对响应错误做些什么
        console.log('响应错误后', error)
        let response = /code\s(\d+)$/g.exec(error)
        if (response) {
            switch (Number(response[1])) {
                case 404:
                    toast('未发现该接口!')
                    break
                case 500:
                    toast('未发现该接口!')
                    break
                case 502:
                    toast('系统例行停机更新!')
                    break
                case 503:
                    toast('系统发生故障，正在紧急排查中!')
                    break
                default:
                    toast(response.data.message)
                    break
            }
        } else {
            uni.getNetworkType({
                success: function (res) {
                    if (eq(res.networkType, 'none')) {
                        toast('网络连接不可用,请检查网络!')
                    } else {
                        toast('网络连接超时,请检查网络!')
                    }
                }
            })
        }
        return Promise.reject(error)
    }
)

export default instance
