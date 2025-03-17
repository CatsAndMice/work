import request from "@/api/request"
import { eq } from "lodash-es"


export const getRecruitList = async () => {
   const data = await request.get('/api/wechat/recruit/list')
   if (data && eq(data.code, 200)) {
      return data.data
   }
   return []
}

export const getRecruitDetail = async (id) => {
   const data = await request.get(`/api/wechat/recruit/${id}`)
   if (data && eq(data.code, 200)) {
      return data.data
   }
   return null
}