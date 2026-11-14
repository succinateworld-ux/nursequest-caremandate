export const stations=[{x:47,y:43,name:'Assess Maya'},{x:70,y:27,name:'Call the team'},{x:42,y:60,name:'Prepare handover'}];
export function movePlayer(p,key){const d={w:[0,-4],arrowup:[0,-4],s:[0,4],arrowdown:[0,4],a:[-4,0],arrowleft:[-4,0],d:[4,0],arrowright:[4,0]}[key];return d?{x:Math.max(12,Math.min(80,p.x+d[0])),y:Math.max(23,Math.min(70,p.y+d[1]))}:p}
export function canInteract(p,stage){const s=stations[stage];return !!s&&Math.hypot(p.x-s.x,p.y-s.y)<=14}
export function scoreRun(firstAttempts){return firstAttempts.reduce((n,ok)=>n+(ok?150:75),0)}
