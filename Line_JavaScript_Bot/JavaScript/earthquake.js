const fs = require('fs')

let time = 0

async function main(data, config, client, channel) {
    if (time == data.Time) return
    let test = ""
    if (data.Test != undefined) test = " (測試)"
    time = data.Time
    let DATE = new Date(Number(data.Time))
    let now = new Date()
    let date = DATE.getFullYear() +
        "/" + (DATE.getMonth() + 1) +
        "/" + DATE.getDate() +
        " " + DATE.getHours() +
        ":" + DATE.getMinutes() +
        ":" + DATE.getSeconds()
    let Now = now.getFullYear() +
        "/" + (now.getMonth() + 1) +
        "/" + now.getDate() +
        " " + now.getHours() +
        ":" + now.getMinutes() +
        ":" + now.getSeconds()

    let level = ""
    let levelPoint = ""
    if (Number(data.Depth) >= 300) {
        level = "深層"
        levelPoint = "🟩"
    } else if (Number(data.Depth) >= 70) {
        level = "中層"
        levelPoint = "🟨"
    } else if (Number(data.Depth) >= 30) {
        level = "淺層"
        levelPoint = "🟧"
    } else {
        level = "極淺層"
        levelPoint = "🟥"
    }
    client.push(channel, [{
        type: 'text',
        text: `⚠️ EEW 地震速報 ${test}\n${date} 左右發生顯著有感地震\n\n東經: ${data.EastLongitude} 度\n北緯: ${data.NorthLatitude} 度\n深度: ${data.Depth} 公里 (${level} ${levelPoint})\n規模: 芮氏 ${data.Scale}\n最大震度: ${data.MaximumSeismicIntensity} 級\n\n慎防強烈搖晃，就近避難 [趴下、掩護、穩住]`
    }, {
        type: 'image',
        originalContentUrl: `https://exptech.mywire.org/earthquake/${data.Time}.png`,
        previewImageUrl: `https://exptech.mywire.org/earthquake/${data.Time}.png`
    }])
}

module.exports = {
    main
}