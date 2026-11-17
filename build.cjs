const fs=require('node:fs'),path=require('node:path');
const root=__dirname,read=name=>fs.readFileSync(path.join(root,name),'utf8').replace(/\r\n?/g,'\n'),model=read('model.js'),app=read('app.js');
let html=read('index.template.html').replace('/*MODEL*/',()=>model+'\nCopolymer.__source='+JSON.stringify(model)+';').replace('/*APP*/',()=>app);
const analytics=read('analytics.js'),extensions=read('extensions.js');
html=html.replace('</body>',()=>'<script>'+analytics+'\nAnalytics.__source='+JSON.stringify(analytics)+';</script><script>'+extensions+'</script></body>').replace('v1.0 ·','v2.0 ·');
const tokens=read('fjc-tokens.css'),themeCSS=read('fjc-theme.css'),themeJS=read('fjc-theme.js');
html=html.replace('<html lang="zh-CN">','<html lang="zh-CN" data-theme="light">').replace('<body>','<body class="viz-root">').replace('</head>',()=>'<style>'+tokens+'\n'+themeCSS+'</style></head>').replace('</body>',()=>'<script>'+themeJS+'</script></body>');
fs.writeFileSync(path.join(root,'index.html'),html);console.log('Built offline index.html: '+Buffer.byteLength(html)+' bytes');
