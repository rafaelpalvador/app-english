// Junta os ficheiros de src/ num único index.html (o app inteiro num só ficheiro).
// Uso: node build.js
const fs=require('fs'),path=require('path');
const dir=__dirname;
const parts=['data','data-extra','langs','app','app2','import','ai','boot'];
const js=parts.map(n=>fs.readFileSync(path.join(dir,'src',n+'.js'),'utf8')).join('\n');
// letra Lora (licença SIL OFL) embutida, para funcionar sem internet
const font=(f,style)=>`@font-face{font-family:'Lora';font-style:${style};font-weight:400 700;font-display:swap;src:url(data:font/woff;base64,${fs.readFileSync(path.join(dir,'src','fonts',f)).toString('base64')}) format('woff')}`;
const fonts=font('Lora-Variable.woff','normal')+'\n'+font('Lora-Italic-Variable.woff','italic');
const shell=fs.readFileSync(path.join(dir,'src','shell.html'),'utf8').split('/*__FONTS__*/').join(fonts);
fs.writeFileSync(path.join(dir,'index.html'),shell.split('/*__SCRIPT__*/').join(js));
console.log('index.html criado ('+Math.round(fs.statSync(path.join(dir,'index.html')).size/1024)+' KB)');
