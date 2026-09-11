import { useMemo, useState } from 'react'
import { BottomNav, HomeIndicator, StatusBar } from './components/Chrome'
import { ProgressPanel } from './components/UI'
import { INITIAL_ITINERARY, INITIAL_PLACES, INITIAL_SOURCES } from './data/demoData'
import { FreshnessFlow } from './screens/FreshnessFlow'
import { HomeScreen } from './screens/Home'
import { PlanScreen } from './screens/Plan'
import { SettingsScreen, type SettingsState } from './screens/Settings'
import { SourcesScreen } from './screens/Sources'
import type { ItineraryDay, Place, PlanView, SourceItem, Tab } from './types'

export default function App() {
  const [tab,setTab]=useState<Tab>('home')
  const [planView,setPlanView]=useState<PlanView>('map')
  const [sources,setSources]=useState<SourceItem[]>(INITIAL_SOURCES)
  const [places,setPlaces]=useState<Place[]>(INITIAL_PLACES)
  const [itinerary,setItinerary]=useState<ItineraryDay[]>(INITIAL_ITINERARY)
  const [freshnessPlace,setFreshnessPlace]=useState<Place|null>(null)
  const [busy,setBusy]=useState<{type:'optimize'|'conflict';progress:number}|null>(null)
  const [conflictOpen,setConflictOpen]=useState(false)
  const [finalized,setFinalized]=useState(false)
  const [toast,setToast]=useState('')
  const [settings,setSettings]=useState<SettingsState>({freshness:true,explanations:true,autoRemove:false,notifications:true,locationHints:true,condition:'freshness'})

  const selectedCount=places.filter(p=>p.selected).length
  const reviewCount=settings.condition==='freshness'?places.filter(p=>p.selected && (p.status==='review'||p.status==='outdated')).length:0
  const focusedPlace=freshnessPlace && places.find(p=>p.id===freshnessPlace.id) || freshnessPlace
  const restaurantReplacement=places.find(p=>p.id==='daikanyama')

  function showToast(msg:string){setToast(msg);setTimeout(()=>setToast(''),2400)}
  function openPlan(v:PlanView='map'){setPlanView(v);setTab('plan')}
  function openFreshness(){const target=places.find(p=>p.status==='review'&&p.selected) || places.find(p=>p.selected);if(target)setFreshnessPlace(target)}
  function onAnalyzed(){setPlaces(ps=>ps.map(p=>({...p})));showToast('10 unique places extracted · 2 duplicates merged');setPlanView('places');setTab('plan')}
  function updatePlace(updated:Place){setPlaces(ps=>ps.map(p=>p.id===updated.id?updated:p));setItinerary(days=>days.map(d=>({...d,items:d.items.map(i=>i.placeId===updated.id?{...i}:i)})));showToast(`${updated.name} updated`)}
  function replacePlace(old:Place){
    if(!restaurantReplacement){setFreshnessPlace(null);return}
    setPlaces(ps=>ps.map(p=>p.id===old.id?{...p,selected:false,status:'outdated'}:p.id===restaurantReplacement.id?{...p,selected:true,status:'current'}:p))
    setItinerary(days=>days.map(d=>({...d,items:d.items.map(i=>i.placeId===old.id?{...i,placeId:restaurantReplacement.id,time:'17:20'}:i)})))
    setFreshnessPlace(null);showToast(`${old.name} replaced with ${restaurantReplacement.name}`)
  }
  function runBusy(type:'optimize'|'conflict'){
    setBusy({type,progress:10});[35,68,100].forEach((p,i)=>setTimeout(()=>setBusy({type,progress:p}),500*(i+1)))
    setTimeout(()=>{setBusy(null); if(type==='optimize'){setItinerary(days=>days.map((d,di)=>({...d,items:d.items.map((it,ii)=>({...it,time:di===0?['10:00','14:00','17:20','19:10'][ii]||it.time:it.time}))})));showToast('Route updated · 24 min less travel time')}else setConflictOpen(true)},2100)
  }
  function finalize(){setFinalized(true);showToast('Final trip saved');setTimeout(()=>setTab('home'),600)}

  const content=useMemo(()=>{
    if(tab==='home') return <HomeScreen onTab={t=>t==='plan'?openPlan('map'):setTab(t)} onFreshness={openFreshness} finalized={finalized} selectedCount={selectedCount} sourceCount={sources.length} reviewCount={reviewCount}/>
    if(tab==='sources') return <SourcesScreen sources={sources} setSources={setSources} onAnalyzed={onAnalyzed}/>
    if(tab==='plan') return <PlanScreen view={planView} setView={setPlanView} places={places} setPlaces={setPlaces} itinerary={itinerary} setItinerary={setItinerary} onPlace={p=>settings.condition==='freshness'?setFreshnessPlace(p):showToast(`${p.name} · freshness hidden in Condition A`)} onReoptimize={()=>runBusy('optimize')} onConflict={()=>runBusy('conflict')} finalized={finalized} onFinalize={finalize}/>
    return <SettingsScreen settings={settings} setSettings={setSettings}/>
  },[tab,planView,places,itinerary,sources,settings,finalized,selectedCount,reviewCount])

  return <div className="app-shell">
    <div className="phone-frame" role="application" aria-label="PINWISE functional high-fidelity prototype">
      <StatusBar/>
      <div className="phone-content">{content}</div>
      <BottomNav active={tab} onChange={setTab}/>
      <HomeIndicator/>
      {focusedPlace && <div className="overlay-layer"><FreshnessFlow place={focusedPlace} condition={settings.condition} onClose={()=>setFreshnessPlace(null)} onUpdate={p=>{updatePlace(p);setFreshnessPlace(null)}} onReplace={replacePlace}/></div>}
      {busy && <div className="modal-scrim"><div className="modal-card"><ProgressPanel title={busy.type==='optimize'?'AI is re-optimizing':'Checking itinerary constraints'} subtitle={busy.type==='optimize'?'Preserving your add / remove / reorder decisions while reducing backtracking.':'Comparing current hours, timing and travel gaps.'} progress={busy.progress}/></div></div>}
      {conflictOpen && <div className="modal-scrim"><div className="sheet-card"><div className="sheet-handle"/><span className="eyebrow">CONFLICT CHECK</span><h2>Trip looks feasible</h2><div className="check-list"><div><b>✓</b><span><strong>Day 1 timing</strong><small>Daikanyama Café closes at 19:00. Arrival: 17:20.</small></span></div><div><b>✓</b><span><strong>Day 2 travel time</strong><small>Senso-ji → Ueno Park: about 25 minutes.</small></span></div><div className="optional"><b>i</b><span><strong>Optional note</strong><small>Koffee Mame may have a short wait at peak time.</small></span></div></div><button className="primary-button" onClick={()=>setConflictOpen(false)}>Back to itinerary</button></div></div>}
      {toast && <div className="toast">{toast}</div>}
    </div>
    <div className="desktop-caption"><strong>PINWISE · Functional Hi‑Fi</strong><span>iPhone 14 Pro · 393 × 852 · React / TypeScript / Vite</span></div>
  </div>
}
