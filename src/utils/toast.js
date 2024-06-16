export default (title = "登陆失败", config = { icon: 'error' }) => {
    uni.showToast({
        title,
        duration: 2000,
        ...config
    })
}   