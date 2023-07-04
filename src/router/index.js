import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/store";
import HomeView from '../views/HomeView.vue'
import NProgress from 'nprogress' // 进度条插件
import 'nprogress/nprogress.css' // 进度条样式
import Layout from "@/layout";

Vue.use(VueRouter)

const whiteList = ['/login']
NProgress.configure({ showSpinner: false }) // 进度条配置

// 静态路由
const routes = [
    // 布局
    {
        path: '/firstView',
        component: Layout,
        redirect: '/firstView',     //重定向
        meta: {title: '后台首页'},
        children: [
            {
                path: '/firstView',
                meta: {
                    title: "后台首页",
                    roles: ['admin']
                },
                component: () => import('../views/firstView.vue')
            }
        ]
    },
    {
        path: '/home',
        name: 'home',
        meta: {title: '主页', icon: 'el-icon-user'},
        component: HomeView
    },
    {
        path: '/about',
        name: 'about',
        meta: {title: '关于', icon: 'el-icon-user'},
        component: () => import('../views/AboutView.vue')
    },
    {
        path: '/paramRoute/:id',
        name: 'paramRoute',
        meta: {title: '动态参数', icon: 'el-icon-user'},
        component: () => import('../views/paramRoute.vue')
    },
    {
        path: "/account",
        component: Layout,
        redirect: '/account',     //重定向
        meta: {
            title: "账户",
            roles: ['admin', 'user']
        },
        children: [
            {
                path: "/account",
                component: () => import('../views/account.vue'),
                meta: {
                    title: "账户管理",
                    roles: ['admin']
                },
            },
            {
                path: "/goodList",
                name: "goodList",
                component: () => import('../views/goodList.vue'),
                meta: {
                    title: "商品管理",
                    roles: ['user', 'admin']
                }
            }
        ]
    }
]

// 需要权限判断展示的路由
const dynamicRoutes = [
    {
        // path: "/about",
        component: Layout,
        redirect: '/about',     //重定向
        meta: {
            title: "路由",
            roles: ['admin']
        },
        children: [
            {
                path: "/about",
                name: "about",
                component: () => import('../views/AboutView.vue'),
                meta: {
                    title: "关于管理",
                    roles: ['user', 'admin']
                }
            }
        ]
    }
]

const router = new VueRouter({
    routes
})
let addRouFlag = false

router.beforeEach((to, from, next) => {
    // 进度条开始
    NProgress.start()
    // 获取路由 meta 中的title，并设置给页面标题
    document.title = to.meta.title || 'vue2路由'
    // 获取用户登录的token
    const hasToken = true  // getToken()
    // 判断当前用户是否登录
    if (hasToken) {
        if (to.path === '/login') {
            next({ path: '/' })
            NProgress.done()
        } else {
            // 从store中获取用户角色
            // 取到用户的角色
            let GetRole = ['admin'] // user看不到
            if (GetRole) {
                next() //next()方法后的代码也会执行
                // 1.如果路由表 没根据角色进行筛选,就筛选一次
                if (!addRouFlag) {
                    addRouFlag = true
                    // 2.根据用户的角色、和需要动态展示的路由，生成符合用户角色的路由
                    var getRoutes = baseRoleGetRouters(dynamicRoutes, GetRole)
                    // 3.利用global属性，让渲染菜单的组件sideMeuns.vue重新生成左侧菜单
                    global.antRouter = routes.concat(getRoutes)
                    // 4.将生成好的路由addRoutes
                    router.addRoute(global.antRouter)
                    next({...to, replace: true}) // 刷新，再次进入
                }
            } else {
                try {
                    // 通过用户角色，获取到角色路由表
                    const getRoutes = baseRoleGetRouters(dynamicRoutes,GetRole)
                    // 动态添加路由到router内
                    router.addRoute(routes.concat(getRoutes))
                    next({ ...to, replace: true })
                } catch (error) {
                    // 清除用户登录信息后，回跳到登录页去
                    next(`/login?redirect=${to.path}`)
                    NProgress.done()
                }
            }
        }
    } else {
        // 用户未登录
        if (whiteList.indexOf(to.path) !== -1) {
            // 需要跳转的路由是否是whiteList中的路由，若是，则直接条状
            next()
        } else {
            // 需要跳转的路由不是whiteList中的路由，直接跳转到登录页
            next(`/login?redirect=${to.path}`)
            // 结束精度条
            NProgress.done()
        }
    }

})

router.afterEach(() => {
    // 结束精度条
    NProgress.done()
})

function hasPermission(route, roles) {
    if (route.meta && route.meta.roles) {
        return roles.some(role => route.meta.roles.indexOf(role) >= 0)
    } else {
        return true
    }
}

// 根据用户的角色取到该用户对应的路由
function baseRoleGetRouters(allRoutes, roles) {
    // allRoutes是动态路由表
    // roles是取到的用户角色，数组
    let rightRoutes = allRoutes.filter((route, index) => {
        if (hasPermission(route, roles)) {
            if (route.children && route.children.length) {
                route.children = baseRoleGetRouters(route.children, roles)
            }
            return true
        }
        return false
    })
    return rightRoutes
}

export default router
