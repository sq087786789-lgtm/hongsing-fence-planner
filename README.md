# 上慶圍籬配置工作室

可拖拉圍籬、設定規格與雙開大門、計算配件並輸出參照線稿的完整靜態工具。原始碼公開，其他 AI 可直接讀取並重建相同功能。

## 直接使用

主程式是 dist/index.html，可直接用 Edge 或 Chrome 開啟。使用網頁版時，客戶設計只儲存在目前瀏覽器，不會上傳到 GitHub。

## 給其他 AI 的入口

先讀 [AI_README.md](AI_README.md)，再讀 [SPECIFICATION.md](SPECIFICATION.md)、[完整原始碼](dist/index.html) 與 [測試](check.cjs)。可直接複製 [重建要求](AI_REBUILD_PROMPT.md) 給其他 AI。

要得到完全相同的現有工具，可保留 dist/index.html 的原始內容，無需從畫面重新猜測。若改寫架構，請遵循規格並通過測試。

## 本機開發

使用 Node.js 22 或更新版本，沒有第三方套件：

```sh
node check.cjs
node scripts/build-public.cjs
node serve.cjs
```

瀏覽 http://127.0.0.1:8765。也可用 npm test、npm run build、npm start，不需要 npm install。

## GitHub Pages 部署

node scripts/build-public.cjs 會建立 docs/ 發布目錄及 AI 讀取入口。GitHub 倉庫 Settings → Pages 選擇 Deploy from a branch，分支 main、資料夾 /docs，儲存後等待 GitHub 完成發布。

發布後分享工具網址或網址後面的 ai/。AI 可直接讀取 ai/AI_README.md、ai/source/index.html.txt、ai/source/check.cjs.txt 和 ai/manifest.json。根目錄也有 llms.txt 作為文字索引。

更新 dist/index.html 或文件後，執行測試與 build，再提交更新後的 docs/；不要直接把 docs 當成唯一來源。

## 放入其他網站

將 dist/ 內所有檔案放入網站子目錄（例如 /tools/fence-planner/）；維持 ai/ 子目錄結構。無需資料庫或 API。GitHub Pages 與官網間的 localStorage 不共用；資料搬移需用 JSON 匯出／匯入。

## 操作重點

- 預設「移動畫面」只平移整張圖；「編輯立柱」才修改端點，「旋轉視角」控制立體觀看方向。
- 可選段落直接輸入方向或轉彎角度。預設只旋轉本段，其他段不動，必要時分開接點；可選連動後續。
- 圍籬規格共用，段長與位置獨立，大門規格獨立。
- 0～4根橫桿、環帽或管夾、PVC／烤漆／鍍鋅／高鍍鋅等網材、12／15／自訂底板或埋入固定。
- 配件估算有手動增減；5mm內端點視為同一接點。四轉角兩根橫桿自動8組。
- 每項輸出可取消，線稿可直接恢復橫桿尺寸標記。
- PNG、CSV、JSON、SVG線稿；線稿預設局部兩跨，自動適配、非固定比例。

實際功能與邊界以程式、SPECIFICATION.md 與測試為準。

## 資料界線

倉庫只發布程式、規格和測試案例。請勿提交實際客戶的設計檔、密碼、帳號憑證或私密訂單。GitHub Pages 是靜態網站，不提供跨裝置自動同步。
