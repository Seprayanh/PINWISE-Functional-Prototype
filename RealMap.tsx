import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { divIcon } from 'leaflet'
import type { Place, FreshnessStatus } from '../types'
import { CITY_COORDINATES } from '../data/cityCoordinates'

const STATUS_COLOR:Record<FreshnessStatus,string>={
 current:'#1F6A50',
 review:'#D96800',
 outdated:'#9E2F24',
 unverified:'#6E6959'
}

function AutoFit({places,city}:{places:Place[],city?:string}){
 const map=useMap()

 useEffect(()=>{
   const pts=places.filter(p=>p.lat&&p.lng) as (Place & {lat:number,lng:number})[]

   if(pts.length){
     const lat=pts.map(p=>p.lat)
     const lng=pts.map(p=>p.lng)

     if(pts.length===1){
       map.setView([pts[0].lat,pts[0].lng],15)
     }else{
       map.fitBounds(
        [
          [Math.min(...lat),Math.min(...lng)],
          [Math.max(...lat),Math.max(...lng)]
        ],
        {padding:[40,40],maxZoom:14}
       )
     }
     return
   }

   const fallback=CITY_COORDINATES[city || 'Tokyo']
   if(fallback){
     map.setView(
       [fallback.lat,fallback.lng],
       fallback.zoom
     )
   }
 },[map,places,city])

 return null
}

function createIcon(place:Place){
 return divIcon({
   className:'',
   html:`<div style="width:38px;height:38px;border-radius:50%;background:${STATUS_COLOR[place.status]};color:white;display:grid;place-items:center;font-weight:700;border:3px solid white">${place.name.slice(0,2)}</div>`,
   iconSize:[38,38],
   iconAnchor:[19,19]
 })
}

export function RealMap({
 places,
 city,
 onPlace,
 height=350
}:{
 places:Place[]
 city?:string
 onPlace:(p:Place)=>void
 height?:number
}){

 const visible=places.filter(
   p=>p.lat&&p.lng&&p.decision!=='removed'
 )

 return <div className="real-map-wrap carto-like-map map-layer" style={{height}}>
  <MapContainer
   center={[35.6762,139.6503]}
   zoom={12}
   style={{width:'100%',height:'100%'}}
   zoomControl={false}
   attributionControl={false}
  >
   <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
   <AutoFit places={visible} city={city}/>

   {
    visible.map(p=>
      <Marker
       key={p.id}
       position={[p.lat!,p.lng!]}
       icon={createIcon(p)}
       eventHandlers={{click:()=>onPlace(p)}}
      >
       <Popup><strong>{p.name}</strong></Popup>
      </Marker>
    )
   }
  </MapContainer>
 </div>
}
