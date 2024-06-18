<template>
    <view class="w-screen min-h-screen pb-4 relative" style="background-color: #fafafa;">
        <van-skeleton row="1" class="skeleton" :animate="true" :loading="loading">
            <rank-item v-for="(list, index) in listRef" :index="index + 1" :key="list.open_id" :user-work-info="list"
                :is-divider="!eq(listRef.length - 1, index)" :is-first="index == 0"
                :is-last="index == listRef.length - 1" />
        </van-skeleton>

        <van-empty v-if="!loading && isEmpty(listRef)" description="暂无数据" />
    </view>

    <view @click="onClick" class="fixed right-4 bottom-8 rounded-full bg-white flex justify-center items-center"
        style="width: 100rpx;height: 100rpx;box-shadow: 0 8px 15px rgba(0, 0, 0, .2);">
        <van-image width="60rpx" height="60rpx" fit="cover" style="font-size: 0;" :src="EstimationImage" />
    </view>

</template>
<script>
import RankItem from '@/components/RankItem.vue';
import EstimationImage from "@/static/estimation.png";
import { onLoad } from "@dcloudio/uni-app";
import { login, getUserInfo } from "@/api/user/user.js";
import { to } from "await-to-js";
import Cache from "@/utils/cache.js";
import useList from "@/common/useList.js";
import { getWorkRanking } from "@/api/work/work.js"
import { eq, isEmpty } from "lodash-es"
export default {
    components: {
        RankItem
    },
    setup() {
        const { loading,
            listRef,
            getList } = useList(null, getWorkRanking)

        const onClick = () => {
            uni.navigateTo({
                url: `/pages/index/index?typeProp=WORK_EARNINGS`
            })
        }

        onLoad(() => {
            uni.$off('updateWorkRanking')
            uni.$on('updateWorkRanking', getList)
            getList()
            uni.login({
                provider: 'weixin', //使用微信登录
                success: async function (loginRes) {
                    const [err, data] = await to(login({ code: loginRes.code }))

                    if (data) {
                        const [userErr, userInfo = {}] = await to(getUserInfo(data.openid))
                        Cache.set('userInfo', {
                            ...userInfo,
                            openId: data.openid
                        })
                    }
                }
            });
        })

        return {
            isEmpty,
            loading,
            eq,
            onClick,
            listRef,
            EstimationImage
        }
    },
}
</script>
<style>
.skeleton /deep/ .van-skeleton {
    padding: 0;
}

.skeleton /deep/ .van-skeleton__row {
    min-height: 100vh;
}
</style>
