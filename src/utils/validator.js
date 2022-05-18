//验证用户名、密码是否为空
const validator = require("validator")
const isEmpty = require("lodash/isEmpty")

export const validatorInput = (data) => {
    let errors = {}
    if (validator.isEmpty(data.userName)) {
        errors.username = '用户名不能为空'
    }

    if (validator.isEmpty(data.password)) {
        errors.password = '密码不能为空'
    }

    return {
        //isEmpty里如果 errors 为空，那么返回 true，验证有效，否则返回 false。
        isValid: isEmpty(errors), //validator 里面的isEmpty只校验字符串，lodash里面的isEmpty可以校验对象，数组

        errors
    }
}