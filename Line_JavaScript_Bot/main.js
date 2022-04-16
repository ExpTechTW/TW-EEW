//#region 本地依賴
const config = require('./config')
const earthquake = require('./JavaScript/earthquake')

//#region 依賴
const fs = require('fs')
const https = require('https')
const express = require('express')
const linebot = require('linebot')
const app = express()
const WebSocket = require('ws')
const ws = new WebSocket(config.API_WebSocket)
//#endregion

// SSL文件
const privateKey = fs.readFileSync(config.sslKey, 'ascii')
const certificate = fs.readFileSync(config.cert, 'ascii')
const ca = fs.readFileSync(config.ca, 'ascii')
//#endregion

//#region 同步讀取資料
//let User = JSON.parse(fs.readFileSync('./Json/Line/User.json').toString())
//#endregion

//#region 變數
let ver = "1.0.0"
//#endregion

//#region 初始化
const credentials = { ca: ca, key: privateKey, cert: certificate }
const httpsServer = https.createServer(credentials, app)
const client = linebot({
    channelId: config.channelId,
    channelSecret: config.channelSecret,
    channelAccessToken: config.channelAccessToken
})
const linebotParser = client.parser()
app.post('/webhook', linebotParser)
//#endregion

ws.on('open', function open() {
    console.log("已連線")
    //#region 訂閱地震速報 EEW (需要開通)
    ws.send(JSON.stringify({
        "APIkey": config.APIkey,
        "Function": "earthquakeService",
        "Type": "subscription",
        "FormatVersion": 1,
        "UUID": 2
    }))
    //#endregion
})

ws.on('message', function message(data) {
    let Data = JSON.parse(data.toString())
    if (Data.Function == "earthquake") {
        earthquake.main(Data, config, client, "Cdb09380fe4349f5eba5971a7fc09657e")
    }
})

//#region 訊息處理區塊
client.on('message', async function (event) {
    console.log(event.message.text)
})
//#endregion

//#region 監聽端口
httpsServer.listen(3000, function () {
    console.log('BOT已啟動')
})
//#endregion