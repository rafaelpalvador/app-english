// Junta os ficheiros de src/ num único index.html (o app inteiro num só ficheiro).
// Uso: node build.js
const fs=require('fs'),path=require('path');
const dir=__dirname;
const parts=['data','data-extra','langs','app','app2','import','boot'];
const js=parts.map(n=>fs.readFileSync(path.join(dir,'src',n+'.js'),'utf8')).join('\n');
const shell=fs.readFileSync(path.join(dir,'src','shell.html'),'utf8');
fs.writeFileSync(path.join(dir,'index.html'),shell.split('/*__SCRIPT__*/').join(js));
console.log('index.html criado ('+Math.round(fs.statSync(path.join(dir,'index.html')).size/1024)+' KB)');
