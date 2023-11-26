import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// register globally
Vue.component('svg-icon', SvgIcon)      
// 全局注册组件,在main.js中会对该index.js进行引入

// require.context(目标目录,是否扫描子目录,正则表达式匹配)  扫描目录中的文件
// 这里是以index.js作为当前目录来查找./svg目录下的以.svg结尾的文件
const req = require.context('./svg', false, /\.svg$/)

// req作为参数传递到该方法中,以keys拆分成一个个的数据进行map.拿到每一个文件
const requireAll = requireContext => requireContext.keys().map(requireContext)
// 编写了requireAll方法,并传递参数req,对其进行遍历
// 数组方法 map 和 foreach其实是类似的
// map 是循环每一项 svg图片 
// req函数能够引用图片到项目中
// 将所有的svg都引用到项目中
requireAll(req)
