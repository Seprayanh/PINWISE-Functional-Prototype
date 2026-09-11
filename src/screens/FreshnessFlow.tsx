import { useEffect, useState } from 'react'
import type { Place, StudyCondition } from '../types'
import { IconAlert, IconArrowLeft, IconCheck, IconClock, IconRefresh, IconSparkle, IconTrash, IconX } from '../components/Icons'
import { Badge, ProgressPanel } from '../components/UI'

export function FreshnessFlow({ place,condition,onClose,onUpdate,onReplace,onRemove }:{
  place:Place;condition:StudyCondition;onClose:()=>void;onUpdate:(p:Place)=>void;onReplace:(old:Place)=>void;onRemove:(old:Place)=>void
}) {
  const [stage,setStage]=useState<'detail'|'checking'|'result'|'evidence'|'decision'>('detail')
  const [progress,setProgress]=useState(0)
  const isOutdated=place.status==='outdated'
  const isReview=place.id==='restaurant-a'||place.status==='review'
  const resultStatus = isOutdated ? 'outdated' : isReview ? 'review' : 'current'
  useEffect(()=>{setStage('detail');setProgress(0)},[place.id])
  useEffect(()=>{
    if(stage!=='checking')return
    setProgress(12)
    const timers=[setTimeout(()=>setProgress(42),350),setTimeout(()=>setProgress(74),750),setTimeout(()=>setProgress(100),1150),setTimeout(()=>setStage('result'),1450)]
    return()=>timers.forEach(clearTimeout)
  },[stage])

  function back(){if(stage==='detail')onClose();else if(stage==='decision')setStage('evidence');else if(stage==='evidence')setStage('result');else setStage('detail')}
  function header(title:string,subtitle:string){return <><div className="flow-nav"><button onClick={back}><IconArrowLeft/></button><span>Freshness check</span><button onClick={onClose}><IconX/></button></div><div className="flow-title"><div className="brand">PINWISE</div><h1>{title}</h1><p>{subtitle}</p></div></>}

  const resultTitle = resultStatus==='outdated' ? 'Outdated' : resultStatus==='review' ? 'Needs review' : 'Looks current'
  const resultCopy = resultStatus==='outdated'
    ? 'Recent evidence clearly shows the saved practical information is no longer valid.'
    : resultStatus==='review'
      ? 'AI found newer evidence that conflicts with the saved post.'
      : 'No meaningful conflict was found in recent evidence.'

  return <div className="flow-screen">
    {stage==='detail'&&<>{header(place.name,'Review practical information extracted from your saved source.')}<div className="flow-content">
      <section className="info-card"><div className="info-card-head"><strong>From saved post</strong><Badge status={condition==='aggregation'?'neutral':place.status}/></div><p>{place.savedInfo}</p><div className="meta-line"><IconClock/>Post age: {place.postAge}{place.lastChecked?` · checked ${place.lastChecked}`:''}</div></section>
      <section className="info-card soft"><strong>Your current decision</strong><p>{place.decision==='removed'?'Removed from itinerary':place.decision==='review'?'Marked for review':place.selected?'Included in itinerary':'Candidate, not yet included'}</p></section>
      {condition==='aggregation'
        ? <button className="primary-button" onClick={()=>{onUpdate({...place,selected:true,decision:'kept',status:'unverified'});onClose()}}>Keep in itinerary</button>
        : <button className="primary-button" onClick={()=>setStage('checking')}>Check current information</button>}
      <button className="secondary-button" onClick={()=>setStage('evidence')}>View supporting evidence</button>
    </div></>}

    {stage==='checking'&&<>{header('Checking freshness','AI compares the saved post with more recent information.')}<div className="flow-content">
      <ProgressPanel title="Looking for recent evidence" subtitle="Official listings · recent reviews · current opening hours" progress={progress}/>
      <section className="mini-list"><div><IconCheck/><span>Opening hours</span></div><div><IconCheck/><span>Closure status</span></div><div><IconCheck/><span>Reservation rules</span></div></section>
    </div></>}

    {stage==='result'&&<>{header(resultTitle,resultCopy)}<div className="flow-content">
      <section className={`warning-card ${resultStatus==='current'?'good':''} ${resultStatus==='outdated'?'danger':''}`}>
        <div className="warning-icon">{resultStatus==='current'?<IconCheck/>:<IconAlert/>}</div>
        <span className="eyebrow">{resultStatus==='outdated'?'OUTDATED':resultStatus==='review'?'NEEDS REVIEW':'CURRENT'}</span>
        <h2>{resultStatus==='current'?'Information still matches':resultStatus==='outdated'?'Saved details are no longer valid':'Practical details changed'}</h2>
        <p><b>Saved:</b> {place.savedInfo}</p><p><b>Recent:</b> {place.recentInfo}</p>
        <Badge status={resultStatus}>{resultTitle}</Badge>
      </section>
      <section className="info-card soft"><strong>Why AI reached this result</strong><p>{resultStatus==='current'?'Recent sources agree with the saved information.':`The source is ${place.postAge} old and recent sources report changed practical details.`}</p><Badge status="ai">AI rationale</Badge></section>
      {resultStatus==='current'
        ? <button className="primary-button" onClick={()=>{onUpdate({...place,status:'current',lastChecked:'today',decision:'kept',selected:true});onClose()}}>Confirm current & keep</button>
        : <button className="primary-button" onClick={()=>setStage('evidence')}>View supporting evidence</button>}
    </div></>}

    {stage==='evidence'&&<>{header('Supporting evidence','Expand the evidence behind the freshness result before deciding.')}<div className="flow-content evidence-stack">
      {(place.evidence?.length?place.evidence:[{id:'recent',source:'Recent source',age:'recent',text:place.recentInfo,tone:'current' as const},{id:'saved',source:'Saved post',age:place.postAge,text:place.savedInfo,tone:'old' as const}]).map(e=><details className={`evidence-card ${e.tone==='old'?'old':'current'}`} key={e.id} open>
        <summary><strong>{e.source}</strong><Badge status={e.tone==='conflict'?'review':e.tone==='old'?'unverified':'current'}>{e.age}</Badge></summary>
        <p>{e.text}</p><div className="evidence-meta">Confidence: {place.confidence}</div>
      </details>)}
      <button className="primary-button" onClick={()=>setStage('decision')}>Decide what to do</button>
    </div></>}

    {stage==='decision'&&<>{header('Make the final choice','AI informs the decision but does not automatically remove the place.')}<div className="flow-content">
      <button className="decision-card" onClick={()=>{onUpdate({...place,status:'current',lastChecked:'today',savedInfo:resultStatus==='current'?place.savedInfo:place.recentInfo,decision:'kept',selected:true});onClose()}}>
        <div className="decision-icon keep"><IconCheck/></div><div><strong>Keep {place.name}</strong><p>Keep the place and use updated practical information.</p></div>
      </button>
      {place.alternativeId&&<button className="decision-card" onClick={()=>onReplace(place)}>
        <div className="decision-icon replace"><IconRefresh/></div><div><strong>Replace {place.name}</strong><p>Use a nearby alternative. The itinerary time will update too.</p></div>
      </button>}
      <button className="decision-card" onClick={()=>onRemove(place)}>
        <div className="decision-icon remove"><IconTrash/></div><div><strong>Remove from trip</strong><p>Remove this place from the selected list and itinerary.</p></div>
      </button>
      <div className="agency-note"><IconSparkle/><span>Your final choice is preserved when AI optimizes around your choices.</span></div>
    </div></>}
  </div>
}
