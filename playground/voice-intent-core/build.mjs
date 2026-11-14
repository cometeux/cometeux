import {build} from 'esbuild';
await build({entryPoints:['src/modules/interpretation/heuristics.ts'],bundle:true,platform:'node',format:'esm',outfile:'review-tests/heuristics.mjs'});
