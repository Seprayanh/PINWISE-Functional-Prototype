import type { Tab, TripMeta } from '../types'
import { Notice, PageHeader } from '../components/UI'

function daysBetween(a:string,b:string){const n=Math.round((new Date(b).getTime()-new Date(a).getTime())/86400000)+1;return Math.max(1,n||1)}
export function HomeScreen({ trip,onTab,onFreshness,onNewTrip,finalized,selectedCount,sourceCount,reviewCount }: { trip:TripMeta;onTab:(t:Tab)=>void;onFreshness:()=>void;onNewTrip:()=>void;finalized:boolean;selectedCount:number;sourceCount:number;reviewCount:number }) {
  return <div className="screen-scroll">
    <PageHeader title={`Your ${trip.destination} trip`} subtitle={`${daysBetween(trip.startDate,trip.endDate)} days · ${sourceCount} saved sources · ${selectedCount} places`} />
    <main className="screen-content home-content">
      <button className="new-trip-inline" onClick={onNewTrip}>＋ New trip</button>
      <button className="hero-card" onClick={()=>onTab('plan')}>
        <span className="eyebrow">{trip.destination.toUpperCase()} · {trip.startDate.slice(5)}–{trip.endDate.slice(5)}</span>
        <h2>{finalized?'Your trip is ready.':'Build a plan you can trust.'}</h2>
        <p>{finalized?'Final itinerary saved with checked practical details and your edits preserved.':reviewCount?`${reviewCount} selected place${reviewCount===1?'':'s'} still need freshness review.`:'Everything selected is checked.'}</p>
        <span className={`hero-pill ${reviewCount?'warn':'ok'}`}>{reviewCount?`${reviewCount} needs review`:'Ready to go'}</span>
      </button>
      <div className="quick-grid">
        <button className="quick-card" onClick={()=>onTab('sources')}><strong>Add sources</strong><span>Links & screenshots</span></button>
        <button className="quick-card" onClick={()=>onTab('plan')}><strong>View map</strong><span>See trip geography</span></button>
        <button className="quick-card" onClick={onFreshness}><strong>Check freshness</strong><span>Verify older info</span></button>
        <button className="quick-card" onClick={()=>onTab('plan')}><strong>Open itinerary</strong><span>Edit your days</span></button>
      </div>
      {reviewCount>0?<Notice tone="orange" title="Freshness review pending" copy={`${reviewCount} selected place${reviewCount===1?'':'s'} have unresolved or older practical information.`}/>:<Notice tone="green" title="Freshness review complete" copy="Your selected places no longer carry unresolved practical conflicts."/>}
      {finalized&&<Notice tone="green" title="Saved to your trips" copy={`${selectedCount} places saved · ${reviewCount} unresolved freshness issues.`}/>} 
    </main>
  </div>
}
