import { useEffect, useState } from 'react'
import type { Place, StudyCondition } from '../types'
import { IconAlert, IconArrowLeft, IconCheck, IconClock, IconRefresh, IconSparkle, IconTrash, IconX } from '../components/Icons'
import { Badge, ProgressPanel } from '../components/UI'
import { DecisionBar } from '../components/DecisionBar'
import { ConfidenceMeter } from '../components/ConfidenceMeter'
import { InformationDiff } from '../components/InformationDiff'
import { EvidencePreview } from '../components/EvidencePreview'

export function FreshnessFlow({
 place,
 condition,
 onClose,
 onUpdate,
 onReplace,
 onRemove
}:{
 place:Place;
 condition:StudyCondition;
 onClose:()=>void;
 onUpdate:(p:Place)=>void;
 onReplace:(old:Place)=>void;
 onRemove:(old:Place)=>void
}) {

 const [stage,setStage]=useState<'detail'|'checking'|'result'|'evidence'|'decision'>('detail')
 const [progress,setProgress]=useState(0)

 const isOutdated=place.status==='outdated'
 const isReview=place.id==='restaurant-a'||place.status==='review'
 const resultStatus=isOutdated?'outdated':isReview?'review':'current'

 useEffect(()=>{
   setStage('detail')
   setProgress(0)
 },[place.id])

 useEffect(()=>{
   if(stage!=='checking') return

   setProgress(12)

   const timers=[
    setTimeout(()=>setProgress(42),350),
    setTimeout(()=>setProgress(74),750),
    setTimeout(()=>setProgress(100),1150),
    setTimeout(()=>setStage('result'),1450)
   ]

   return ()=>timers.forEach(clearTimeout)
 },[stage])

 function back(){
   if(stage==='detail') onClose()
   else if(stage==='decision') setStage('evidence')
   else if(stage==='evidence') setStage('result')
   else setStage('detail')
 }

 return <div className="flow-screen">

 <div className="flow-nav">
  <button onClick={back}><IconArrowLeft/></button>
  <span>Freshness check</span>
  <button onClick={onClose}><IconX/></button>
 </div>

 {stage==='detail' &&
 <div className="flow-content">
  <div className="flow-title">
   <div className="brand">PINWISE</div>
   <h1>{place.name}</h1>
   <p>Review practical information extracted from your saved source.</p>
  </div>

  <section className="info-card">
   <div className="info-card-head">
    <strong>From saved post</strong>
    <Badge status={place.status}/>
   </div>
   <p>{place.savedInfo}</p>
   <div className="meta-line">
    <IconClock/>
    Post age: {place.postAge}
   </div>
  </section>

  <ConfidenceMeter confidence={place.confidence}/>

  <button className="primary-button" onClick={()=>setStage('checking')}>
   Check current information
  </button>

  <button className="secondary-button" onClick={()=>setStage('evidence')}>
   View supporting evidence
  </button>
 </div>}


 {stage==='checking' &&
 <div className="flow-content">
  <div className="flow-title">
   <h1>Checking freshness</h1>
   <p>AI compares saved information with recent evidence.</p>
  </div>

  <ProgressPanel
   title="Looking for recent evidence"
   subtitle="Official listings · recent reviews · current opening hours"
   progress={progress}
  />
 </div>}


 {stage==='result' &&
 <div className="flow-content">
  <div className="flow-title">
   <h1>{resultStatus==='outdated'?'Outdated':resultStatus==='review'?'Needs review':'Looks current'}</h1>
  </div>

  <div className="result-diff-section">
  <InformationDiff
   previous={place.savedInfo}
   latest={place.recentInfo}
   source={place.evidence?.[0]?.source || 'Recent source'}
   checked={place.lastChecked}
  />
  </div>

  <ConfidenceMeter confidence={place.confidence}/>

  <section className="info-card soft">
   <strong>Why AI reached this result</strong>
   <p>
    {resultStatus==='current'
    ? 'Recent sources agree with saved information.'
    : 'Recent evidence conflicts with saved information.'}
   </p>
   <Badge status="ai">AI rationale</Badge>
  </section>

  <button className="primary-button" onClick={()=>setStage('evidence')}>
   View supporting evidence
  </button>
 </div>}


 {stage==='evidence' &&
 <div className="flow-content">
  <div className="flow-title">
   <h1>Supporting evidence</h1>
   <p>Review evidence before making your final decision.</p>
  </div>

  <div className="evidence-stack">

  {(place.evidence?.length
   ? place.evidence
   : [{
      id:'saved',
      source:'Saved post',
      age:place.postAge,
      text:place.savedInfo,
      tone:'old' as const
     },{
      id:'recent',
      source:'Recent source',
      age:'recent',
      text:place.recentInfo,
      tone:'current' as const
     }]
  ).map(e=>
   <details key={e.id} className="evidence-card" open>
    <summary>
     <strong>{e.source}</strong>
     <Badge status={e.tone==='old'?'unverified':'current'}>
      {e.age}
     </Badge>
    </summary>
    <p>{e.text}</p>
   </details>
  )}

  <EvidencePreview
   image={place.evidenceImage}
   source="Recent evidence"
   title={place.recentInfo}
  />


  <button className="primary-button" onClick={()=>setStage('decision')}>
   Decide what to do
  </button>

  </div>
 </div>}


 {stage==='decision' &&
 <div className="flow-content">
  <div className="flow-title">
   <h1>Make the final choice</h1>
   <p>AI informs the decision but you stay in control.</p>
  </div>

  <div className="decision-panel">
  <DecisionBar
   decision={place.decision}
   onChange={(decision)=>
    onUpdate({...place,decision})
   }
  />
  </div>

  {place.alternativeId &&
   <button className="decision-card" onClick={()=>onReplace(place)}>
    <IconRefresh/>
    Replace with alternative
   </button>
  }

  <button className="decision-card" onClick={()=>onRemove(place)}>
   <IconTrash/>
   Remove from trip
  </button>

  <div className="agency-note">
   <IconSparkle/>
   <span>Your final choice is preserved when AI optimizes around your choices.</span>
  </div>
 </div>
 }

 </div>
}
