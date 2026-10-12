const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..'),dist=path.join(root,'dist'),ai=path.join(dist,'ai');
fs.mkdirSync(path.join(ai,'source'),{recursive:true});
const sources=[['AI_README.md','AI_README.md'],['SPECIFICATION.md','SPECIFICATION.md'],['AI_REBUILD_PROMPT.md','AI_REBUILD_PROMPT.md'],['dist/index.html','source/index.html.txt'],['check.cjs','source/check.cjs.txt'],['serve.cjs','source/serve.cjs.txt']];
const entries=sources.map(([source,target])=>{const bytes=fs.readFileSync(path.join(root,source));fs.writeFileSync(path.join(ai,target),bytes);return{source,url:target,bytes:bytes.length,sha256:crypto.createHash('sha256').update(bytes).digest('hex')};});
fs.writeFileSync(path.join(ai,'manifest.json'),JSON.stringify({name:'上慶圍籬配置工作室',formatVersion:1,sourceOfTruth:'source/index.html.txt',files:entries},null,2)+'\n');
fs.writeFileSync(path.join(ai,'index.html'),`<!doctype html><html lang="zh-Hant"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>上慶圍籬工具｜原始碼與 AI 重建</title><style>body{font:17px/1.8 system-ui,sans-serif;max-width:850px;margin:40px auto;padding:20px;color:#213b36}a{color:#127565}</style><h1>上慶圍籬工具：原始碼與 AI 重建</h1><p>可直接讀取以下文件與完整原始碼。主程式可獨立執行，不需要後端或 API 金鑰。</p><ul>${entries.map(e=>`<li><a href="${e.url}">${e.source}</a></li>`).join('')}<li><a href="manifest.json">檔案與 SHA-256 清單</a></li></ul><p><a href="../">開啟圍籬工具</a></p><p>只提供工具程式與規格；不含客戶訂單。若要重建相同功能，請讀取完整 HTML 與測試，不要僅依畫面猜測。</p></html>`);
fs.writeFileSync(path.join(dist,'llms.txt'),'# Hongsing Fence Planner\n\nStatic interactive fence planning tool. Read the complete source and tests to reproduce it.\n\n- [AI entry](ai/AI_README.md)\n- [Specification](ai/SPECIFICATION.md)\n- [Rebuild prompt](ai/AI_REBUILD_PROMPT.md)\n- [Complete application source](ai/source/index.html.txt)\n- [Tests](ai/source/check.cjs.txt)\n- [SHA-256 manifest](ai/manifest.json)\n');
fs.writeFileSync(path.join(dist,'.nojekyll'),'');
// GitHub Pages 從 main /docs 發布；來源保留 dist/index.html。
fs.mkdirSync(path.join(root,'docs'),{recursive:true});fs.cpSync(dist,path.join(root,'docs'),{recursive:true});
console.log('Prepared dist/ai and GitHub Pages docs/ with exact source copies.');
