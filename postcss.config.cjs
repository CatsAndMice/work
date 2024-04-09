// postcss.config.js
// 假如你使用的框架/工具不支持 postcss.config.js 配置文件，则可以使用内联的写法
const plugins =  [require('tailwindcss')()]
// plugins.push(require('weapp-tailwindcss/css-macro/postcss'))
module.exports = plugins