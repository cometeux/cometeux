import {build} from 'esbuild';
import {mkdir,writeFile,readFile} from 'node:fs/promises';
await mkdir('dist',{recursive:true});
const result=await build({entryPoints:['src/main.jsx'],bundle:true,write:false,minify:true,format:'iife',define:{'process.env.NODE_ENV':'"production"'},legalComments:'eof',target:'es2022',loader:{'.jpg':'dataurl','.woff2':'dataurl'},alias:{react:process.cwd()+'/node_modules/react'}});
const js=result.outputFiles[0].text.replaceAll('</script','<\\/script');
let css=await readFile('src/style.css','utf8');
for(const font of ['sora','inter']){const bytes=await readFile('assets/'+font+'.woff2');css=css.replace("../assets/"+font+".woff2",'data:font/woff2;base64,'+bytes.toString('base64'));}
await writeFile('dist/index.html',`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="referrer" content="no-referrer"><title>Intent Lab — Deema Alrafi</title><style>${css}</style></head><body><div id="root"></div><script>${js}</script></body></html>`);
console.log('Built standalone dist/index.html');
