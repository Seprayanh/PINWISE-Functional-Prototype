import type { Place, PlaceDecision } from '../types'
import { Badge } from './UI'
import { IconChevron } from './Icons'
import { DecisionBar } from './DecisionBar'
import { ConfidenceMeter } from './ConfidenceMeter'

export function PlaceCard({place,onOpen,onDecision,compact=false}:{place:Place;onOpen:()=>void;onDecision?:(decision:PlaceDecision)=>void;compact?:boolean}) {
 return <article className={`place-card ${compact?'compact':''} decision-${place.decision}`}>
  <button className="place-card-main" onClick={onOpen}>
   <div className="place-avatar">{place.name.split(' ').map(s=>s[0]).slice(0,2).join('')}</div>
   <div className="place-copy">
    <div className="place-title-row"><strong>{place.name}</strong><Badge status={place.status}/></div>
    <span>{place.area} · {place.kind} · {place.mentions} source{place.mentions===1?'':'s'}</span>
    {!compact && <p>{place.note}</p>}
    {!compact && <ConfidenceMeter confidence={place.confidence}/>}
   </div>
   <IconChevron/>
  </button>
  {onDecision && <DecisionBar decision={place.decision} onChange={onDecision}/>}
 </article>
}
