import { useMemo, useState } from 'react'
import { BottomNav, HomeIndicator, StatusBar } from './components/Chrome'
import { ProgressPanel } from './components/UI'
import { EXTRACTED_BATCH, INITIAL_ITINERARY, INITIAL_PLACES, INITIAL_SOURCES, INITIAL_TRIP } from './data/demoData'
import { FreshnessFlow } from './screens/FreshnessFlow'
import { HomeScreen } from './screens/Home'
import { NewTrip } from './screens/NewTrip'
import { PlanScreen } from './screens/Plan'
import { SettingsScreen, type SettingsState } from './screens/Settings'
import { SourcesScreen } from './screens/Sources'
import type { ConflictIssue, ItineraryDay, OptimizeMode, Place, PlaceDecision, PlanView, SourceItem, Tab, TripMeta } from './types'

const clonePlaces=()=>INITIAL_PLACES.map(p=>({...p,evidence:p.evidence?.map(e=>({...e}))}))
const cloneItinerary=()=>INITIAL_ITINERARY.map(d=>({...d,items:d.items.map(i=>({...i}))}))

export default function App(){
  const [tab,setTab]=useState<Tab>('home')
  const [planView,setPlanView]=useState<PlanView>('map')
  const [trip,setTrip]=useState<TripMeta>(INITIAL_TRIP)
  const [sources,setSources]=useState<SourceItem[]>(INITIAL_SOURCES)
  const [places,setPlaces]=useState<Place[]>(clonePlaces)
  const [itinerary,setItinerary]=useState<ItineraryDay[]>(cloneItinerary)
  const [freshnessPlace,setFreshnessPlace]=useState<Place|null>(null)
  const [busy,setBusy]=useState<{type:'optimize'|'conflict';progress:number}|null>(null)
  const [conflicts,setConflicts]=useState<ConflictIssue[]|null>(null)
  const [optimizePicker,setOptimizePicker]=useState(false)
  const [alternativeSuggestion,setAlternativeSuggestion]=useState(false)
  const [newTripOpen,setNewTripOpen]=useState(false)
  const [finalized,setFinalized]=useState(false)
  const [toast,setToast]=useState('')
  const [settings,setSettings]=useState<SettingsState>({freshness:true,explanations:true,autoRemove:false,notifications:true,locationHints:true,condition:'freshness'})

  const selectedCount=places.filter(p=>p.selected&&p.decision!=='removed').length
  const reviewCount=settings.condition==='freshness'?places.filter(p=>p.selected&&['review','outdated','unverified'].includes(p.status)).length:0
  const focusedPlace=freshnessPlace&&places.find(p=>p.id===freshnessPlace.id)||freshnessPlace
  const restaurantReplacement=places.find(p=>p.id==='daikanyama')

  function showToast(msg:string){setToast(msg);setTimeout(()=>setToast(''),2300)}
  function openPlan(v:PlanView='map'){setPlanView(v);setTab('plan')}
  function openFreshness(){const target=places.find(p=>p.selected&&(p.status==='review'||p.status==='outdated'||p.status==='unverified'))||places.find(p=>p.selected);if(target)setFreshnessPlace(target);else showToast('Add a place first')}
  function updatePlace(updated:Place){setPlaces(ps=>ps.map(p=>p.id===updated.id?updated:p));showToast(`${updated.name} updated`)}

  function ensureInItinerary(place:Place){
    setItinerary(days=>{
      if(days.some(d=>d.items.some(i=>i.placeId===place.id))) return days
      const target=days[0]||{id:1,title:'Day 1',area:place.area,items:[]}
      if(!days.length)return [{...target,items:[{id:`item-${Date.now()}`,time:'16:00',placeId:place.id}]}]
      return days.map(d=>d.id===target.id?{...d,items:[...d.items,{id:`item-${Date.now()}`,time:'16:00',placeId:place.id}]}:d)
    })
  }
  function removeFromItinerary(placeId:string){setItinerary(days=>days.map(d=>({...d,items:d.items.filter(i=>i.placeId!==placeId)})))}
  function decidePlace(place:Place,decision:PlaceDecision){
    if(decision==='removed'){setPlaces(ps=>ps.map(p=>p.id===place.id?{...p,selected:false,decision:'removed'}:p));removeFromItinerary(place.id);showToast(`${place.name} removed`);return}
    if(decision==='review'){setPlaces(ps=>ps.map(p=>p.id===place.id?{...p,selected:true,decision:'review',status:p.status==='current'?'review':p.status}:p));ensureInItinerary(place);setFreshnessPlace({...place,selected:true,decision:'review',status:place.status==='current'?'review':place.status});return}
    setPlaces(ps=>ps.map(p=>p.id===place.id?{...p,selected:true,decision:'kept'}:p));ensureInItinerary(place);showToast(`${place.name} kept in trip`)
  }
  function removePlace(place:Place){decidePlace(place,'removed');setFreshnessPlace(null)}
  function replacePlace(old:Place){
    if(!restaurantReplacement){setFreshnessPlace(null);return}
    setPlaces(ps=>ps.map(p=>p.id===old.id?{...p,selected:false,decision:'replaced',status:'outdated'}:p.id===restaurantReplacement.id?{...p,selected:true,decision:'kept',status:'current',lastChecked:'today'}:p))
    setItinerary(days=>days.map(d=>({...d,items:d.items.map(i=>i.placeId===old.id?{...i,placeId:restaurantReplacement.id,time:'17:20'}:i)})))
    setFreshnessPlace(null);showToast(`${old.name} replaced · itinerary moved to 17:20`)
  }
  function onAnalyzed(){
    setSources(ss=>ss.map(s=>({...s,analyzed:true})))
    setPlaces(ps=>{const ids=new Set(ps.map(p=>p.id));const add=EXTRACTED_BATCH.filter(p=>!ids.has(p.id));return [...ps,...add]})
    showToast('AI extraction complete · 2 new places added');setPlanView('places');setTab('plan')
  }
  function runBusy(type:'optimize'|'conflict',mode?:OptimizeMode){
    setBusy({type,progress:10});[35,68,100].forEach((p,i)=>setTimeout(()=>setBusy({type,progress:p}),420*(i+1)))
    setTimeout(()=>{
      setBusy(null)
      if(type==='optimize'){
        if(mode==='preserve'){
          setItinerary(days=>days.map((d,di)=>({...d,items:d.items.map((it,ii)=>({...it,time:di===0?['10:00','13:40','17:20','19:10','20:10'][ii]||it.time:['09:15','12:45','15:30'][ii]||it.time}))})))
          showToast('Optimized around your choices · no places changed')
        }else setAlternativeSuggestion(true)
      }else setConflicts(buildConflicts())
    },1800)
  }
  function buildConflicts():ConflictIssue[]{
    const issues:ConflictIssue[]=[]
    const currentItems=itinerary.flatMap(d=>d.items.map(i=>({day:d,...i,place:places.find(p=>p.id===i.placeId)}))).filter(x=>x.place&&x.place.decision!=='removed')
    for(const x of currentItems){
      if(x.place!.id==='restaurant-a'&&x.time>='20:00')issues.push({id:'hours-ra',type:'hours',severity:'warning',title:'Opening-hours conflict',detail:`Restaurant A now closes at 20:00, but your itinerary arrives at ${x.time}.`})
      if(x.place!.status==='review'||x.place!.status==='outdated')issues.push({id:`fresh-${x.place!.id}`,type:'freshness',severity:'warning',title:'Unresolved freshness issue',detail:`${x.place!.name} still has practical information that needs your decision.`})
    }
    itinerary.forEach(day=>{
      const times=new Map<string,number>();day.items.forEach(i=>times.set(i.time,(times.get(i.time)||0)+1));times.forEach((n,time)=>{if(n>1)issues.push({id:`overlap-${day.id}-${time}`,type:'overlap',severity:'warning',title:'Overlapping activities',detail:`${day.title} has ${n} activities scheduled at ${time}.`})})
      for(let i=1;i<day.items.length;i++){const a=places.find(p=>p.id===day.items[i-1].placeId),b=places.find(p=>p.id===day.items[i].placeId);if(a&&b&&a.area!==b.area&&minutes(day.items[i].time)-minutes(day.items[i-1].time)<45)issues.push({id:`travel-${day.id}-${i}`,type:'travel',severity:'warning',title:'Travel time may be too short',detail:`Allow more time between ${a.name} (${a.area}) and ${b.name} (${b.area}).`})}
    })
    return issues
  }
  function confirmAlternative(){const old=places.find(p=>p.id==='restaurant-a'&&p.selected);if(old)replacePlace(old);setAlternativeSuggestion(false);showToast('Alternative accepted · your confirmation changed the plan')}
  function finalize(){setFinalized(true);setTrip(t=>({...t,saved:true}));showToast('Final trip saved');setTimeout(()=>setTab('home'),650)}
  function createTrip(meta:TripMeta){setTrip(meta);setSources([]);setPlaces([]);setItinerary([{id:1,title:'Day 1',area:meta.destination,items:[]}]);setFinalized(false);setNewTripOpen(false);setTab('sources');showToast('Trip created · add your first source')}

  const content=useMemo(()=>{
    if(tab==='home')return <HomeScreen trip={trip} onTab={t=>t==='plan'?openPlan('map'):setTab(t)} onFreshness={openFreshness} onNewTrip={()=>setNewTripOpen(true)} finalized={finalized} selectedCount={selectedCount} sourceCount={sources.length} reviewCount={reviewCount}/>
    if(tab==='sources')return <SourcesScreen sources={sources} setSources={setSources} onAnalyzed={onAnalyzed}/>
    if(tab==='plan')return <PlanScreen destination={trip.destination} view={planView} setView={setPlanView} places={places} itinerary={itinerary} setItinerary={setItinerary} onPlace={p=>settings.condition==='freshness'?setFreshnessPlace(p):showToast(`${p.name} · freshness hidden in Condition A`)} onDecision={decidePlace} onReoptimize={()=>setOptimizePicker(true)} onConflict={()=>runBusy('conflict')} finalized={finalized} onFinalize={finalize}/>
    return <SettingsScreen settings={settings} setSettings={setSettings}/>
  },[tab,planView,places,itinerary,sources,settings,finalized,selectedCount,reviewCount,trip])

  return <div className="app-shell"><div className="phone-frame" role="application" aria-label="PINWISE v2 functional high-fidelity prototype">
    <StatusBar/><div className="phone-content">{content}</div><BottomNav active={tab} onChange={setTab}/><HomeIndicator/>
    {focusedPlace&&<div className="overlay-layer"><FreshnessFlow place={focusedPlace} condition={settings.condition} onClose={()=>setFreshnessPlace(null)} onUpdate={p=>{updatePlace(p);if(p.selected)ensureInItinerary(p);setFreshnessPlace(null)}} onReplace={replacePlace} onRemove={removePlace}/></div>}
    {newTripOpen&&<NewTrip onClose={()=>setNewTripOpen(false)} onCreate={createTrip}/>}
    {optimizePicker&&<div className="modal-scrim"><div className="sheet-card"><div className="sheet-handle"/><span className="eyebrow">RE-OPTIMIZE</span><h2>How should AI help?</h2><button className="mode-choice" onClick={()=>{setOptimizePicker(false);runBusy('optimize','preserve')}}><strong>Optimize around my choices</strong><span>Keep every place you added, removed, or reordered. AI only adjusts logistics and timing.</span></button><button className="mode-choice" onClick={()=>{setOptimizePicker(false);runBusy('optimize','suggest')}}><strong>Suggest better alternatives</strong><span>AI may suggest replacements, but nothing changes until you confirm.</span></button><button className="ghost-button" onClick={()=>setOptimizePicker(false)}>Cancel</button></div></div>}
    {alternativeSuggestion&&<div className="modal-scrim"><div className="sheet-card"><div className="sheet-handle"/><span className="eyebrow">AI SUGGESTION · NEEDS CONFIRMATION</span><h2>Replace Restaurant A?</h2><p className="sheet-copy">Recent evidence conflicts with the saved post. Daikanyama Café has current hours and reduces backtracking.</p><div className="compare-mini"><div><small>Current</small><strong>Restaurant A</strong><span>20:30 · freshness conflict</span></div><div><small>Suggested</small><strong>Daikanyama Café</strong><span>17:20 · current info</span></div></div><button className="primary-button" onClick={confirmAlternative}>Accept replacement</button><button className="secondary-button" onClick={()=>{setAlternativeSuggestion(false);showToast('Suggestion declined · your choices preserved')}}>Keep my current plan</button></div></div>}
    {busy&&<div className="modal-scrim"><div className="modal-card"><ProgressPanel title={busy.type==='optimize'?'AI is re-optimizing':'Checking itinerary constraints'} subtitle={busy.type==='optimize'?'Applying the mode you selected without silently overriding your decisions.':'Checking opening hours, travel gaps, overlaps, and unresolved freshness.'} progress={busy.progress}/></div></div>}
    {conflicts&&<div className="modal-scrim"><div className="sheet-card conflict-sheet"><div className="sheet-handle"/><span className="eyebrow">CONFLICT CHECK</span><h2>{conflicts.length?`${conflicts.length} issue${conflicts.length===1?'':'s'} found`:'No conflicts found'}</h2><div className="check-list">{conflicts.length?conflicts.map(c=><div key={c.id} className="conflict-item"><b>!</b><span><strong>{c.title}</strong><small>{c.detail}</small></span></div>):<div><b>&#10003;</b><span><strong>Trip looks feasible</strong><small>Opening hours, timing, travel gaps and freshness checks passed.</small></span></div>}</div><button className="primary-button" onClick={()=>setConflicts(null)}>Back to itinerary</button></div></div>}
    {toast&&<div className="toast">{toast}</div>}
  </div><div className="desktop-caption"><strong>PINWISE v2 · Functional Hi‑Fi</strong><span>Stateful prototype · AI organizes → AI verifies → User decides</span></div></div>
}

function minutes(t:string){const [h,m]=t.split(':').map(Number);return h*60+m}