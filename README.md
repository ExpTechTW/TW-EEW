# TW-EEW
<img alt="Discord" src="https://img.shields.io/discord/926545182407688273">

------

- 中央氣象局 EEW 強震即時警報 ( Earthquake Early Warning )

## 索引
- [文檔](#文檔)
- [依賴](#依賴)
- [原理](#原理)
- [註釋](#註釋)
- [效果](#效果)
- [貢獻者](#貢獻者)
- [發佈規則](#發佈規則)
- [合作](#合作)

## 文檔
- [Discord 文檔](https://github.com/ExpTechTW/EEW/blob/%E4%B8%BB%E8%A6%81%E7%9A%84-(main)/Discord.md)

## 依賴
- 服務
  - [ExpTech API](https://github.com/ExpTechTW/API)
- 文件
  - [座標文件](https://github.com/ExpTechTW/EEW/blob/%E4%B8%BB%E8%A6%81%E7%9A%84-(main)/locations.json)

## 原理
- 當地震發生時，由 ExpTech API 解析取得 `EEW 地震資訊[註1]`，並透過 WebSocket 廣播到所有已訂閱設備
- 機器人在收到地震資訊後，會計算 `到達時間[註2、3、4、5]` 以及 `PGA[註6、7]`，並換算成對應震度

## 註釋
1. 預警盲區約為 75 公里
2. 震央距離=`√((地標經度-震央經度×-1)×101)²+((地標緯度-震央緯度×-1)×111)²`
3. 震源距離=`深度²`+`震央距離²`
4. 震波已走距離=(`目前時間`-`地震發生時間`) × 3.5
5. 剩餘秒數 (若為負表示 已抵達)=`震源距離`-`震波已走距離` ÷ 3.5
6. PGA 算法是由 吳彥立 老師 指導
7. PGA=`1.657` × `e^1.533×M` × `r^-1.607`

## 效果
![image](https://user-images.githubusercontent.com/44525760/165128127-1e6bf66f-9ad9-447a-ac93-491c0f7a65d5.png)

## 貢獻者
- 地牛Wake Up! `音頻` `地理訊息`
- whes1015 `程式開發` `附加資料庫` `文檔`
- 吳彥立 `指導`

## 項目
- 

------

## 發佈規則
- 如果新版本中有錯誤，且尚未列出，請將錯誤資訊提交到 ```issue```
- 如果您使用任何形式的辱罵性或貶義性語言給其他用戶，您將永遠被封禁！
- 不要發送重複無意義內容至 ```issue```，否則您將永遠被封禁！
- 若有任何問題或建議，歡迎提出

## 合作
- 若有任何可以改進的地方，歡迎使用 ```Pull requests``` 來提交
