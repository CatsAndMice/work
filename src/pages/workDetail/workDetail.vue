<template>
    <view class="bg-slate-50 min-h-screen">
        <view class="h-60 bg-center bg-cover bg-no-repeat relative" :style="{
            backgroundImage: `url(${getImage(image)})`
        }">
            <view v-show="isLoadingHeader" class="absolute w-screen flex justify-center items-center bg-white"
                style="height: 100%;z-index: 1;">
                <van-image width="100vw" height="15rem" fit="cover" :webp="true" @load="isLoadingHeader = false"
                    @error="onError" :src="getImage(image)" use-loading-slot>
                    <template #loading>
                        <van-loading color="#1989fa" />
                    </template>
                </van-image>
            </view>
        </view>
        <view v-if="!isEmpty(userDetail)" class="relative p-4 ">
            <view v-show="!isLoadingHeader" class="flex items-center absolute right-4" style="top: -70rpx;">
                <view class="pb-4 mr-4 text-white text-xl">{{ userDetail.user_name }}</view>
                <view class="relative border-solid rounded-lg overflow-hidden inline-flex justify-center items-center"
                    style="width: 100rpx;height: 100rpx;">
                    <van-image v-if="userDetail.avatar" width="100rpx" lazy-load height="100rpx" style="height: 100rpx;"
                        fit="cover" :src="userDetail.avatar" />
                    <view v-else class="text-center text-white "
                        style="width:100rpx;height:100rpx;line-height: 100rpx;background-color: rgb(51, 150, 251);">
                        {{ getLastName(userDetail.user_name) }}
                    </view>
                </view>
            </view>

            <view class="my-4 p-3 rounded shadow flex items-center justify-between  text-sm"
                style="background:linear-gradient(90deg,rgb(51, 150, 251,0.2),#fff) ;">
                <view class="flex items-center">
                    <van-icon name="flag-o" size="50rpx" class="mr-2" style="color: rgb(51, 150, 251); " />
                    <view class="flex items-center">
                        <!-- <view v-if="userDetail.ranking > 100">未上榜😮‍💨</view> -->
                        <view>性价比排行第<text class="text-lg text-red-500 mx-1"> {{ userDetail.ranking }} </text>位
                        </view>
                    </view>
                </view>
                <view class="text-sm">超过<text class="text-lg text-red-500 mx-1"> {{ exceed + '%' }} </text>人</view>
            </view>

            <view class="my-4 p-3 rounded shadow bg-white">
                <view class="flex justify-between items-center">
                    <view class="text-xl font-bold text-base">基本待遇</view>
                </view>
                <view class="flex justify-between ">
                    <view class="flex flex-col">
                        <view class="flex items-center text-sm  my-3">
                            <view class="text-slate-400">平均日薪</view>
                            <view class="ml-2 flex items-center">
                                {{ userDetail.average_daily_firewood }}
                            </view>
                        </view>
                        <view class="flex items-center text-sm  my-3">
                            <view class="text-slate-400">通勤时长</view>
                            <view class="ml-2 flex items-center">
                                {{ userDetail.commute_length }}
                            </view>
                        </view>
                    </view>
                    <view class="flex flex-col">
                        <view class="flex items-center text-sm  my-3">
                            <view class="text-slate-400">工作时长</view>
                            <view class="ml-2 flex items-center">
                                {{ userDetail.working_hours }}
                            </view>
                        </view>

                        <view class="flex items-center text-sm  my-3">
                            <view class="text-slate-400">每天摸鱼时长(小时)</view>
                            <view class="ml-2 flex items-center">
                                {{ userDetail.hours_fish }}
                            </view>
                        </view>
                    </view>
                </view>
            </view>

            <view class="my-4 p-3 rounded shadow bg-white">
                <view class="flex justify-between items-center">
                    <view class="text-xl font-bold text-base">综合环境</view>
                </view>
                <view class="flex justify-between ">
                    <view class="flex flex-col">

                        <view class="flex items-center text-sm  my-3">
                            <view class="text-slate-400">学历</view>
                            <view class="ml-2 flex items-center">
                                {{ getName(qualifications, userDetail.qualification) }}
                            </view>
                        </view>
                        <view class="flex items-center text-sm  my-3">
                            <view class="text-slate-400">异性</view>
                            <view class="ml-2 flex items-center">
                                {{ getName(oppositeSex, userDetail.opposite_sex) }}
                            </view>
                        </view>
                        <view class="flex items-center text-sm  my-3">
                            <view class="text-slate-400">职业资格</view>
                            <view class="ml-2 flex items-center">
                                {{ getName(occupation, userDetail.occupation) }}
                            </view>
                        </view>

                    </view>
                    <!-- 右侧 -->
                    <view class="flex flex-col">
                        <view class="flex items-center text-sm  my-3">
                            <view class="text-slate-400">工作环境</view>
                            <view class="ml-2 flex items-center">
                                {{ getName(workEnv, userDetail.work_env) }}
                            </view>
                        </view>

                        <view class="flex items-center text-sm  my-3">
                            <view class="text-slate-400">同事</view>
                            <view class="ml-2 flex items-center">
                                {{ getName(ditto, userDetail.ditto) }}
                            </view>
                        </view>

                        <view class="flex items-center text-sm  my-3">
                            <view class="text-slate-400">上班时间</view>
                            <view class="ml-2 flex items-center">
                                {{ getName(startWorkTimes, userDetail.start_work_time) }}
                            </view>
                        </view>
                    </view>
                </view>
            </view>

            <view v-show="userDetail.ai_chat" class="my-4 p-3 rounded shadow bg-white">
                <view class="flex justify-between items-center">
                    <view class="text-xl font-bold text-base flex items-center">
                        <van-image fit="widthFix" width="40rpx" height="40rpx" style="height: 40rpx;" :src="aiImage" />
                        <view class="ml-2">ai点评</view>
                    </view>
                </view>
                <view class="flex justify-between mt-2 text-sm">
                    {{ userDetail.ai_chat }}
                </view>
            </view>

        </view>
        <van-empty v-else description="暂无数据" />
    </view>
