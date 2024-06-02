<template>
    <view class="w-screen min-h-screen pb-4" style="background-color: #fafafa;">
        <rank-item v-for="(a, index) in 99" :key="a" :index="index + 1" />
    </view>

    <view @click="onClick" class="fixed right-4 bottom-8 rounded-full bg-white flex justify-center items-center"
        style="width: 100rpx;height: 100rpx;box-shadow: 0 8px 15px rgba(0, 0, 0, .2);">
        <van-image width="60rpx" height="60rpx" fit="cover" style="font-size: 0;" :src="EstimationImage" />
    </view>

</template>
<script>
import RankItem from '@/components/RankItem.vue';
import EstimationImage from "@/static/estimation.png";
import { onLoad } from "@dcloudio/uni-app"
import { login } from "@/api/user/user.js"

export default {
    components: {
        RankItem
    },
    setup() {
        const onClick = () => {
            uni.navigateTo({
                url: `/pages/index/index?typeProp=WORK_EARNINGS`
            })
        }


        onLoad(() => {
            uni.login({
                provider: 'weixin', //使用微信登录
                success: function (loginRes) {
                    console.log(loginRes.code);
                    login({ code: loginRes.code })
                }
            });
        })

        return {
            onClick,
            EstimationImage
        }
    },
}
</script>
