# 給其他 AI 的專案入口

這是上慶企業社的圍籬配置工具。要重現相同工具，請讀取完整程式與測試，不要只模仿截圖。

讀取順序：

1. `README.md`：啟動與部署。
2. `SPECIFICATION.md`：已確認的功能、單位及配件規則。
3. `dist/index.html`：可獨立執行的完整 HTML、CSS、JavaScript 原始碼，是實際行為的依據。
4. `check.cjs`：幾何、配件、輸出及操作的回歸測試。
5. `AI_REBUILD_PROMPT.md`：可直接交給另一個 AI 的重建要求。

最可靠的重建方式是保留 `dist/index.html` 的原始位元組，先執行測試，再視需要拆分模組。這個版本使用 Canvas 2D 與自行實作的立體投影，不需要 Three.js、API 金鑰或後端。

完整程式的純文字版本也會發布於網站的 `ai/source/index.html.txt`。網站入口是 `ai/`，檔案與 SHA-256 清單是 `ai/manifest.json`。

客戶名稱、實際訂單及匯出的設計檔不在這個公開專案內。範例只是測試資料。資料儲存在瀏覽器 localStorage；換網域、瀏覽器或裝置時需自行匯出／匯入 JSON。

尚未承諾的功能：DWG、固定比例施工圖、配件製造尺寸、伺服器同步及實際施工安全驗算。
