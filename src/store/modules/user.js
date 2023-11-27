// 引入对应的 token方法
import {getToken,setToken,removeToken} from '@/utils/auth'
import {login} from '@/api/user'
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
  async login(context,data){
    let token = await login(data)
    // 登录成功后,会返回token    
    context.commit("LOGIN",token);
  }
}

export default{
  namespaced:true,   // 开启命名空间
  state,
  mutations,
  actions
}