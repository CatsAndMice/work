import request from "@/api/request"

export const login = async (params) => {
    const data = await request.get('/api/wechat/login?code=' + params.code || '')
    return data
}
