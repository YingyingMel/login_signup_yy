import React, { useState } from 'react'
import api from '../../api'
import qs from "qs"
import { useNavigate } from "react-router-dom"


const SignUpForm = (props) => {
    let navigate = useNavigate()

    //第一次写，setUser每次只保存一个属性
    // const [user, setUser] = useState(
    //     {
    //         username: '',
    //         email: '',
    //         password: '',
    //         confirmPassword: ''
    //     }
    // )

    // const onSubmit = (e) => {
    //     e.preventDefault()
    //     console.log(user)
    // }
    //下面代码经测试可用
    // const changeHandle = (e) => {
    //     setUser(
    //     { ...user, [e.target.name]: e.target.value }
    //     )
    // }
    //第二次写，user保存了4个属性
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const user = { userName, email, password, confirmPassword }

    const onSubmit = (e) => {
        e.preventDefault()
        console.log(user)
        //下面axios可以执行
        // axios.post("http://127.0.0.1:3300/api/register", qs.stringify(user)).then((res) => {
        //     const result = res.data
        //     console.log(result)
        // }).catch(error => {
        //     console.log(error)
        // })
        //下面通过api的方法也可以用
        api.register(qs.stringify(user))
            .then(res => {
                //成功写入数据库
                if (res.data.status === 200) {
                    console.log(res.data)
                    props.flashActions.addFlashMessage({
                        id: Math.random().toString().slice(2),
                        msg: res.data.msg,
                        type: "success"
                    })
                    //signup成功后跳转首页
                    navigate({ pathname: "/" })
                }
                //数据有效，但写入数据库失败
                if (res.data.status === 500) {
                    console.log(res.data)
                }
                //输入数据有误
                if (res.data.status === 400) {
                    console.log(res.data)
                    props.flashActions.addFlashMessage({
                        id: Math.random().toString().slice(2),
                        msg: res.data.msg,
                        type: "danger"
                    })
                }
            }).catch(error => {
                console.log(error)
            })
    }

    const onBlurCheckUserName = () => {
        api.repeatusername({
            userName
        }).then(res => {
            if (res.data.flag) {
                //不重复
            } else {
                //重复
                alert('用户名重复')
            }
        }).catch(error => {

        })
    }

    return (
        <div>
            <h3>会员注册</h3>
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <label className="control-label">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        name="userName"
                        placeholder="Please input username"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        onBlur={onBlurCheckUserName}
                    />
                </div>
                <div className="mb-3">
                    <label className="control-label">Email</label>
                    <input
                        type="text"
                        className="form-control"
                        name="email"
                        placeholder="Please input email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="control-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="control-label">Confirm password</label>
                    <input
                        type="password"
                        className="form-control"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <button className='btn btn-primary btn-lg'>submit</button>
                </div>
            </form>
        </div>
    )
}

export default SignUpForm
