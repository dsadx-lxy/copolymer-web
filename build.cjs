const fs=require('node:fs'),path=require('node:path');
const root=__dirname,model=fs.readFileSync(path.join(root,'model.js'),'utf8'),app=fs.readFileSync(path.join(root,'app.js'),'utf8');
let html=fs.readFileSync(path.join(root,'index.template.html'),'utf8').replace('/*MODEL*/',()=>model+'\nCopolymer.__source='+JSON.stringify(model)+';').replace('/*APP*/',()=>app);
const analytics=fs.readFileSync(path.join(root,'analytics.js'),'utf8'),extensions=fs.readFileSync(path.join(root,'extensions.js'),'utf8');
html=html.replace('</body>',()=>'<script>'+analytics+'\nAnalytics.__source='+JSON.stringify(analytics)+';</script><script>'+extensions+'</script></body>').replace('v1.0 ·','v2.0 ·');
const tokens=fs.readFileSync(path.join(root,'fjc-tokens.css'),'utf8'),themeCSS=fs.readFileSync(path.join(root,'fjc-theme.css'),'utf8'),themeJS=fs.readFileSync(path.join(root,'fjc-theme.js'),'utf8');
html=html.replace('<html lang="zh-CN">','<html lang="zh-CN" data-theme="light">').replace('<body>','<body class="viz-root">').replace('</head>',()=>'<style>'+tokens+'\n'+themeCSS+'</style></head>').replace('</body>',()=>'<script>'+themeJS+'</script></body>');
fs.writeFileSync(path.join(root,'index.html'),html);console.log('Built offline index.html: '+Buffer.byteLength(html)+' bytes');
