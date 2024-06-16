import request from "@/api/request"
import { to } from "await-to-js"
import { eq } from "lodash-es"
export const login = async (params) => {
    const [err, data] = await to(request.get('/api/wechat/login?code=' + params.code || ''))
    if (data && eq(data.code, 200)) {
        return data.data
    }
    return null
}


export const getUserInfo = async (openId) => {
    const [err, data] = await to(request.get('/api/wechat/info?openId=' + openId))
    if (data && eq(data.code, 200)) {
        return data.data
    }
    return null
}
