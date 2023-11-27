import axios from 'axios'
import store from '@/store'
// 引入Message作为this.$message的提示消息
import {Message} from 'element-ui'

// 创建一个新的axios实例
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,   // 基础地址
    timeout:10000   // 超时时间
})

// 请求拦截器
service.interceptors.request.use((config)=>{
  // 成功回调函数
  // 注入token
  if (store.getters.token){
    // 为请求头
    config.headers.Authorization = `Bearer ${store.getters.token}`;
  }
  return config;
},
(error)=>{
  // 失败回调函数
  // 请求失败后执行promise
  return Promise.reject(error)
}
)

service.interceptors.response.use((response)=>{
    // 使用解构赋值
    const {data,message,success} = response.data;
    if (success){
      // 业务正常,返回数据对象
      return data;
    }else{
      // 业务错误,返回错误信息
          Message({
            type:'error',
            message:message
          })  
      return Promise.reject(new Error(message))
    }
},(error)=>{
  Message({
    type:'error',
    message:error.message
  })
  return Promise.reject(error)
})

export default service