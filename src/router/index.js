import Vue from 'vue'
import Router from 'vue-router'
// import globalAPI from '../promise'

// 主路由
import App from '@/App'
// import LR from '@/LR'

// 前台活动页面路由
const ActiveCenter = () => import('@/components/App/activeA')
const activeBefore = () => import('@/components/App/active/activeBefore')
const FrActive1 = () => import('@/components/App/active/hostKinds')
const objStorageActiveP = () => import('@/components/App/active/objStorageActive')
const DBActiveP = () => import('@/components/App/active/DatabaseActive')
const ddosActive = () => import('@/components/App/active/ddos')
const anniversary = () => import('@/components/App/active/Anniversary')
// 404
const notFindPage = () => import('@/components/404')

Vue.use(Router)

var router = new Router({
  mode: 'history',
  routes: [{
      path: '',
      name: App.name,
      component: App,
      children: [{
          path: '/',
          name: 'activity',
          component: ActiveCenter,
          caseSensitive: true
        },
        {
          path: 'activebefore',
          name: 'activebefore',
          component: activeBefore,
          caseSensitive: true
        },
        {
          path: 'free',
          name: 'free',
          component: FrActive1,
          caseSensitive: true
        },
        {
          path: 'objectstorage',
          name: 'objectstorage',
          component: objStorageActiveP,
          caseSensitive: true
        },
        {
          path: 'hotdatabase',
          name: 'hotdatabase',
          component: DBActiveP,
          caseSensitive: true
        },
        {
          path: 'ddosactive',
          name: 'ddosactive',
          component: ddosActive,
          caseSensitive: true
        },
        {
          path: 'anniversary',
          name: 'anniversary',
          component: anniversary,
          caseSensitive: true
        }
      ]
    },
    {
      path: '/*',
      name: '404',
      component: notFindPage
    },
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
