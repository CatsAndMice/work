<template>
	<view v-if="loading" class="absolute w-screen flex justify-center items-center bg-white"
		style="height: 100%;z-index: 1;">
		<van-loading color="#1989fa" size="24px" vertical>
			<text style="color:#1989fa;">加载中...</text>
		</van-loading>
	</view>
	<view v-else class="p-4 bg-gray-100">
		<view class="space-y-4">
			<view v-for="item in jobList" :key="item.id" @click="goToDetail(item)"
				class="bg-white rounded-lg p-4 shadow">
				<view class="flex items-start justify-between">
					<text class="text-lg font-bold text-gray-800">{{ item.title }}</text>
					<text class="text-sm text-gray-500">{{ item.createTime }}</text>
				</view>
			</view>
		</view>

		<van-empty v-if="!loading && !jobList.length" description="暂无招聘信息" />
	</view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getRecruitList } from '@/api/recruit/recruit'

const jobList = ref([])
const loading = ref(false)

const goToDetail = (item) => {
	uni.navigateTo({
		url: `/pages/recruitDetail/recruitDetail?id=${item.id}`
	})
}

const loadRecruitList = async () => {
	loading.value = true
	try {
		const data = await getRecruitList()
		jobList.value = data
	} catch (error) {
		uni.showToast({
			title: '获取招聘信息失败',
			icon: 'none'
		})
	} finally {
		loading.value = false
	}
}

onMounted(() => {
	loadRecruitList()
})
</script>

<style></style>