import { useEffect } from 'react'
import { Clock3, Target, Zap } from 'lucide-react'
function NurseSprite({ player = false }: { player?: boolean }) { return <div className={`sprite ${player ? 'player' : 'patient'}`}><span className="sprite-shadow"/><span className="sprite-body"/><span className="sprite-head"/><span className="sprite-hair"/><span className="sprite-cap">+</span>{player && <span className="sprite-steth">⌁</span>}<span className="sprite-ring"/></div> }
export function IsometricRoom({ moved, onMove, onInteract, done, position, paused }: { moved: number; onMove: (direction: string) => void; onInteract: () => void; done: boolean; position?: {x:number;y:number}; paused?: boolean }) {
  useEffect(() => {
    if(paused)return
    const handler = (event: KeyboardEvent) => {
      if((event.target as HTMLElement)?.closest('input,textarea,select'))return
      const key = event.key.toLowerCase()
      if (['w','a','s','d','arrowup','arrowleft','arrowdown','arrowright'].includes(key)) { event.preventDefault(); onMove(key) }
      if (key === 'e' || (key === ' ' && !(event.target as HTMLElement)?.closest('button'))) { event.preventDefault(); onInteract() }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onMove, onInteract, paused])
  const x = position?.x ?? Math.max(8, Math.min(72, 24 + moved * 4))
  const y = position?.y ?? Math.max(13, Math.min(62, 46 - moved * 1.2))
  return <div className="game-scene">
    <div className="scene-topline"><span className="live-chip"><i/> LIVE SIMULATION</span><span>EMERGENCY WARD · BAY 04</span><span className="scene-clock"><Clock3 size={13}/> {position?'UNTIMED':`00:${String(Math.max(0,46-moved)).padStart(2,'0')}`}</span></div>
    <div className="room-grid"><div className="floor"/>
      <div className="wall wall-left"><span className="wall-sign">EMERGENCY<br/>CARE</span><span className="wall-panel"/></div><div className="wall wall-back"><span className="window-glow"/><span className="monitor-wall"><i/><i/><i/></span></div>
      <div className="equipment cart"><span className="cart-screen"><i/></span><span className="cart-shelf"/><span className="cart-wheel one"/><span className="cart-wheel two"/></div>
      <div className="equipment oxygen"><span className="oxygen-tank"/><span className="oxygen-base"/></div>
      <div className="bed"><span className="bed-frame"/><span className="bed-mattress"/><span className="pillow"/><span className="blanket"/><span className="patient-head"/><span className="bed-rail"/><span className="bed-leg a"/><span className="bed-leg b"/></div>
      <div className="patient-tag"><span className="tag-dot red"/>MAYA O. <small>NEEDS ASSESSMENT</small></div><NurseSprite/>
      <div className="player-position" style={{left:`${x}%`,top:`${y}%`}}><NurseSprite player/><span className="player-name">YOU · RN</span></div>
      <div className="interaction-ping" style={{left:`${Math.min(77,x+8)}%`,top:`${Math.max(23,y-16)}%`}}>E</div>
      <div className="scene-objective"><Target size={15}/><span><small>CURRENT OBJECTIVE</small><b>{done ? 'OBJECTIVE COMPLETE' : 'Reach Maya and assess'}</b></span><span className="objective-count">{done ? '1/1' : '0/1'}</span></div>
      <div className="map-widget"><span/><span/><span/><span/><i/></div>
    </div>
    <div className="game-controls"><div className="dpad" aria-label="Movement controls"><button onClick={() => onMove('w')} aria-label="Move up">▲</button><div><button onClick={() => onMove('a')} aria-label="Move left">◀</button><button onClick={() => onMove('s')} aria-label="Move down">▼</button><button onClick={() => onMove('d')} aria-label="Move right">▶</button></div></div><div className="controls-hint"><span><kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd> MOVE</span><span><kbd>E</kbd> INTERACT</span></div><button className="interact-button" onClick={onInteract}><Zap size={19} fill="currentColor"/> {done ? 'OBJECTIVE COMPLETE' : 'INTERACT'} <span>E ↗</span></button></div>
  </div>
}
