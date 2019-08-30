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
const FrActive1 = () =>import('@/components/App/active/deposit/hostKinds')
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
        {path: 'free', name: 'free', component: FrActive,caseSensitive: true},
        {path: 'freem', name: 'freem', component: FrActiveM,caseSensitive: true},
        {path: 'freep', name: 'freep', component: FrActiveP,caseSensitive: true},
        {path: 'objectstorage', name: 'objectstorage', component: objStorageActiveP,caseSensitive: true},
        {path: 'objectstoragem', name: 'objectstoragem', component: objStorageActiveM,caseSensitive: true},
        {path: 'objectstoragep', name: 'objectstoragep', component: objStorageActiveP,caseSensitive: true},
        {path: 'hotdatabase', name: 'hotdatabase', component: DBActiveP,caseSensitive: true},
        {path: 'hotdatabasem', name: 'hotdatabasem', component: DBActiveM,caseSensitive: true},
        {path: 'hotdatabasep', name: 'hotdatabasep', component: DBActiveP,caseSensitive: true},
        {path: 'ddosactive',name: 'ddosactive', component:ddosActive,caseSensitive: true},
        {path: 'ddosactivem',name: 'ddosactivem', component:ddosActiveM,caseSensitive: true},
        {path: 'ddosactivep',name: 'ddosactivep', component:ddosActiveP,caseSensitive: true},
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
