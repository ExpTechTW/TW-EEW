const config = require('./config')
const earthquake = require('./JavaScript/earthquake')

const WebSocket = require('ws')
const { Client, Intents } = require('discord.js')
const client = new Client({ intents: [Intents.FLAGS.GUILDS] })
const ws = new WebSocket(config.API_WebSocket)

ws.on('open', function open() {
    console.log("已連線")
    //#region 訂閱地震速報 EEW (需要開通)
    ws.send(JSON.stringify({
        "APIkey": config.APIkey,
        "Function": "earthquakeService",
        "Type": "subscription",
        "FormatVersion": 1,
        "UUID": 1
    }))
    //#endregion
})

ws.on('message', function message(data) {
    let Data = JSON.parse(data.toString())
    if (Data.Function == "earthquake") {
        earthquake.main(Data, config, client, "926818666715152394")
    }
})

ws.on('close', function message(data) {
    console.log("重新連線")
})

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
})

client.login(config.Token)