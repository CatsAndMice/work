<template>
    <view class="w-screen h-screen flex justify-center items-center flex-col">
        <view class=" text-center text-4xl font-medium">这个b班上的值不值</view>
        <view class="text-center mt-6 text-sm">算算你的工作值不值，该跑路还是继续苟</view>
        <view class="text-center mb-6 mt-1 text-sm text-slate-400">算法来自知乎@拉拉拍皮球</view>
        <van-button type="primary" custom-style="border-radius:0.5rem;" @chooseavatar="onChooseavatar"
            open-type="chooseAvatar">开始测试</van-button>
    </view>
</template>
<script>
export default {
    setup() {
        const onChooseavatar = (event) => {
            console.log(event);

            uni.redirectTo({
                url: '/pages/workRanking/workRanking'
            });
        }

        return {
            onChooseavatar
        }
    },
}
</script>