import type { Tab, TripPlan } from '../types'
import { Notice, PageHeader } from '../components/UI'

function reviewCount(plan:TripPlan){return plan.places.filter(p=>p.selected&&p.decision!=='removed'&&['review','outdated','unverified'].includes(p.status)).length}
function selectedCount(plan:TripPlan){return plan.places.filter(p=>p.selected&&p.decision!=='removed').length}
function daysBetween(a:string,b:string){const n=Math.round((new Date(b).getTime()-new Date(a).getTime())/86400000)+1;return Math.max(1,n||1)}

export function TripOverview({plan,onTab,onFreshness}:{plan:TripPlan;onTab:(t:Tab)=>void;onFreshness:()=>void}){
  const reviews=reviewCount(plan), selected=selectedCount(plan)
  return <div className="screen-scroll">
    <PageHeader title={`${plan.meta.destination} overview`} subtitle={`${daysBetween(plan.meta.startDate,plan.meta.endDate)} days · ${plan.sources.length} sources · ${selected} selected places`}/>
    <main className="screen-content">
      <button className="hero-card workspace-hero" onClick={()=>onTab('plan')}>
        <span className="eyebrow">{plan.finalized?'SAVED TRIP':'WORK IN PROGRESS'}</span>
        <h2>{plan.finalized?'Your itinerary is ready.':'Continue planning with verified information.'}</h2>
        <p>{reviews?`${reviews} selected place${reviews===1?'':'s'} still need your decision.`:'No unresolved freshness issues in selected places.'}</p>
        <span className={`hero-pill ${reviews?'warn':'ok'}`}>{reviews?`${reviews} needs review`:'Freshness checked'}</span>
      </button>
      <div className="quick-grid">
        <button className="quick-card" onClick={()=>onTab('sources')}><strong>Sources</strong><span>{plan.sources.length} imported items</span></button>
        <button className="quick-card" onClick={()=>onTab('plan')}><strong>Map &amp; places</strong><span>{selected} selected places</span></button>
        <button className="quick-card" onClick={onFreshness}><strong>Freshness</strong><span>{reviews?`${reviews} need review`:'Checks complete'}</span></button>
        <button className="quick-card" onClick={()=>onTab('plan')}><strong>Itinerary</strong><span>{plan.itinerary.length} day plan</span></button>
      </div>
      {reviews>0
        ? <Notice tone="orange" title="Your decision is needed" copy="AI found newer evidence for at least one selected place. Review the evidence, then keep, replace or remove it."/>
        : <Notice tone="green" title="Trip information looks current" copy="Selected places no longer carry unresolved practical conflicts."/>}
    </main>
  </div>
}
