import axios from "axios";

//这个api文件写在前端，用于与后端相连，把所有向后端发送的请求都写在这里，便于管理

//网络请求访问路径
const base = {
    baseUrl: "http://127.0.0.1:3300",
    register: "/api/register",
    repeatusername: "/api/repeat/username",
    login: "/api/login"
}

//网络请求方法

const api = {
    register(params) {
        return axios.post(base.baseUrl + base.register, params)
    },
    //用户名重复
    repeatusername(params) {
        return axios.get(base.baseUrl + base.repeatusername, {
            params
        })
    },
    //登录
    login(params) {
        return axios.post(base.baseUrl + base.login, params)
    }
}

export default api;