import request from "@/api/request"
import { to } from "await-to-js"
import { eq } from "lodash-es"


export const getToken = async () => {
    const [err, data] = await to(request.get('/api/token'))
    if (data && eq(data.code, 200)) {
        return data.data
    }
    return null
}
