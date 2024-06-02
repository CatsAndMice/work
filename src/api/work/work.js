import request from "@/api/request"

export const computedWork =async (params) => {
   const data = await request.post('/api/wechat/work', params)
   return data
}
