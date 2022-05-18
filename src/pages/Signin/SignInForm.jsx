import React, { useState } from 'react'
import api from '../../api'
import qs from 'qs'
import { useNavigate } from 'react-router-dom'
import { validatorInput } from '../../utils/validator'

const SignInForm = (props) => {
  let navigate = useNavigate()
  const [user, setUser] = useState({
    userName: '',
    password: '',
  })

  const onSubmit = (e) => {
    e.preventDefault()
    console.log(user)
    let validatorLogin = validatorInput(user)
    if (!validatorLogin.isValid) {
      alert('用户名或密码不能为空')
    } else {
      props.authAction
        .asyncSetUserObj({
          userName: user.userName,
          password: user.password,
        })
        .then((res) => {
          console.log(res.data)
        })
    }
  }

  const changeHandle = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }
  return (
    <div>
      <h3>会员登录</h3>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label className="control-label">Username</label>
          <input
            type="text"
            className="form-control"
            name="userName"
            placeholder="Please input username"
            value={user.userName}
            onChange={changeHandle}
          />
        </div>
        <div className="mb-3">
          <label className="control-label">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={user.password}
            onChange={changeHandle}
          />
        </div>
        <div className="mb-3">
          <button className="btn btn-primary btn-lg">Login</button>
        </div>
      </form>
    </div>
  )
}

export default SignInForm
