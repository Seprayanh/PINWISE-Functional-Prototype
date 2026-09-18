import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { divIcon } from 'leaflet'
import type { Place, FreshnessStatus } from '../types'

const COLORS:Record<FreshnessStatus,string>={
 current:'#1F6A50',review:'#D96800',outdated:'#9E2F24',unverified:'#6E6959'
}

function Fit({places}:{places:Place[]}){
 const map=useMap()
 useEffect(()=>{
  const pts=places.filter(p=>p.lat&&p.lng) as (Place&{lat:number,lng:number})[]
  if(!pts.length)return
  const lat=pts.map(p=>p.lat),lng=pts.map(p=>p.lng)
  if(pts.length===1) map.setView([pts[0].lat,pts[0].lng],15)
  else map.fitBounds([[Math.min(...lat),Math.min(...lng)],[Math.max(...lat),Math.max(...lng)]],{padding:[40,40],maxZoom:14})
 },[map,places])
 return null
}

function pin(p:Place){
 return divIcon({
  className:'',
  html:`<div style="width:38px;height:38px;border-radius:50%;background:${COLORS[p.status]};color:white;display:grid;place-items:center;font-weight:700">${p.name.slice(0,2)}</div>`,
  iconSize:[38,38],
  iconAnchor:[19,19]
 })
}

export function RealMap({places,onPlace,height=350}:{places:Place[],focusedId?:string|null,onPlace:(p:Place)=>void,height?:number}){
 const visible=places.filter(p=>p.lat&&p.lng&&p.decision!=='removed')
 return <div className="real-map-wrap carto-like-map" style={{height}}>
  <MapContainer center={[22.3193,114.1694]} zoom={12} style={{width:'100%',height:'100%'}} zoomControl={false} attributionControl={false}>
   <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
   <Fit places={visible}/>
   {visible.map(p=><Marker key={p.id} position={[p.lat!,p.lng!]} icon={pin(p)} eventHandlers={{click:()=>onPlace(p)}}>
    <Popup><strong>{p.name}</strong></Popup>
   </Marker>)}
  </MapContainer>
 </div>
}
