// 引入对应的 token方法
import {getToken,setToken,removeToken} from '@/utils/auth'
import {login,getUserInfo,updatePassword} from '@/api/user'
const state = {
  token:getToken(),  // 从缓存中读取初始值
  userInfo:{

  }
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
  },
  GETUSERINFO(state,userInfo){
    state.userInfo = userInfo;
  }
}

const actions = {
  async login(context,data){
    let token = await login(data)
    // 登录成功后,会返回token    
    context.commit("LOGIN",token);
  },
  // 获取用户的基本资料
  async getUserInfo(context){
    const result = await getUserInfo(); 
    context.commit("GETUSERINFO",result)
  },
  // 退出登录
  logout(context){
    // 提交删除token的方法
    context.commit("LOGOUT")
    // 删除用户信息
    context.commit("GETUSERINFO",{});
  },

}

export default{
  namespaced:true,   // 开启命名空间
  state,
  mutations,
  actions
}