import type { TripPlan } from '../types'
import { PageHeader } from '../components/UI'

function daysBetween(a:string,b:string){
  const n=Math.round((new Date(b).getTime()-new Date(a).getTime())/86400000)+1
  return Math.max(1,n||1)
}
function shortDate(d:string){return d ? d.slice(5).replace('-','/') : '—'}
function reviewCount(plan:TripPlan){return plan.places.filter(p=>p.selected&&p.decision!=='removed'&&['review','outdated','unverified'].includes(p.status)).length}
function selectedCount(plan:TripPlan){return plan.places.filter(p=>p.selected&&p.decision!=='removed').length}

export function HomeScreen({plans,onOpenTrip,onNewTrip,onRequestDelete}:{
  plans:TripPlan[];onOpenTrip:(id:string)=>void;onNewTrip:()=>void;onRequestDelete:(id:string)=>void
}) {
  return <div className="screen-scroll">
    <PageHeader title="My trips" subtitle="Choose a trip first, then plan, verify and edit inside its workspace."/>
    <main className="screen-content home-content">
      <div className="trips-heading app-home-heading">
        <div><strong>Travel plans</strong><span>Every trip keeps its own sources, places, checks and itinerary.</span></div>
        <button className="new-trip-inline" onClick={onNewTrip}>＋ New trip</button>
      </div>
      <div className="trip-card-list">
        {plans.map(plan=>{
          const reviews=reviewCount(plan), selected=selectedCount(plan)
          return <article key={plan.id} className="trip-card app-level-trip-card">
            <button className="trip-card-main" onClick={()=>onOpenTrip(plan.id)}>
              <div className="trip-card-top">
                <span className="eyebrow">TRIP</span>
                <span className={`trip-status ${plan.finalized?'saved':'draft'}`}>{plan.finalized?'Saved':'Draft'}</span>
              </div>
              <h2>{plan.meta.destination}</h2>
              <p>{shortDate(plan.meta.startDate)}–{shortDate(plan.meta.endDate)} · {daysBetween(plan.meta.startDate,plan.meta.endDate)} days</p>
              <div className="trip-stats">
                <span><b>{plan.sources.length}</b> sources</span>
                <span><b>{selected}</b> places</span>
                <span className={reviews?'warn':''}><b>{reviews}</b> review</span>
              </div>
              <div className="open-trip-row"><span>Open trip workspace</span><b>→</b></div>
            </button>
            {plans.length>1&&<button className="trip-delete" onClick={()=>onRequestDelete(plan.id)}>Delete</button>}
          </article>
        })}
      </div>
    </main>
  </div>
}
