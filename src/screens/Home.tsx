import type { Tab, TripPlan } from '../types'
import { Notice, PageHeader } from '../components/UI'

function daysBetween(a:string,b:string){
  const n=Math.round((new Date(b).getTime()-new Date(a).getTime())/86400000)+1
  return Math.max(1,n||1)
}
function shortDate(d:string){return d ? d.slice(5).replace('-','/') : '—'}
function reviewCount(plan:TripPlan){
  return plan.places.filter(p=>p.selected&&p.decision!=='removed'&&['review','outdated','unverified'].includes(p.status)).length
}
function selectedCount(plan:TripPlan){return plan.places.filter(p=>p.selected&&p.decision!=='removed').length}

export function HomeScreen({
  plans,activePlanId,onSelectPlan,onTab,onFreshness,onNewTrip,onDeletePlan
}:{
  plans:TripPlan[];activePlanId:string;onSelectPlan:(id:string)=>void;onTab:(t:Tab)=>void;onFreshness:()=>void;onNewTrip:()=>void;onDeletePlan:(id:string)=>void
}) {
  const active=plans.find(p=>p.id===activePlanId) || plans[0]
  if(!active) return null
  const activeReview=reviewCount(active)
  const activeSelected=selectedCount(active)

  return <div className="screen-scroll">
    <PageHeader
      title="My trips"
      subtitle={`${plans.length} plan${plans.length===1?'':'s'} · switch anytime without losing edits`}
    />
    <main className="screen-content home-content">
      <div className="trips-heading">
        <div><strong>Travel plans</strong><span>Each trip keeps its own sources, places and itinerary.</span></div>
        <button className="new-trip-inline" onClick={onNewTrip}>＋ New trip</button>
      </div>

      <div className="trip-card-list">
        {plans.map(plan=>{
          const reviews=reviewCount(plan), selected=selectedCount(plan), isActive=plan.id===activePlanId
          return <article key={plan.id} className={`trip-card ${isActive?'active':''}`}>
            <button className="trip-card-main" onClick={()=>onSelectPlan(plan.id)}>
              <div className="trip-card-top">
                <span className="eyebrow">{isActive?'ACTIVE TRIP':'TRIP'}</span>
                <span className={`trip-status ${plan.finalized?'saved':'draft'}`}>{plan.finalized?'Saved':'Draft'}</span>
              </div>
              <h2>{plan.meta.destination}</h2>
              <p>{shortDate(plan.meta.startDate)}–{shortDate(plan.meta.endDate)} · {daysBetween(plan.meta.startDate,plan.meta.endDate)} days</p>
              <div className="trip-stats">
                <span><b>{plan.sources.length}</b> sources</span>
                <span><b>{selected}</b> places</span>
                <span className={reviews?'warn':''}><b>{reviews}</b> review</span>
              </div>
              <small>Edited {new Date(plan.updatedAt).toLocaleDateString()}</small>
            </button>
            {plans.length>1&&<button className="trip-delete" onClick={()=>onDeletePlan(plan.id)} aria-label={`Delete ${plan.meta.destination} trip`}>Delete</button>}
          </article>
        })}
      </div>

      <button className="hero-card" onClick={()=>onTab('plan')}>
        <span className="eyebrow">{active.meta.destination.toUpperCase()} · {shortDate(active.meta.startDate)}–{shortDate(active.meta.endDate)}</span>
        <h2>{active.finalized?'Your active trip is ready.':'Continue your active trip.'}</h2>
        <p>{activeReview?`${activeReview} selected place${activeReview===1?'':'s'} still need freshness review.`:'Everything selected is checked.'}</p>
        <span className={`hero-pill ${activeReview?'warn':'ok'}`}>{activeReview?`${activeReview} needs review`:'Ready to go'}</span>
      </button>

      <div className="quick-grid">
        <button className="quick-card" onClick={()=>onTab('sources')}><strong>Add sources</strong><span>Links & screenshots</span></button>
        <button className="quick-card" onClick={()=>onTab('plan')}><strong>View map</strong><span>See trip geography</span></button>
        <button className="quick-card" onClick={onFreshness}><strong>Check freshness</strong><span>Verify older info</span></button>
        <button className="quick-card" onClick={()=>onTab('plan')}><strong>Open itinerary</strong><span>Edit your days</span></button>
      </div>

      {activeReview>0
        ? <Notice tone="orange" title="Freshness review pending" copy={`${activeReview} selected place${activeReview===1?'':'s'} have unresolved or older practical information.`}/>
        : <Notice tone="green" title="Freshness review complete" copy={`${activeSelected} selected places currently have no unresolved freshness conflicts.`}/>}
    </main>
  </div>
}
