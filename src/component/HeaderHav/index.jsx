import React from 'react'
import { Link } from 'react-router-dom'

const HeaderNav = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light" >
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">首页</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/signin">登录</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/signup">注册</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav >
    )
}

export default HeaderNav