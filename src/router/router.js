import Vue from 'vue'

//导入组件
import login from '../views/login.vue'
import index from '../views/index.vue'
import users from '../views/users.vue'

//导入路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        { path: '/', redirect: '/login' },
        {
            path: '/login', component: login, meta: {
                needLogin: false//路由元信息,相当于标记位置,不在当前位置(登录页面) needLogin就等于undefined
            }
        },
        {
            path: '/index', component: index,
            children: [
                { path: 'users', component: users }//路径path不能反斜杠
            ]
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.meta.needLogin != false) {//等于false表示当前不在登陆页面,就需要判断一下是否需要登陆
        if (window.sessionStorage.getItem('token') != undefined) {//不等于undefined表示token有值,那就意味着是已登陆状态
            next();
        } else {
            new Vue().$message.warning('请先登录');
            router.push('/login');
        }
    } else {
        next();
    }
})

export default router;