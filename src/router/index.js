import Vue from 'vue'
import Router from 'vue-router'
// import globalAPI from '../promise'

// 主路由
import App from '@/App'
// import LR from '@/LR'

// 前台活动页面路由
const ActiveCenterP = () =>import('@/components/App/ActiveCenter')
const ActiveCenterM = () =>import('@/components/App/Sort')
const ActiveCenter = () =>import('@/components/App/activeA')
const activeBefore = () =>import('@/components/App/active/activeBefore')
const FrActive = () =>import('@/components/App/active/freeReceiveA')
const FrActiveP = () =>import('@/components/App/active/freeReceive.1')
const FrActiveM = () =>import('@/components/App/active/MfreeAnnual')
const objStorageActive = () =>import('@/components/App/active/objStorageActiveA')
const objStorageActiveP = () =>import('@/components/App/active/objStorageActive')
const objStorageActiveM = () =>import('@/components/App/active/Mstorage')


const DBActive = () =>import('@/components/App/active/DatabaseActiveA')
const DBActiveP = () =>import('@/components/App/active/DatabaseActive')
const DBActiveM = () =>import('@/components/App/active/Macdata')


const ddosActive = () =>import('@/components/App/active/ddosA')
const ddosActiveP = () =>import('@/components/App/active/ddos')
const ddosActiveM = () =>import('@/components/App/active/MhignCopy')



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
        {path: 'activityp', name: 'activityp', component: ActiveCenterP,caseSensitive: true},
        {path: 'activitym', name: 'activitym', component: ActiveCenterM,caseSensitive: true},
        {path: 'activebefore',name: 'activebefore', component:activeBefore,caseSensitive: true},
        {path: 'activity/free', name: 'activity/free', component: FrActive,caseSensitive: true},
        {path: 'activity/freem', name: 'activity/freem', component: FrActiveM,caseSensitive: true},
        {path: 'activity/freep', name: 'activity/freep', component: FrActiveP,caseSensitive: true},
        {path: 'activity/objectstorage', name: 'activity/objectstorage', component: objStorageActive,caseSensitive: true},
        {path: 'activity/objectstoragem', name: 'activity/objectstoragem', component: objStorageActiveM,caseSensitive: true},
        {path: 'activity/objectstoragep', name: 'activity/objectstoragep', component: objStorageActiveP,caseSensitive: true},
        {path: 'activity/hotdatabase', name: 'activity/hotdatabase', component: DBActive,caseSensitive: true},
        {path: 'activity/hotdatabasem', name: 'activity/hotdatabasem', component: DBActiveM,caseSensitive: true},
        {path: 'activity/hotdatabasep', name: 'activity/hotdatabasep', component: DBActiveP,caseSensitive: true},
        {path: 'activity/ddosactive',name: 'activity/ddosactive', component:ddosActive,caseSensitive: true},
        {path: 'activity/ddosactivem',name: 'activity/ddosactivem', component:ddosActiveM,caseSensitive: true},
        {path: 'activity/ddosactivep',name: 'activity/ddosactivep', component:ddosActiveP,caseSensitive: true},
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
