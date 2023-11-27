import request from '@/utils/request'

// 声明一个函数,传入对应的data数据,得到请求的内容,并进行返回
// 在外界通过await和async来触发
export function login(data){
  return request({
    url:'/sys/login',
    method:'post',
    data
  })
}

export function getUserInfo(){
  return request({
    // 不写method,默认是get
    url:'/sys/profile'
  })
}

// 更新密码
export function updatePassword(data){
  return request({
    url:'/sys/user/updatePass',
    method:'put',
    data
  })
}