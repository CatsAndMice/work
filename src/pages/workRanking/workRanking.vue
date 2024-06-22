<template>
    <view class="w-screen min-h-screen pb-4 relative bg-white">
        <view v-show="loading" class="absolute w-screen flex justify-center items-center bg-white"
            style="height: 100%;z-index: 1;">
            <van-loading color="#1989fa" size="24px" vertical>
                <text style="color:#1989fa;">加载中...</text>
            </van-loading>
        </view>

        <view v-show="!isEmpty(firstUser)" class="h-60 bg-center bg-cover bg-no-repeat relative" :style="{
            backgroundImage: `url(${image})`
        }">



<!-- 
            <view v-show="loading" class="absolute w-screen flex justify-center items-center bg-white"
                style="height: 100%;z-index: 1;">
                <van-loading color="#1989fa" size="24px" vertical>
                    <text style="color:#1989fa;">加载中...</text>
                </van-loading>
            </view> -->


            <view class="text-white font-semibold text-xl p-4 pb-2">{{ getYmd() }}</view>
            <view class="text-white pl-4">
                <view class="relative border-solid rounded-lg overflow-hidden inline-flex justify-center items-center">
                    <van-image v-if="firstUser.avatar" width="60rpx" lazy-load height="60rpx" fit="cover"
                        :src="firstUser.avatar">
                    </van-image>
                    <view v-else class="text-center text-white "
                        style="width:60rpx;height:60rpx;line-height: 60rpx;background-color: rgb(51, 150, 251);">
                        {{ getLastName(firstUser.user_name) }}
                    </view>
                </view>
                <text class="ml-2">{{ firstUser.user_name }}占领了封面</text>
            </view>
        </view>
        <!-- 本人 -->
        <view v-show="!isEmpty(selfUser)">
            <rank-item :index="selfUser.index + 1" :user-work-info="selfUser" :is-divider="false">
                {{ selfUser.user_name + '(我)' || '' }}
            </rank-item>
            <view class="h-4" style="background-color: #fafafa;"></view>
        </view>

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
import { shallowRef, unref } from 'vue';
import getLastName from "@/utils/getLastName"

export default {
    components: {
        RankItem
    },
    setup() {
        const firstUser = shallowRef({})
        const selfUser = shallowRef({})

        const { loading,
            listRef,
            getList } = useList(null, async () => {
                const data = await getWorkRanking()
                firstUser.value = data[0] || {}
                return data
            })

        const onClick = () => {
            uni.navigateTo({
                url: `/pages/index/index?typeProp=WORK_EARNINGS`
            })
        }

        const randomInt = (min, max) => {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        const getYmd = () => {
            const date = new Date()
            const year = date.getFullYear()
            const month = date.getMonth() + 1
            const day = date.getDate()
            return `${year}年${month}月${day}日`
        }

        const getSelfUser = (openId, data = []) => {
            let i = 0
            const selfUser = data.find((item, index) => {
                const isEq = item.open_id == openId
                i = index
                return isEq
            })
            console.log(selfUser);
            return { ...unref(selfUser), index: i }
        }

        onLoad(() => {
            uni.$off('updateWorkRanking')
            uni.$on('updateWorkRanking', () => getList(null, () => {
                const userInfo = Cache.get('userInfo')
                selfUser.value = getSelfUser(userInfo.openId, unref(listRef))
            }))
            getList(null, () => {
                uni.login({
                    provider: 'weixin', //使用微信登录
                    success: async function (loginRes) {
                        const [err, data] = await to(login({ code: loginRes.code }))
                        if (data) {
                            const [userErr, userInfo = {}] = await to(getUserInfo(data.openid))
                            selfUser.value = getSelfUser(data.openid, unref(listRef))
                            Cache.set('userInfo', {
                                ...userInfo,
                                openId: data.openid
                            })
                        }
                    }
                });
            })
        })

        return {
            firstUser,
            getYmd,
            isEmpty,
            loading,
            eq,
            selfUser,
            onClick,
            listRef,
            EstimationImage,
            getLastName,
            image: images[randomInt(0, images.length - 1)]
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
