# 圍籬專案：修改後同步 GitHub

本專案的持續開發資料夾是 `E:\GPT\hongsing-fence-planner`。

- GitHub：`https://github.com/sq087786789-lgtm/hongsing-fence-planner`
- 正式工具：`https://sq087786789-lgtm.github.io/hongsing-fence-planner/`
- AI 入口：正式工具網址後的 `ai/`
- 來源：`dist/index.html`；GitHub Pages 發布來源：`main` 分支的 `docs/`。

使用者已要求：在這個專案修改工具後，同步上傳到他的 GitHub。除非使用者明確要求只改本機、先不要上傳或僅供討論，完成修改後應執行測試、更新發布目錄、提交並同步 GitHub，並確認 Pages 部署結果。不要把本機完成誤報成已上線。

## 每次修改流程

1. 先確認 origin 是上述 GitHub 倉庫、目前分支及工作目錄狀態；保留使用者既有變更。不要改舊的 Codex 臨時資料夾或 Sites 來源副本。
2. 修改主程式；功能規則變更時更新 SPECIFICATION.md、AI_README.md 或重建要求，保留已確認的圍籬、配件、單位、輸出與操作規則。
3. 執行 `node check.cjs`，再執行 `node scripts/build-public.cjs`。這會同步 docs/ 與 dist/ai，包括完整原始碼及 SHA-256 清單。
4. 有 UI 行為變更時做適當瀏覽器驗證；本次已通過且來源未變，不必反覆測同一組案例。
5. 檢查要上傳的 diff，再提交並推送。可用 `npm run sync -- "修改摘要"`；同步腳本不使用 force push，遇到遠端更新需先正常合併／處理衝突。
6. 確認 GitHub 實際收到預期提交；查看 Pages 部署結果並在必要時驗證正式網址。回覆修改内容、測試與部署狀態。

## 上傳界線

- 公開程式、文件、測試、AI 讀取入口及發布檔案；不公開實際客戶設計 JSON、訂單、帳密、token、localStorage 備份或診斷記錄。
- work/、outputs/、customer-designs/ 與 .env 不上傳。
- 預設不自動上傳其他資料夾中的檔案。若使用者在其他 AI 或外部編輯器修改，接續時先讀取 GitHub 狀態，再按相同流程同步。

## 目前可用的發布方式

GitHub 連接器在新倉庫的寫入操作曾回傳 403；本機 git 的 Credential Manager 尚未配置可用寫入登入。不要假設兩者已修好，也不要重複卡在互動登入。

可先正常嘗試已授權的 git／連接器寫入；若仍不能寫，使用已登入 GitHub 的瀏覽器編輯器。檔案上傳曾受 Chrome 擴充功能的 file URL 權限限制，網頁文字編輯器已成功發布完整專案。不得擅自增加 GitHub App、token 或瀏覽器權限。

需要登入、驗證或新增權限才能繼續時，保留已完成的程式、測試及發布檔，說明實際阻礙；勿聲稱同步成功。這個流程適用於收到修改要求的工作回合，不是背景監控所有本機檔案。
