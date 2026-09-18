import { useEffect,useState } from 'react'
import type { Place, StudyCondition } from '../types'
import { IconArrowLeft,IconX } from '../components/Icons'
import { Badge,ProgressPanel } from '../components/UI'
import { DecisionBar } from '../components/DecisionBar'
import { ConfidenceMeter } from '../components/ConfidenceMeter'
import { InformationDiff } from '../components/InformationDiff'

export function FreshnessFlow({place,onClose,onUpdate,onReplace,onRemove}:{
place:Place;condition:StudyCondition;onClose:()=>void;onUpdate:(p:Place)=>void;onReplace:(old:Place)=>void;onRemove:(old:Place)=>void
}) {
 const [stage,setStage]=useState<'detail'|'checking'|'result'|'decision'>('detail')
 const [progress,setProgress]=useState(0)

 useEffect(()=>{setStage('detail');setProgress(0)},[place.id])

 return <div className="flow-screen">
  <div className="flow-nav">
   <button onClick={onClose}><IconArrowLeft/></button>
   <span>Freshness check</span>
   <button onClick={onClose}><IconX/></button>
  </div>

  {stage==='detail' && <>
   <div className="flow-title"><h1>{place.name}</h1><p>Review AI freshness analysis.</p></div>
   <section className="info-card">
    <strong>From saved post</strong><Badge status={place.status}/>
    <p>{place.savedInfo}</p>
   </section>
   <button className="primary-button" onClick={()=>{setStage('checking');setProgress(100)}}>Check current information</button>
  </>}

  {stage==='checking' && <ProgressPanel title="Looking for recent evidence" subtitle="AI compares saved and recent information." progress={progress}/>}

  {stage==='result' && <>
   <InformationDiff previous={place.savedInfo} latest={place.recentInfo} source={place.evidence?.[0]?.source} checked={place.lastChecked}/>
   <ConfidenceMeter confidence={place.confidence}/>
   <button className="primary-button" onClick={()=>setStage('decision')}>Decide what to do</button>
  </>}

  {stage==='decision' && <>
   <DecisionBar decision={place.decision} onChange={(decision)=>onUpdate({...place,decision})}/>
   <button className="secondary-button" onClick={()=>onRemove(place)}>Remove</button>
   {place.alternativeId && <button className="secondary-button" onClick={()=>onReplace(place)}>Replace</button>}
  </>}
 </div>
}
