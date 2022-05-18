import { findIndex } from "lodash";
//初始值
// const flashState = [
//     {
//         msg: "注册成功",
//         type: "success",
//         id: 1001
//     },
//     {
//         msg: "注册失败",
//         type: "danger",
//         id: 1002
//     }
// ]

const flashState = []

const flash = (state = flashState, action) => {
    switch (action.type) {
        case "addFlash":
            return [
                ...state,
                action.message
            ];
        case "delFlash":
            //找到这个id在state数组中的索引号
            let currentIndex = findIndex(state, (item) => item.id === action.id)
            return [ //剔除当前索引号的数据
                ...state.slice(0, currentIndex),//截取从0到当前index(不包含)的数组元素
                ...state.slice(currentIndex + 1)//截取当前index+1 往后的所有数组元素
            ];
        default:
            return state;
    }
}

export default flash