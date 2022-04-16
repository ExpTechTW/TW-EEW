# Discord Bot

## 概要
- 以下三種獲取 EEW 資訊的發法
1. [Discord 群組](https://discord.gg/5dbHqV8ees) 追蹤 EEW 頻道
2. 自行架設機器人
3. 使用 ExpTech API 自行開發

## 許可證
- 為避免伺服器負擔，需要得到 許可 才能以上述 `2` 、 `3` 的方式獲取 EEW 資訊
#### 步驟
1. 先取得 ExpTech API Key [這裡](https://github.com/ExpTechTW/API)
2. 到 Discord 申請 許可證

## 機器人
- 下載整個 EEW 項目並 解壓縮
- 安裝 node 環境
- 安裝依賴
```console
npm i discord.js
npm i ws
```
- 配置 `Discord_JavaScript_Bot/config.js`
- 運行 `Discord_JavaScript_Bot/main.js`

## 開發
#### 訂閱 EEW 資訊
- 使用 WebSocket 發送 Json格式 訂閱請求 [範例](https://github.com/ExpTechTW/EEW/blob/%E4%B8%BB%E8%A6%81%E7%9A%84-(main)/Discord_JavaScript_Bot/main.js#:~:text=%23region%20%E8%A8%82%E9%96%B1%E5%9C%B0%E9%9C%87%E9%80%9F%E5%A0%B1%20EEW%20(%E9%9C%80%E8%A6%81%E9%96%8B%E9%80%9A))
```json5
{
  "APIkey": "<ExpTech API Key>",
  "Function": "earthquakeService",
  "Type": "subscription",
  "FormatVersion": 1,
  "UUID": 1 //設備編號 為使用相同 API Key 的機器人進行區隔
}
```
#### 接收資訊
```json5
{
  "Function": 'earthquake',
  "Time": 1650106255000, //地震發生時間
  "EastLongitude": '121.49', //東經
  "NorthLatitude": '23.73', //北緯
  "Depth": '10', //深度
  "Scale": '4.5', //規模
  "MaximumSeismicIntensity": '4', //最大震度
  "Text": true //測試模式 (若沒有這項表示是真實發生的地震)
}
```

## 測試
- 對 ExpTech API POST 下方數據，即可模擬地震速報
```json5
{
  "APIkey": "<ExpTech API Key>",
  "Function": "earthquake",
  "Type": "test",
  "FormatVersion": 1,
  "UUID":1 //設備編號 為使用相同 API Key 的機器人進行區隔
}
```
