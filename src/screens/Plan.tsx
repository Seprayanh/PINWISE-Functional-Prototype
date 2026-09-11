import type { Dispatch, SetStateAction } from 'react'
import type { ItineraryDay, Place, PlaceDecision, PlanView } from '../types'
import { IconAlert, IconGrip, IconPlus, IconRefresh, IconTrash } from '../components/Icons'
import { PlaceCard } from '../components/PlaceCard'
import { Badge, PageHeader } from '../components/UI'

export function PlanScreen({ destination,view,setView,places,itinerary,setItinerary,onPlace,onDecision,onReoptimize,onConflict,finalized,onFinalize }: {
  destination:string;view:PlanView;setView:(v:PlanView)=>void;places:Place[];itinerary:ItineraryDay[];setItinerary:Dispatch<SetStateAction<ItineraryDay[]>>;onPlace:(p:Place)=>void;onDecision:(p:Place,decision:PlaceDecision)=>void;onReoptimize:()=>void;onConflict:()=>void;finalized:boolean;onFinalize:()=>void
}) {
  const selected=places.filter(p=>p.selected)
  function move(dayId:number,index:number,dir:-1|1){setItinerary(all=>all.map(d=>{if(d.id!==dayId)return d;const arr=[...d.items];const to=index+dir;if(to<0||to>=arr.length)return d;[arr[index],arr[to]]=[arr[to],arr[index]];return {...d,items:arr}}))}
  function remove(dayId:number,itemId:string,place:Place){setItinerary(all=>all.map(d=>d.id===dayId?{...d,items:d.items.filter(i=>i.id!==itemId)}:d));onDecision(place,'removed')}
  function addPlace(place:Place){const first=itinerary[0];if(!first||first.items.some(i=>i.placeId===place.id))return;setItinerary(all=>all.map(d=>d.id===first.id?{...d,items:[...d.items,{id:`item-${Date.now()}`,time:'16:00',placeId:place.id}]}:d));onDecision(place,'kept')}
  return <div className="screen-scroll"><PageHeader title={`Plan ${destination}`} subtitle={`${selected.length} selected places · built from your sources`}/>
    <main className="screen-content plan-content">
      <div className="segmented">{(['map','places','itinerary'] as PlanView[]).map(v=><button key={v} className={view===v?'active':''} onClick={()=>setView(v)}>{v[0].toUpperCase()+v.slice(1)}</button>)}</div>
      {view==='map'&&<div className="map-panel">
        <div className="map-grid" aria-label={`Stylized ${destination} map`}>{places.filter(p=>p.decision!=='removed').map(p=><button key={p.id} style={{left:`${p.marker.x}%`,top:`${p.marker.y}%`}} className={`map-marker ${p.status} ${p.selected?'selected':''}`} onClick={()=>onPlace(p)}><span>{p.name.split(' ').map(x=>x[0]).slice(0,2).join('')}</span></button>)}<div className="river river-a"/><div className="road road-a"/><div className="road road-b"/></div>
        <div className="map-legend"><span><i className="dot current"/>Current</span><span><i className="dot review"/>Review</span><span><i className="dot unverified"/>Unverified</span></div>
        <div className="map-summary"><div><strong>{places.length}</strong><span>places</span></div><div><strong>{selected.length}</strong><span>selected</span></div><div><strong>{places.filter(p=>p.selected&&(p.status==='review'||p.status==='outdated'||p.status==='unverified')).length}</strong><span>needs review</span></div></div>
      </div>}
      {view==='places'&&<div className="place-list">{places.map(p=><PlaceCard key={p.id} place={p} onOpen={()=>onPlace(p)} onDecision={d=>onDecision(p,d)}/>)}</div>}
      {view==='itinerary'&&<div className="itinerary-wrap">
        {itinerary.map(day=><section key={day.id} className="day-card"><div className="day-heading"><div><strong>{day.title}</strong><span>{day.area}</span></div><Badge status="ai">Editable plan</Badge></div>{day.items.map((item,index)=>{const p=places.find(x=>x.id===item.placeId);if(!p||p.decision==='removed')return null;return <div className="itinerary-row" key={item.id}><IconGrip/><time>{item.time}</time><button className="it-place" onClick={()=>onPlace(p)}><strong>{p.name}</strong><span>{p.area} · {p.kind}</span></button><div className="mini-controls"><button onClick={()=>move(day.id,index,-1)} title="Move up">↑</button><button onClick={()=>move(day.id,index,1)} title="Move down">↓</button><button onClick={()=>remove(day.id,item.id,p)} title="Remove"><IconTrash size={15}/></button></div></div>})}</section>)}
        <section className="add-place-block"><strong>Add a place</strong><p>Choose any candidate or previously removed place. Your choice is preserved in “Optimize around my choices”.</p><div className="chip-row">{places.filter(p=>!p.selected||p.decision==='removed').map(p=><button key={p.id} onClick={()=>addPlace(p)}><IconPlus size={14}/>{p.name}</button>)}</div></section>
        <button className="secondary-button" onClick={onReoptimize}><IconRefresh/> Re-optimize…</button>
        <button className="secondary-button" onClick={onConflict}><IconAlert/> Check timing & conflicts</button>
        <button className="primary-button" onClick={onFinalize}>{finalized?'Final itinerary saved':'Save final itinerary'}</button>
      </div>}
    </main>
  </div>
}
