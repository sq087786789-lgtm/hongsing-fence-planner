const fs=require('node:fs'),path=require('node:path'),cp=require('node:child_process');
const root=path.resolve(__dirname,'..');
function run(bin,args,capture=false){const r=cp.spawnSync(bin,args,{cwd:root,encoding:'utf8',stdio:capture?'pipe':'inherit'});if(r.error)throw r.error;if(r.status!==0)throw Error(bin+' '+args.join(' ')+' 未成功');return r.stdout?.trim()||'';}
function allowed(file){const roots=new Set(['AGENTS.md','README.md','AI_README.md','AI_REBUILD_PROMPT.md','SPECIFICATION.md','.gitignore','.gitattributes','package.json','package-lock.json','check.cjs','serve.cjs']);return roots.has(file)||/^(dist|docs|scripts)\//.test(file);}
try{
  const remote=run('git',['remote','get-url','origin'],true);
  if(!/^https:\/\/github\.com\/sq087786789-lgtm\/hongsing-fence-planner(?:\.git)?\/?$/.test(remote))throw Error('origin 不是指定的圍籬 GitHub 倉庫');
  if(run('git',['branch','--show-current'],true)!=='main')throw Error('請先在 main 分支準備發布，或由接手者確認分支流程');
  run(process.execPath,['check.cjs']);run(process.execPath,['scripts/build-public.cjs']);
  const tracked=run('git',['ls-files','--modified','--deleted'],true).split('\n').filter(Boolean);
  const untracked=run('git',['ls-files','--others','--exclude-standard'],true).split('\n').filter(Boolean);
  const staged=run('git',['diff','--cached','--name-only'],true).split('\n').filter(Boolean);
  const files=[...new Set([...tracked,...untracked,...staged])];
  const unexpected=files.filter(f=>!allowed(f));if(unexpected.length)throw Error('有發布範圍外的變更，請先檢查：'+unexpected.join(', '));
  for(const file of files){if(!fs.existsSync(path.join(root,file)))continue;const text=fs.readFileSync(path.join(root,file),'utf8');if(/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----|ghp_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{30,}/.test(text))throw Error('疑似憑證，停止上傳：'+file);if(/\.json$/i.test(file)&&/"format"\s*:\s*"sq-fence-design"/.test(text))throw Error('設計資料 JSON 不應自動公開：'+file);}
  if(process.argv.includes('--prepare-only')){console.log('測試與發布檔已完成；未建立提交或推送。待檢查檔案：'+files.join(', '));process.exit(0);}
  if(staged.some(f=>!allowed(f)))throw Error('暫存區包含發布範圍外檔案，停止提交');
  if(files.length)run('git',['add','--',...files]);
  if(run('git',['diff','--cached','--name-only'],true))run('git',['commit','-m',process.argv.slice(2).join(' ').trim()||'Update fence planner and AI reconstruction files']);
  // 禁止互動憑證提示；缺少登入時明確失敗，讓接手者走網頁發布流程。
  run('git',['-c','credential.interactive=false','push','origin','main']);
  console.log('GitHub 推送完成。請再確認 Pages 部署及正式網址；此訊息不代表 Pages 已完成部署。');
}catch(e){console.error('同步未完成：'+e.message);process.exit(1);}
