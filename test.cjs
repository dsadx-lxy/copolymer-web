const assert=require('node:assert/strict'),M=require('./model.js');
const p={r1:5,r2:.2,f:.5,n:10000,target:.9,seed:123,reps:1};
let a=M.run(p),b=M.run(p);assert.deepEqual(a,b);assert.equal(a.a+a.b+a.count,p.n);assert.equal(a.incA+a.a,a.a0);assert.ok(a.a>=0&&a.b>=0);assert.equal(a.count,9000);
let chunk=M.create(p);while(M.step(chunk,7)==='running'){}assert.deepEqual(M.finish(chunk),a);
let z=M.run({...p,r1:0,r2:0,f:1});assert.equal(z.status,'blocked');assert.equal(z.count,1);
let pure=M.run({...p,f:0});assert.ok(pure.sequence.every(x=>x===1));assert.equal(pure.points[0].xa,null);
let alternating=M.run({...p,r1:0,r2:0});for(let i=1;i<alternating.count;i++)assert.notEqual(alternating.sequence[i],alternating.sequence[i-1]);
for(let r1 of [0,.1,1,5])for(let r2 of [.1,1,5])for(let f of [.2,.5,.8]){let values=[];for(let seed=1;seed<=4;seed++){let random=M.rng(seed),end=0,total=0,n=80000;for(let i=0;i<n+2000;i++){end=random()<M.probability(end,f,1-f,r1,r2)?0:1;if(i>=2000&&end===0)total++;}values.push(total/n);}let avg=values.reduce((x,y)=>x+y)/values.length;assert.ok(Math.abs(avg-M.theory(f,r1,r2))<.015,`theory mismatch ${r1},${r2},${f}`);}
assert.throws(()=>M.validate({...p,n:1}));assert.throws(()=>M.validate({...p,r1:NaN}));console.log('PASS: reproducibility, chunk/pause equivalence, conservation, boundaries, alternation, 144 fixed-feed theoretical checks.');
