<template>
    <view class="p-4 flex items-center justify-between">
        <view class="flex justify-center items-center">
            <view class="relative  border-2 border-solid rounded-full inline-flex justify-center items-center" :class="{
                'first-image': eq(index, 1),
                'second-image': eq(index, 2),
                'third-image': eq(index, 3)
            }" style="border-color: #f87851;width: 76rpx;height: 76rpx;">
                <van-image width="72rpx" lazy-load height="72rpx" round fit="cover"
                    src="https://img.yzcdn.cn/vant/cat.jpeg" style="font-size: 0;" />
            </view>
            <view class="ml-2 ">
                <view class="truncate " style="color: #333;max-width: 540rpx;">李海</view>
                <view class="text-xs mt-0.5" style="color: #a3a3a3;">工作性价比：2</view>
            </view>
        </view>
        <view class="rank-num text-white text-center" :class="{
                'first': eq(index, 1),
                'second': eq(index, 2),
                'third': eq(index, 3)
            }">{{ index }}</view>
    </view>
    <view class="mx-4"> <van-divider custom-style="margin:0;" /></view>
</template>
<script>
import { eq } from "lodash-es"

export default {
    props: {
        index: {
            type: Number,
            default: 1
        }
    },
    setup() {
        return {
            eq
        }
    },
}
</script>
<style lang="css" scoped>
.first-image::before {
    content: "";
    position: absolute;
    background-position: -115px -44px;
    background-image: url('@/static/icon-body.png');
    width: 40rpx;
    height: 40rpx;
    top: 0;
    margin-top: -20rpx;
    z-index: 1;
    left: 52rpx;
}

.second-image::before {
    content: "";
    position: absolute;
    background-position: -115px -66px;
    background-image: url('@/static/icon-body.png');
    width: 40rpx;
    height: 40rpx;
    top: 0;
    margin-top: -20rpx;
    z-index: 1;
    left: 52rpx;
}


.third-image::before {
    content: "";
    position: absolute;
    background-position: -115px -88px;
    background-image: url('@/static/icon-body.png');
    width: 40rpx;
    height: 40rpx;
    top: 0;
    margin-top: -20rpx;
    z-index: 1;
    left: 52rpx;
}


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