const getters = {
  sidebar: state => state.app.sidebar, // 取app模块属性
  device: state => state.app.device,
  token: state => state.user.token, // 取user模块属性
  avatar: state => state.user.userInfo.staffPhoto,   // 头像s
  name: state => state.user.userInfo.username,   // 用户名称
  userId: state => state.user.userInfo.userId,
}
// getters 便捷访问
export default getters
