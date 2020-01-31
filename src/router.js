import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/Login.vue'
import Home from './components/Home.vue'
import jobList from './components/crontab/jobList.vue'
import logList from './components/crontab/logList.vue'
import workList from './components/workList/index.vue'
Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    {
      path: '/home',
      component: Home,
      redirect: '/home',
      children: [
        { path: '/job', component: jobList }
      ]
    },
    {
      path: '/worker',
      component: Home,
      redirect: '/worker',
      children: [
        { path: '/worker', component: workList },
        { path: '/logList', component: logList }

      ]
    }
  ]
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行
  //     next()  放行    next('/login')  强制跳转

  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
