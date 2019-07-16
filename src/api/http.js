import axios from 'axios'
// axios.defaults.

const manager = axios.create({
    baseURL: 'http://localhost:8888/api/private/v1/'
})

export const login = ({ username, password }) => {
    return manager.post('/login', {
        username,
        password
    })
}

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

export const manageList = () => {
    return manager.get('/menus', {
        headers: {
            Authorization: window.sessionStorage.getItem('token')
        }
    })
}