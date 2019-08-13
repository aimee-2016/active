import Vue from 'vue'
import Router from 'vue-router'
// import globalAPI from '../promise'

// 主路由
import App from '@/App'
// import LR from '@/LR'

// 前台活动页面路由
const ActiveCenter = () =>import('@/components/App/ActiveCenter')
const activeBefore = () =>import('@/components/App/active/activeBefore')
const FrActive = () =>import('@/components/App/active/freeReceive.1')
const objStorageActive = () =>import('@/components/App/active/objStorageActive')
const DBActive = () =>import('@/components/App/active/DatabaseActive')
const ddosActive = () =>import('@/components/App/active/ddos')
const ddosActiveM = () =>import('@/components/App/active/hignCopy')
const ddosActive1 = () =>import('@/components/App/active/ddosA')

// 404
const notFindPage = () => import('@/components/404')

Vue.use(Router)

var router = new Router({
  mode: 'history',
  routes: [
    {
      path: '',
      name: App.name,
      component: App,
      children: [
        {path: '/', name: 'activity', component: ActiveCenter,caseSensitive: true},
        {path: 'activity', name: 'activity', component: ActiveCenter,caseSensitive: true},
        {path: 'activebefore',name: 'activebefore', component:activeBefore,caseSensitive: true},
        {path: 'activity/free', name: 'activity/free', component: FrActive,caseSensitive: true},
        {path: 'activity/objectstorage', name: 'activity/objectstorage', component: objStorageActive,caseSensitive: true},
        {path: 'activity/hotdatabase', name: 'activity/hotdatabase', component: DBActive,caseSensitive: true},
        {path: 'activity/ddosactive',name: 'activity/ddosactive', component:ddosActive,caseSensitive: true},
        {path: 'activity/highcopy',name: 'activity/highcopy', component:ddosActiveM,caseSensitive: true},
        {path: 'activity/ddosactive1',name: 'activity/ddosactive1', component:ddosActive1,caseSensitive: true},
      ]
    },
    {path: '/*', name: '404', component: notFindPage},
  ]
})

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0)
  if (to.matched.some(route => {
      return route.meta.requiresAuth
    })) {
    if (!localStorage.getItem('authToken')) {
      next({
        path: '/login'
        // query: { redirect: to.fullPath }//把要跳转的地址作为参数传到下一步
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
