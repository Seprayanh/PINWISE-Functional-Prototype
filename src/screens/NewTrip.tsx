import { useState } from 'react'
import type { TripMeta } from '../types'

export function NewTrip({ onClose, onCreate }: { onClose:()=>void; onCreate:(trip:TripMeta)=>void }) {
  const [destination,setDestination]=useState('Tokyo')
  const [startDate,setStartDate]=useState('2027-04-18')
  const [endDate,setEndDate]=useState('2027-04-21')
  return <div className="modal-scrim"><div className="sheet-card new-trip-sheet"><div className="sheet-handle"/>
    <span className="eyebrow">NEW TRIP</span><h2>Start a new trip</h2>
    <label className="form-field"><span>Destination</span><input value={destination} onChange={e=>setDestination(e.target.value)} placeholder="City or region"/></label>
    <div className="date-grid"><label className="form-field"><span>Start</span><input type="date" value={startDate} onChange={e=>setStartDate(e.target.value)}/></label><label className="form-field"><span>End</span><input type="date" value={endDate} onChange={e=>setEndDate(e.target.value)}/></label></div>
    <p className="form-hint">You can add links and screenshots next. AI organizes them, then you decide what stays.</p>
    <button className="primary-button" onClick={()=>destination.trim()&&onCreate({id:`trip-${Date.now()}`,destination:destination.trim(),startDate,endDate,saved:false})}>Create trip</button>
    <button className="ghost-button" onClick={onClose}>Cancel</button>
  </div></div>
}
