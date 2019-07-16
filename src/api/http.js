import axios from 'axios'
import router from '../router/router'
import Vue from 'vue'

const manager = axios.create({
    baseURL: 'http://localhost:8888/api/private/v1/'
})

export const login = ({ username, password }) => {
    return manager.post('/login', {
        username,
        password
    })
}

//添加拦截器
// 添加请求拦截器
manager.interceptors.request.use(function (config) {
    // 请求成功时触发
    config.headers.Authorization = window.sessionStorage.getItem('token');
    return config;//config中含有登录的一些信息,例如token
}, function (error) {
    // 请求失败时触发
    return Promise.reject(error);
});

// 添加响应拦截器
manager.interceptors.response.use(function (response) {
    // 响应成功时触发
    console.log(response);
    if (response.data.meta.status == 400) {
        window.sessionStorage.clear();
        router.push('/login');
        new Vue().$message.error('请先登录!');
    }
    return response;//response中含有相应会来的一些数据
}, function (error) {
    // 响应失败时触发
    return Promise.reject(error);
});

//获取管理员列表
export const users = ({ query, pagenum, pagesize }) => {
    return manager.get('/users', {
        params: {
            query,
            pagenum,
            pagesize,
        },
        headers: {
            Authorization: window.sessionStorage.getItem('token')
        }
    })
}

//获取左侧列表
export const manageList = () => {
    return manager.get('/menus',
        // {
        //     headers: {
        //         Authorization: window.sessionStorage.getItem('token')
        //     }
        // }
    )
}

export const roles = () => {
    return manager.get('/roles', {
        headers: {
            Authorization: window.sessionStorage.getItem('token')
        }
    })
}

export const params = () => {
    return manager.get('/params', {
        headers: {
            Authorization: window.sessionStorage.getItem('token')
        }
    })
}