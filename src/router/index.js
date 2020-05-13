import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import My from '../views/My.vue'

Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      redirect: "/home"
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path:'/home',
      component: Home,
      children:[
        {
          path:'',
          name:'My',
          component:My,
          meta: {
            auth: true
          }
        },
        {
          path:'alterInfo',
          name:'AlterInfo',
          component:() => import('../views/AlterInfo.vue'),
          meta: {
            auth: true
          }
        },
        {
          path:'alterTel',
          name:'AlterTel',
          component:() => import('../views/AlterTel.vue'),
          meta: {
            auth: true
          }
        },
        {
          path:'alterPwd',
          name:'AlterPwd',
          component:() => import('../views/AlterPwd.vue'),
          meta: {
            auth: true
          }
        },
        {
          path:'rate',
          name:'Rate',
          component:() => import('../views/Rate.vue'),
          meta: {
            auth: true
          }
        },
        {
          path:'order',
          name:'Order',
          component:() => import('../views/Order.vue'),
          meta: {
            auth: true
          }
        },
        {
          path:'course',
          name:'Course',
          component:() => import('../views/Course.vue'),
          meta: {
            auth: true
          }
        },
        {
          path:'courseDetail/:id',
          name:'CourseDetail',
          component:() => import('../views/CourseDetail.vue'),
          meta: {
            auth: true
          }
        }
      ]
    }
  ]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // 获取 token，登录的标识
  var token = sessionStorage.getItem("token")

  if(to.meta.auth) { // 判断是否需要权限
    if(token) { // 再次判断是否已经有权限了
      next()
    } else {
      next({ // 没有权限，导向登录页
        path: "/login",
        query: {redirect: to.fullPath} // 记录原本想访问的路由
      })
    }
  } else {
    next() // 想去哪就去哪
  }
})

export default router
