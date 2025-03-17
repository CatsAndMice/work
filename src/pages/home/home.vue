<template>
	<view class="p-5">
		<view class="flex flex-col space-y-5">
			<view class="bg-white rounded-lg p-8 flex flex-col items-center shadow"
				@click="navigateTo('/pages/workRanking/workRanking')">
				<van-image width="60" height="60" src="/static/test.png" />
				<text class="text-lg font-bold mt-5 text-gray-800">测一测</text>
				<text class="text-sm text-gray-500 mt-2">计算工作性价比</text>
			</view>
			<!-- 
			<view class="bg-white rounded-lg p-8 flex flex-col items-center shadow"
				@click="navigateTo('/pages/recruitment/recruitment')">
				<van-image width="60" height="60" src="/static/job.png" />
				<text class="text-lg font-bold mt-5 text-gray-800">招聘信息</text>
				<text class="text-sm text-gray-500 mt-2">查看最新招聘岗位</text>
			</view>
			-->
			<view class="bg-white rounded-lg p-8 flex flex-col items-center shadow">
				<van-image width="60" height="60" src="/static/more-features.png" />
				<text class="text-lg font-bold mt-5 text-gray-800">更多功能</text>
				<text class="text-sm text-gray-500 mt-2">开发中，敬请期待</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {}
	},
	methods: {
		navigateTo(url) {
			uni.navigateTo({
				url
			})
		}
	}
}
</script>

<style></style>