</template>
<script>
import Cache from "@/utils/cache.js";
import getLastName from "@/utils/getLastName";
import lastImage from '@/static/last.jpg';
import images from "@/utils/images.json"
import { randomInt } from "@/utils/randomInt.js"
import { isEmpty, gte, eq, toNumber } from "lodash-es"
import { shallowRef, unref } from "vue"
import { getResultMessage } from "@/pages/index/getResultMessage"
import { qualifications, workEnv, oppositeSex, ditto, occupation, startWorkTimes } from "@/pages/index/workEnvironment"
import { getWorkExceed } from "@/api/work/work.js"
import { onBeforeMount } from "vue"
import { to } from "await-to-js";
import getImage from "@/pages/workRanking/js/getImage";
import aiImage from '../../static/ai.png'

export default {
    setup() {
        const isLoadingHeader = shallowRef(true)
        const exceed = shallowRef(0)
        const userDetail = shallowRef(Cache.get('userDetail') || {})
        const image = shallowRef(images[randomInt(0, images.length - 1)])
        const getName = (array = [], key) => {
            const index = array.findIndex((item) => {
                return eq(item.key, toNumber(key))
            })
            return index > -1 ? array[index].name : '-'
        }

        const onError = () => {
            image.value = lastImage
            isLoadingHeader.value = false
        }

        onBeforeMount(async () => {
            const MAX = 100
            const unrefUserDetail = unref(userDetail)
            if (!isEmpty(unrefUserDetail)) {
                const [err, result] = await to(getWorkExceed(unrefUserDetail.result))
                if (!isEmpty(result)) {
                    exceed.value = eq(result.exceed, MAX) ? 99.99 : result.exceed
                    if (gte(toNumber(result.ranking), MAX)) {
                        userDetail.value.ranking = result.ranking
                    }
                }
            }
        })

        return {
            aiImage,
            workEnv,
            exceed,
            getName,
            getResultMessage,
            onError,
            userDetail,
            image,
            gte,
            isEmpty,
            occupation,
            getLastName,
            isLoadingHeader,
            qualifications,
            oppositeSex,
            ditto,
            startWorkTimes,
            getImage
        }
    },
}
</script>