import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
const source=fs.readFileSync(new URL('../src/modules/capture/useRecorder.ts',import.meta.url),'utf8').replace(/import .* from 'react';/, 'const {useCallback,useEffect,useRef,useState}=globalThis.__hooks;');
async function setup(getUserMedia){
 const cleanups=[];const states=[];
 globalThis.__hooks={useCallback:f=>f,useRef:v=>({current:v}),useState:v=>[v,n=>states.push(n)],useEffect:f=>{const c=f();if(c)cleanups.push(c);}};
 Object.defineProperty(globalThis,'navigator',{value:{mediaDevices:{getUserMedia}},configurable:true});
 class Recorder {static isTypeSupported(){return true} constructor(){this.state='inactive';this.mimeType='audio/webm'}start(){this.state='recording'} stop(){this.state='inactive';this.onstop?.()}}
 globalThis.MediaRecorder=Recorder;
 const code=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
 const {useRecorder}=await import('data:text/javascript;base64,'+Buffer.from(code+'\n//'+Math.random()).toString('base64'));
 return {hook:useRecorder(),cleanups,states};
}
test('cancel before microphone permission resolves stops late stream',async()=>{let resolve;let stopped=0;const h=await setup(()=>new Promise(r=>resolve=r));const pending=h.hook.start();h.hook.cancel();resolve({getTracks:()=>[{stop:()=>stopped++}]});await pending;assert.equal(stopped,1);assert.equal(h.states.includes('recording'),false);});
test('double start requests microphone only once',async()=>{let resolve;let calls=0;const h=await setup(()=>{calls++;return new Promise(r=>resolve=r)});const pending=h.hook.start();await h.hook.start();assert.equal(calls,1);resolve({getTracks:()=>[{stop(){}}]});await pending;h.hook.cancel();});
test('unmount releases active microphone',async()=>{let stopped=0;const h=await setup(async()=>({getTracks:()=>[{stop:()=>stopped++}]}));await h.hook.start();h.cleanups.forEach(f=>f());assert.equal(stopped,1);});
test('permission rejection leaves retry possible',async()=>{let calls=0;const h=await setup(async()=>{calls++;if(calls===1)throw Error('denied');return {getTracks:()=>[{stop(){}}]}});await h.hook.start();await h.hook.start();assert.equal(calls,2);assert.equal(h.states.at(-1),'recording');h.hook.cancel();});
