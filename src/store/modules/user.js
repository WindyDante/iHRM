// 引入对应的 token方法
import {getToken,setToken,removeToken} from '@/utils/auth'

const state = {
  token:getToken()  // 从缓存中读取初始值
}

const mutations = {
  LOGIN(state,token){
    state.token = token;
    // 同步缓存
    setToken(token)
  },
  LOGOUT(state){
    // 删除token
    state.token = null;
    removeToken()
  }
}

const actions = {
  login(context,data){
    // todo: 调用登录接口
    // 登录成功后,会返回token    
    context.commit("LOGIN",'123456');
  }
}

export default{
  namespaced:true,   // 开启命名空间
  state,
  mutations,
  actions
}