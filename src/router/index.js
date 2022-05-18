import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import App from "../pages/App"
import SignUpPage from '../pages/SignUp/SignUpPage'
import HeaderNav from '../component/HeaderHav'
import SigninPage from '../pages/Signin/SigninPage'
import FlashMessageList from '../component/Flash/FlashMessageList'


const Index = () => {
    return (
        <Router>
            <HeaderNav />
            <FlashMessageList />
            <Routes>
                <Route exact path='/' element={<App />}></Route>
                <Route path='/signup' element={<SignUpPage />}></Route>
                <Route path='/signin' element={<SigninPage />}></Route>
            </Routes>
        </Router>
    )
}

export default Index