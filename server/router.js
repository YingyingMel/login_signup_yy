const express = require("express")
const router = express.Router();
const validator = require("validator")
const isEmpty = require("lodash/isEmpty")
const sqlFn = require("./config");
const url = require("url"); //get获取参数需要引入
const { result } = require("lodash");
const jwt = require("jsonwebtoken");
const key = require("./secretKey")


const validatorInput = (data) => {
    let errors = {}
    if (validator.isEmpty(data.userName)) {
        errors.username = '用户名不能为空'
    }
    if (!validator.isEmail(data.email)) {
        errors.email = 'email不符合格式'
    }
    if (validator.isEmpty(data.password)) {
        errors.password = '密码不能为空'
    }
    if (!validator.equals(data.password, data.confirmPassword)) {
        errors.confirmPassword = '两次密码不相同'
    }

    return {
        //isEmpty如果 value 为空，那么返回 true，否则返回 false。
        isValid: isEmpty(errors), //validator 里面的isEmpty只校验字符串，lodash里面的isEmpty可以校验对象，数组

        errors
    }
}

router.post("/register", (req, res) => {
    //写死数据来测试
    // const username = req.body.userName //Name要大写开头
    // const email = req.body.email
    // const password = req.body.password
    // const confirmPassword = req.body.confirmPassword
    // if (username) {
    //     res.send({
    //         msg: "success",
    //         status: 200
    //     })
    // } else {
    //     res.send({
    //         msg: "fail",
    //         status: 500
    //     })
    // }
    //验证后的数据
    const { isValid, errors } = validatorInput(req.body)
    if (isValid) {
        //有效,将数据写到数据库
        const { userName, email, password } = req.body
        const sql = "insert into user values (null,?,?,?)";
        const arr = [userName, email, password]
        sqlFn(sql, arr, result => {
            if (result.affectedRows > 0) {
                res.send({
                    msg: "signup success",
                    status: 200
                })
            } else {
                res.send({
                    msg: "error when written in database",
                    status: 500
                })
            }
        })
        //输入数据有错，返回错误原因
    } else {
        res.send(
            {
                status: 400,
                msg: "signup fail",
                errors
            }
        )
    }
})
//get请求，看username是否被占用
router.get("/repeat/username", (req, res) => {
    const userName = url.parse(req.url, true).query.userName; //把请求url里的参数转成对象，然后query参数里的userName
    const sql = "select * from user where userName = ?";
    const arr = [userName]
    sqlFn(sql, arr, result => {
        if (result.length > 0) { //说明用户名重复
            res.send({
                status: 200,
                msg: "用户名重复",
                flag: false
            })
        } else {
            res.send({
                status: 200,
                msg: "用户名可用",
                flag: true
            })
        }
    })
})
//登录请求
router.post("/login", (req, res) => {
    const userName = req.body.userName
    const password = req.body.password
    const sql = "select * from user where username = ? and password = ?"
    const arr = [userName, password]
    sqlFn(sql, arr, result => {
        if (result.length > 0) {
            const token = jwt.sign({ //服务器端生成token
                uid: result[0].id,
                userName: result[0].userName
            }, key.secretKey)
            res.send({
                token, //把token发回给客户浏览器并存储到localstorage或sessionStorage 中
                status: 200,
                nickname: result[0].userName,
                msg: "登录成功"
            })
        } else {
            res.send({
                status: 400,
                msg: "用户名或密码错误"
            })
        }

    })
})

module.exports = router;