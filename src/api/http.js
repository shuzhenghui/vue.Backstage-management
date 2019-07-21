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
    // console.log(response);
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
            Authorization: window.sessionStorage.getItem('token')//携带token去请求服务器
        }
    })
}

//获取左侧列表
export const manageList = () => {
    return manager.get('/menus')
}

//修改用户状态接口
export const statement = (uId, type) => {
    return manager.put(`/users/${uId}/state/${type}`)
}

//删除用户接口
export const deleteuser = (id) => {
    return manager.delete(`/users/${id}`)
}

//添加用户
export const adduser = ({ username, password, email, mobile }) => {
    return manager.post(`/users`, {
        username,
        password,
        email,
        mobile
    })
}

//编辑用户
export const edituser = ({ id, email, mobile }) => {
    return manager.put(`/users/${id}`, {
        email,
        mobile
    })
}

//角色列表
export const userlist = () => {
    return manager.get(`/roles`)
}
//权限列表
export const rightlist = () => {
    return manager.get(`/rights/list`)
}

//权限树
export const righttree = () => {
    return manager.get(`/rights/tree`)
}

//分配权限
export const giveRight = ({ roleId, rids }) => {
    return manager.post(`roles/${roleId}/rights`, {
        rids
    })
}

//分配用户角色
export const fenpei = ({ id, rid }) => {
    return manager.put(`users/${id}/role`, {
        rid
    })
}

//删除角色指定权限
export const deleteRight = ({ roleId, rightId }) => {
    return manager.delete(`roles/${roleId}/rights/${rightId}`)
}

//编辑角色
export const editRole = ({ id, roleName, roleDesc }) => {
    return manager.put(`roles/${id}`, {
        roleName,
        roleDesc
    })
}

// 删除角色
export const deleteRole = ({ id }) => {
    return manager.delete(`roles/${id}`)
}

// 添加角色
export const addRole = ({ roleName, roleDesc }) => {
    return manager.post(`roles`, {
        roleName,
        roleDesc
    })
}

//获取商品列表
export const getGoods = ({ query, pagenum, pagesize }) => {
    return manager.get(`/goods`, {
        params: {
            query,
            pagenum,
            pagesize,
        }

    })
}

//获取商品分类
export const getCategories = () => {
    return manager.get('/categories', {
        params: {
            type: 3
        }
    })
}

//获取订单分类
export const getorders = ({ query,
    pagenum,
    pagesize,
    user_id,
    pay_status,
    is_send,
    order_fapiao_title,
    order_fapiao_company,
    order_fapiao_content,
    consignee_addr }) => {
    return manager.get('/orders', {
        params: {
            query,
            pagenum,
            pagesize,
            user_id,
            pay_status,
            is_send,
            order_fapiao_title,
            order_fapiao_company,
            order_fapiao_content,
            consignee_addr
        }
    })
}



//根据id查询用户信息接口
export const searchId = ({ id }) => {
    return manager.get(`/users/:${id}`)
}

//获取角色列表请求
export const roles = () => {
    return manager.get('/roles')
}

export const params = () => {
    return manager.get('/params')
}