const fs = require('fs')

let time = 0

async function main(data, config, client, channel) {
    if (time == data.Time) return
    time = data.Time
    let Cache = []
    let start = 0
    let location = JSON.parse(fs.readFileSync(config.Path + 'Json/location.json').toString())
    count()
    async function count() {
        let max = false
        let msg = ""
        for (let Index = 0; Index < location.length; Index++) {
            for (let index = 0; index < location[Index]["districts"].length; index++) {
                let point = Math.sqrt(Math.pow(Math.abs(location[Index]["districts"][index]["NorthLatitude"] + (Number(data.NorthLatitude) * -1)) * 111, 2) + Math.pow(Math.abs(location[Index]["districts"][index]["EastLongitude"] + (Number(data.EastLongitude) * -1)) * 101, 2))
                let distance = Math.sqrt(Math.pow(Number(data.Depth), 2) + Math.pow(point, 2))
                let value = Math.round((distance - ((new Date().getTime() - data.Time) / 1000) * 3.5) / 3.5)

                let level = "0"
                let PGA = (1.657 * Math.pow(Math.E, (1.533 * data.Scale)) * Math.pow(distance, -1.607)).toFixed(3)
                if (PGA >= 800) {
                    level = "7"
                } else if (800 >= PGA && 440 < PGA) {
                    level = "6+"
                } else if (440 >= PGA && 250 < PGA) {
                    level = "6-"
                } else if (250 >= PGA && 140 < PGA) {
                    level = "5+"
                } else if (140 >= PGA && 80 < PGA) {
                    level = "5-"
                } else if (80 >= PGA && 25 < PGA) {
                    level = "4"
                } else if (25 >= PGA && 8 < PGA) {
                    level = "3"
                } else if (8 >= PGA && 2.5 < PGA) {
                    level = "2"
                } else if (2.5 >= PGA && 0.8 < PGA) {
                    level = "1"
                } else {
                    level = "0"
                }
                Cache.push({
                    "name": location[Index]["name"].replace("縣", "").replace("市", "") + " " + location[Index]["districts"][index]["name"],
                    "time": value,
                    "level": level,
                    "PGA": PGA
                })
                //data.Time + distance / 3.5
            }
        }
        let NewCache = []
        for (let Index = 0; Index < Cache.length; Index++) {
            let PGACache = 0
            let INDEX = 0
            for (let index = 0; index < Cache.length; index++) {
                if (Number(Cache[index]["PGA"]) > PGACache) {
                    PGACache = Cache[index]["PGA"]
                    INDEX = index
                }
            }
            NewCache.push(Cache[INDEX])
            Cache.splice(INDEX, 1)
        }
        for (let index = 0; index < NewCache.length; index++) {
            if (msg.length >= 1000) break
            if (NewCache[index]["time"] > 0) {
                max = true
                msg = msg + NewCache[index]["name"] + " [剩餘 " + NewCache[index]["time"] + " 秒] [規模: " + NewCache[index]["level"] + "] [PGA: " + NewCache[index]["PGA"] + "]\n"
            } else {
                msg = msg + NewCache[index]["name"] + " [已抵達] [規模: " + NewCache[index]["level"] + "] [PGA: " + NewCache[index]["PGA"] + "]\n"
            }
        }
        try {
            if (start == 0) {
                let channels = client.channels.cache.get(channel)
                message = await channels.send(msg)
                start = message.id
            } else {
                let msgedit = client.channels.cache.get(channel)
                let Msg = await msgedit.messages.fetch(start)
                await Msg.edit(msg);
            }
        } catch (error) {
        }
        if (max) {
            count()
        }
    }
    //fs.writeFileSync(config.Path + 'Json/location.json', JSON.stringify(location, null, "\t"))
}

module.exports = {
    main
}