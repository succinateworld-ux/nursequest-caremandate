import {test} from 'node:test';import assert from 'node:assert/strict';
import {movePlayer,canInteract,scoreRun} from '../../src/expedition-engine.mjs';
test('four directions and bounds',()=>{const p={x:20,y:30};assert.deepEqual(movePlayer(p,'w'),{x:20,y:26});assert.deepEqual(movePlayer(p,'s'),{x:20,y:34});assert.deepEqual(movePlayer(p,'a'),{x:16,y:30});assert.deepEqual(movePlayer(p,'d'),{x:24,y:30});assert.deepEqual(movePlayer({x:12,y:23},'a'),{x:12,y:23});});
test('interaction requires proximity and a valid stage',()=>{assert.equal(canInteract({x:20,y:60},0),false);assert.equal(canInteract({x:47,y:43},0),true);assert.equal(canInteract({x:47,y:43},3),false)});
test('score is bounded to decisions rather than clicks or speed',()=>{assert.equal(scoreRun([true,true,true]),450);assert.equal(scoreRun([false,false,false]),225)});
