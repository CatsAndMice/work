import request from "@/api/request"
import { to } from "await-to-js"
import { eq } from "lodash-es"


export const getAiChat = async (data,cb) => {
    const [err, result] = await to(request.post('/api/wechat/chat',data))
    if (result && eq(result.code, 200)) {
        cb(result.data)
        return
    }
    cb('ai累坏了，请稍后再试')
}