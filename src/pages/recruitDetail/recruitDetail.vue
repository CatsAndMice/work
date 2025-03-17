<template>
    <view v-if="loading" class="absolute w-screen flex justify-center items-center bg-white"
        style="height: 100%;z-index: 1;">
        <van-loading color="#1989fa" size="24px" vertical>
            <text style="color:#1989fa;">加载中...</text>
        </van-loading>
    </view>
    <view v-else class="p-4 bg-gray-100 min-h-screen">
        <!-- <van-loading v-if="loading" class="flex justify-center mt-8" /> -->
        <view class="space-y-4">
            <view v-for="(item, index) in detail" :key="index" class="bg-white rounded-lg p-6 shadow-md">
                <view class="markdown-header">
                    <view class="flex items-center mb-2 text-left">
                        <view class="w-1 h-6 bg-blue-500 rounded mr-2"></view>
                        <text class="text-lg font-bold">招聘信息 {{ index + 1 }}</text>
                    </view>
                    <view @tap="copyContent(item.body)" class="text-sm text-blue-500 bg-blue-50 px-3 py-2 rounded mb-1">
                        复制内容(包含链接)
                    </view>
                </view>
                <view class="markdown-body">
                    <rich-text :nodes="formatMarkdown(item.body)" @tap="handleLinkTap"></rich-text>
                </view>
            </view>
        </view>
        <van-empty v-if="!loading && !detail?.length" description="暂无详情信息" />
    </view>
</template>

<script setup>
import { ref } from 'vue'
import { getRecruitDetail } from '@/api/recruit/recruit'
import { onLoad } from '@dcloudio/uni-app'
import { marked } from 'marked'

const detail = ref([])
const loading = ref(false)

const handleLinkTap = (e) => {
    console.log(e.target, e.currentTarget);

    const url = e.target?.dataset?.href
    console.log(url);

    if (url) {
        uni.setClipboardData({
            data: url,
            success: () => {
                uni.showToast({
                    title: '链接已复制',
                    icon: 'success'
                })
            }
        })
    }
}

const formatMarkdown = (content) => {
    if (!content) return ''
    const renderer = new marked.Renderer()
    renderer.link = (link) => {
        const { href, text } = link
        return `<a class="markdown-link" href="${href}" data-href="${href}">${text}</a>`
    }
    marked.setOptions({ renderer })
    return marked(content)
}

const loadDetail = async (id) => {
    loading.value = true
    try {
        const data = await getRecruitDetail(id)
        detail.value = data
    } catch (error) {
        uni.showToast({
            title: '获取详情失败',
            icon: 'none'
        })
    } finally {
        loading.value = false
    }
}

onLoad((options) => {
    const { id } = options
    if (id) {
        loadDetail(id)
    }
})

const copyContent = (content) => {
    uni.setClipboardData({
        data: content,
        success: () => {
            uni.showToast({
                title: '内容已复制',
                icon: 'success'
            })
        }
    })
}
</script>

<style>
.markdown-body {
    font-size: 28rpx;
    line-height: 2;
    color: #2d3748;
    letter-spacing: 0.5px;
    word-wrap: break-word;
    word-break: break-all;
    /* white-space: pre-wrap; */
}

/* 针对英文单词的换行处理 */
.markdown-body p,
.markdown-body li,
.markdown-body td {
    word-break: break-word;
    overflow-wrap: break-word;
    hyphens: auto;
}

/* 针对链接的换行处理 */
.markdown-body .markdown-link {
    display: inline-block;
    max-width: 100%;
    word-wrap: break-word;
    word-break: break-all;
    overflow-wrap: break-word;
}

.markdown-body h1,
.markdown-body h2,
.markdown-body h3 {
    font-weight: 600;
    margin: 32rpx 0 16rpx;
    color: #1a202c;
    line-height: 1.4;
}

.markdown-body h1 {
    font-size: 36rpx;
    border-bottom: 2rpx solid #e2e8f0;
    padding-bottom: 16rpx;
}

.markdown-body h2 {
    font-size: 32rpx;
}

.markdown-body h3 {
    font-size: 30rpx;
}

.markdown-body p {
    margin: 24rpx 0;
    color: #4a5568;
    text-align: justify;
}

.markdown-body ul,
.markdown-body ol {
    padding-left: 32rpx;
    margin: 24rpx 0;
}

.markdown-body li {
    margin: 16rpx 0;
    position: relative;
    padding-left: 8rpx;
}

.markdown-body ul li::before {
    content: "";
    position: absolute;
    left: -16rpx;
    top: 16rpx;
    width: 6rpx;
    height: 6rpx;
    background-color: #4a5568;
    border-radius: 50%;
}

.markdown-body code {
    background-color: #edf2f7;
    padding: 4rpx 12rpx;
    border-radius: 4rpx;
    color: #2d3748;
    font-family: Consolas, Monaco, monospace;
    font-size: 26rpx;
}

.markdown-body strong {
    color: #2d3748;
    font-weight: 600;
}

.markdown-body blockquote {
    border-left: 4rpx solid #cbd5e0;
    padding: 16rpx 24rpx;
    margin: 24rpx 0;
    background-color: #f7fafc;
    color: #718096;
}

.markdown-body a {
    color: #4299e1;
    text-decoration: none;
}

.markdown-body img {
    max-width: 100%;
    border-radius: 8rpx;
    margin: 24rpx 0;
}

.markdown-body table {
    width: 100%;
    border-collapse: collapse;
    margin: 24rpx 0;
}

.markdown-body th,
.markdown-body td {
    border: 2rpx solid #e2e8f0;
    padding: 16rpx;
    text-align: left;
}

.markdown-body th {
    background-color: #f7fafc;
    font-weight: 600;
}

.markdown-body .markdown-link {
    color: #3182ce;
    font-weight: 500;
    text-decoration: none;
    padding: 4rpx 8rpx;
    margin: 0 2rpx;
    border-radius: 4rpx;
    background-color: rgba(66, 153, 225, 0.1);
    display: inline-block;
    border: 1px solid rgba(66, 153, 225, 0.2);
    transition: all 0.2s ease;
}

.markdown-body .markdown-link:active {
    background-color: rgba(66, 153, 225, 0.2);
    transform: translateY(1px);
}
</style>