<template>
    <view class="w-screen min-h-screen pb-4 relative bg-white">
        <view v-show="loading" class="absolute w-screen flex justify-center items-center bg-white"
            style="height: 100%;z-index: 1;">
            <van-loading color="#1989fa" size="24px" vertical>
                <text style="color:#1989fa;">加载中...</text>
            </van-loading>
        </view>
        <!-- 本人 -->
        <rank-item v-for="(list, index) in listRef" :index="index + 1" :key="list.open_id" :user-work-info="list"
            :is-divider="!eq(listRef.length - 1, index)" />
        <view class="h-4" style="background-color: #fafafa;"></view>

        <rank-item v-for="(list, index) in listRef" :index="index + 1" :key="list.open_id" :user-work-info="list"
            :is-divider="!eq(listRef.length - 1, index)" />
        <van-empty v-if="!loading && isEmpty(listRef)" description="暂无数据" />
    </view>
    <van-button @click="onClick" round icon="records"
        class="fixed right-4 bottom-10 rounded-full bg-white flex justify-center items-center" type="info">
        测一测
    </van-button>
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
import images from "@/utils/images.json"
console.log(images);
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
