import type { Place } from '../types'
import { Badge } from './UI'
import { IconChevron } from './Icons'

export function PlaceCard({ place, onOpen, onToggle, compact=false }: { place: Place; onOpen: () => void; onToggle?: () => void; compact?: boolean }) {
  return <article className={`place-card ${compact ? 'compact' : ''}`}>
    <button className="place-card-main" onClick={onOpen}>
      <div className="place-avatar">{place.name.split(' ').map(s=>s[0]).slice(0,2).join('')}</div>
      <div className="place-copy"><div className="place-title-row"><strong>{place.name}</strong><Badge status={place.status}/></div><span>{place.area} · {place.kind} · {place.mentions} source{place.mentions === 1 ? '' : 's'}</span>{!compact && <p>{place.note}</p>}</div><IconChevron/>
    </button>
    {onToggle && <button className={`select-button ${place.selected ? 'selected' : ''}`} onClick={onToggle}>{place.selected ? 'Included' : 'Add to trip'}</button>}
  </article>
}
