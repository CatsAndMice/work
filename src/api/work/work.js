import request from "@/api/request"
import Cache from "@/utils/cache"
import { eq } from "lodash-es"
export const computedWork = async (params) => {
   const userInfo = Cache.get('userInfo')
   params.openId = userInfo.openId
   const data = await request.post('/api/wechat/work', params)
   return data
}

export const getWorkRanking = async () => {
   const data = await request.get('/api/wechat/work')
   if (data && eq(data.code, 200)) {
      return data.data
   }
   return []
}

