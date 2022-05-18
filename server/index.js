const express = require("express")
const app = express()
const router = require("./router")
const bodyparser = require("body-parser")
const cors = require("cors")


//解决跨域
app.use(cors())
//处理post参数
app.use(bodyparser.urlencoded({
    extended: true
}))


app.use("/api", router)

app.listen(3300, () => {
    console.log("server is running at http://127.0.0.1:3300")
})

//开启服务器 cd ./server, node index.js