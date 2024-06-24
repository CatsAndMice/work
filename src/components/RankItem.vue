<template>
    <view class="px-2 py-4 flex items-center justify-between bg-white rounded-lg  relative">
        <view class="rank-num text-white text-center mr-2" :class="{
            'first': index == 1,
            'second': index == 2,
            'third': index == 3
        }">{{ index }}</view>
        <view class="grow flex items-center justify-between">
            <view class="flex items-center grow">
                <view class="relative border-solid rounded-lg overflow-hidden inline-flex justify-center items-center"
                    style="width: 76rpx;height: 76rpx;">
                    <van-image v-if="userWorkInfo.avatar" width="72rpx" lazy-load height="72rpx" fit="cover"
                        :src="userWorkInfo.avatar" />
                    <view v-else class="text-center text-white "
                        style="width:72rpx;height:72rpx;line-height: 72rpx;background-color: rgb(51, 150, 251);">
                        {{ getLastName(userWorkInfo.user_name) }}
                    </view>
                </view>
                <view class="ml-2 ">
                    <view class="truncate " style="color: #333;max-width: 540rpx;">
                        <slot>
                            {{ userWorkInfo.user_name }}
                        </slot>
                    </view>
                    <view class="text-xs mt-0.5" style="color: #a3a3a3;">
                        工作性价比：{{ isUndefined(userWorkInfo.result) ? '-' : userWorkInfo.result }}</view>
                </view>
            </view>
            <slot name="right">
                <view
                    :class="['font-medium text-lg', gte(userWorkInfo.result, 1.5) ? 'text-orange-500' : 'text-sky-500']">
                    {{
            getResultMessage(userWorkInfo.result) }}</view>
            </slot>

        </view>
        <view v-show="isDivider" class="absolute bottom-0 right-0" style="width: calc(100vw - 84rpx);"><van-divider
                customStyle="margin:0;" /></view>
    </view>
</template>
<script>
import { eq, gte, isUndefined } from "lodash-es"
import { getResultMessage } from "@/pages/index/getResultMessage"
import getLastName from "@/utils/getLastName"

export default {
    props: {
        userWorkInfo: {
            type: Object,
            default: {}
        },
        index: {
            type: [Number, String],
            default: 0
        },
        isDivider: {
            type: Boolean,
            default: true
        }
    },
    setup() {

        return {
            eq,
            getResultMessage,
            getLastName,
            gte,
            isUndefined
        }
    },
}
</script>
<style lang="css" scoped>
.rank-num {
    font-size: 24rpx;
    line-height: 50rpx;
    width: 50rpx;
    height: 50rpx;
    background-position: 0 -60px;
    background-image: url('@/static/icon-body.png');
}

.first {
    background-position: -62px -27px;
}

.second {
    background-position: -62px 0;
}

.third {
    background-position: -28px -32px;
}
</style>