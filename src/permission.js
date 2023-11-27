import router  from "@/router";
import nProgress from "nprogress";
import 'nprogress/nprogress.css'
import store from "@/store";

/**
 * 前置守卫
 */
const whiteList = ['/login','/404']
router.beforeEach(
  async (to,from,next) => {
    // 开启进度条
    nProgress.start();
    if (store.getters.token){
      // 存在token
      if (to.path === '/login'){
        // 存在token且访问的是登录页,则跳转到主页
        next('/');
        // next(地址)不执行后置路由守卫,所以进度条没有关闭,需要手动关闭
        nProgress.done();
      }
      else{
        // 判断是否获取过用户信息
        if (!store.getters.userId){
          // 没有userId,就进行获取
          await store.dispatch("user/getUserInfo")
        }
        // 存在token且访问的不是登录页
        // 放行
        next();
      }
    }
    else{
      // 没有token
      if (whiteList.includes(to.path)){
        // 不存在token且访问的是登录页,则跳转到登录页
        next();
      }
      else{
        // 不存在token且访问的不是登录页
        // 放行
        next('/login');
        nProgress.done();
      }
    }
  }
);

/**
 * 后置守卫
 */
router.afterEach(()=>{
  nProgress.done();
});