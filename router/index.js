//引入vue-router
import { createRouter, createWebHistory } from 'vue-router'
//ES6  import输入  export 输出
// 模块化 默认私有，如何被别人使用？
// 通过export 输出
// 如何使用
// export default 默认输出
import Index from '@/views/static/index.vue'
import LayoutAdmin from '@/layout/admin/index.vue'
//白名单
const whiteList = ['/', '/login']
import { useUserStore } from '../store/user'

//路由表
const routes = [
  {
    path: '/', //访问路径 http://127.0.0.1:5173/cx/XfDGdOkjVo7deIxQjurcf8BEnNf
    name: 'home', //命名路由
    component: Index, //key:value  默认//页面组件 components 普通组件 页面组件和普通组件是一对多
  },
  {
    path:'/dormitory',
    name:'dormitory',
    component:()=>import('@/views/admin/dormitory.vue')
  },
  ,
  {
    path:'/classinfo',
    name:'classinfo',
    component:()=>import('@/views/admin/classinfo.vue')
  },
  {
    path:'/department',
    name:'department',
    component:()=>import('@/views/admin/department.vue')
  },
  {
    path:'/role',
    name:'role',
    component:()=>import('@/views/admin/role.vue'),
  },
  {
    path: '/backend_api',
    name: 'backend_api',
    component: () => import('@/views/admin/backend_api.vue'),
  },
  {
    path: '/permission',
    name: 'permission',
    component: () => import('@/views/admin/permission.vue'),
  },
  {
    path: '/adcate',
    name: 'adCate',
    component: () => import('@/views/static/adCate.vue'), // 懒加载
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/static/login.vue'), // 懒加载
  },
   { path: '/articleCat',name:'articleCat', component:()=>import('../views/admin/articleCat.vue') //懒加载 
},
  {
    path: '/admin',
    name: 'admin',
    component: LayoutAdmin,
    children: [
      {
        path: '',
        name: 'admin-index',
        component: () => import('@/views/admin/index.vue'),
      },
      {
        path: 'info',
        name: 'admin-info',
        component: () => import('@/views/admin/info.vue'),
      },
      {
        path: 'logout',
        name: 'admin-logout',
        component: () => import('@/views/admin/logout.vue'),
      },
      {
        path: 'changepassword',
        name: 'admin-changepassword',
        component: () => import('@/views/admin/changepassword.vue'),
      },
      {
        path: 'forgetpassword',
        name: 'admin-forgetpassword',
        component: () => import('@/views/admin/forgetpassword.vue'),
      },
    ],
  },

  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('../views/404.vue'), // 懒加载
  },
]
const router = createRouter({
  //模式
  history: createWebHistory(),
  routes,
})
//前置路由守卫
//用户状态 user.js
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()

  if (whiteList.includes(to.path)) {
    // 在白名单中的路径可以无需验证直接访问
    next()
  } else {
    if (userStore.token && userStore.token.length > 0) {
      // 用户已经登录，允许访问请求的路径
      next()
    } else {
      // 用户未登录，重定向到登录页面
      next({ name: 'login' })
    }
  }
})

export default router
