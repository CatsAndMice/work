import { getToken } from "@/api/image/image.js"
import { isEmpty } from "lodash-es"
import Cache from "@/utils/cache.js";
import { updateUserInfo } from "@/api/user/user.js";

export default async (e, cb = () => { }) => {
    const avatarUrl = e.detail.avatarUrl
    const config = await getToken()
    const splitValues = avatarUrl.split('.')
    const data = Cache.get('openId')
    const name = data.openId + '.' + splitValues[splitValues.length - 1]
    const key = config.dir + name
    if (!isEmpty(config)) {
        uni.uploadFile({
            url: config.host,
            filePath: avatarUrl,
            name: 'file',
            formData: {
                policy: config.policy,
                "success_action_status": "200",
                "signature": config.signature,
                "OSSAccessKeyId": config.accessid,
                "x-oss-security-token": config.stsToken,
                "key": key
            },
            success: async () => {
                const url = config.host + '/' + key
                const userInfo = Cache.get('userInfo')
                const isSuccess = await updateUserInfo({
                    avatar: url,
                    openId: data.openId,
                    user_name: userInfo['user_name']
                })
                if (isSuccess) {
                    cb()
                    uni.navigateTo({
                        url: `/pages/index/index?typeProp=WORK_EARNINGS`
                    })
                }
            }
        });

    }
}