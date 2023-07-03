import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/store";
import HomeView from '../views/HomeView.vue'
import Layout from "@/layout";

Vue.use(VueRouter)

// 静态路由
const routes = [
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
    // 布局
    {
        path: '/',
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
    // 取到用户的角色
    let GetRole = ['admin'] // user看不到
    // 如果登录了
    if (GetRole) {
        next() //next()方法后的代码也会执行
        // 1.如果路由表 没根据角色进行筛选,就筛选一次
        if (!addRouFlag) {
            addRouFlag = true
            // 2.根据用户的角色、和需要动态展示的路由，生成符合用户角色的路由
            var getRoutes = baseRoleGetRouters(dynamicRoutes, GetRole)
            // 3.利用global属性，让渲染菜单的组件sideMeuns.vue重新生成左侧菜单
            global.antRouter = routes.concat(getRoutes)
            // console.log(global.antRouter)
            // 4.将生成好的路由addRoutes
            router.addRoute(routes.concat(getRoutes))
            // router.options.routes=store.getters.routes
            next({...to, replace: true}) // 刷新，再次进入
        }
    } else {
        // 用户没登录，跳转到登录页面
        if (to.path === '/') {
            next()
        } else {
            next('/')
        }
    }

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
