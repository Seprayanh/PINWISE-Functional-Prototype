import { useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { divIcon, type Map as LeafletMap } from 'leaflet'
import type { Place, FreshnessStatus } from '../types'

const STATUS_COLOR: Record<FreshnessStatus, string> = {
  current: '#1F6A50',
  review: '#D96800',
  outdated: '#9E2F24',
  unverified: '#6E6959',
}

const STATUS_LABEL: Record<FreshnessStatus, string> = {
  current: 'Current',
  review: 'Needs review',
  outdated: 'Outdated',
  unverified: 'Unverified',
}

function pinIcon(place: Place, focused: boolean) {
  const color = STATUS_COLOR[place.status]
  const initials = place.name.split(' ').map(s => s[0]).slice(0, 2).join('')
  const size = focused ? 46 : 40
  const fontSize = focused ? 12 : 11
  const selectedRing = place.selected && place.decision !== 'removed'
    ? `outline:4px solid #EBE3A7;outline-offset:2px;`
    : `opacity:.82;`
  const focusRing = focused ? `box-shadow:0 0 0 5px rgba(44,87,69,.18),0 5px 16px rgba(46,41,16,.30);` : ''

  return divIcon({
    className: '',
    html: `<div style="
      width:${size}px;height:${size}px;
      border-radius:50% 50% 50% 10px;
      transform:rotate(-45deg);
      background:${color};
      border:3px solid #fff;
      box-shadow:0 5px 16px rgba(46,41,16,.26);
      display:grid;place-items:center;
      ${selectedRing}${focusRing}
    "><span style="
      transform:rotate(45deg);
      color:#fff;font-size:${fontSize}px;font-weight:900;
      font-family:-apple-system,BlinkMacSystemFont,'SF Pro Text','Helvetica Neue',sans-serif;
      line-height:1;letter-spacing:-.02em;
    ">${initials}</span></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -(size / 2 + 8)],
  })
}

function FitBounds({ places }: { places: Place[] }) {
  const map = useMap()
  const fitted = useRef(false)
  useEffect(() => {
    const pts = places.filter(p => p.lat && p.lng) as (Place & { lat: number; lng: number })[]
    if (!pts.length || fitted.current) return
    fitted.current = true
    if (pts.length === 1) map.setView([pts[0].lat, pts[0].lng], 15)
    else {
      const lats = pts.map(p => p.lat), lngs = pts.map(p => p.lng)
      map.fitBounds(
        [[Math.min(...lats), Math.min(...lngs)], [Math.max(...lats), Math.max(...lngs)]],
        { padding: [48, 48], maxZoom: 14 }
      )
    }
  }, [map, places])
  return null
}

function SyncBounds({ places }: { places: Place[] }) {
  const map = useMap()
  const prevCount = useRef(places.length)
  useEffect(() => {
    if (places.length === prevCount.current) return
    prevCount.current = places.length
    const pts = places.filter(p => p.lat && p.lng) as (Place & { lat: number; lng: number })[]
    if (pts.length < 2) return
    const lats = pts.map(p => p.lat), lngs = pts.map(p => p.lng)
    map.fitBounds(
      [[Math.min(...lats), Math.min(...lngs)], [Math.max(...lats), Math.max(...lngs)]],
      { padding: [48, 48], maxZoom: 14, animate: true }
    )
  }, [map, places])
  return null
}

type RealMapProps = {
  places: Place[]
  focusedId?: string | null
  onPlace: (p: Place) => void
  height?: number
}

export function RealMap({ places, focusedId, onPlace, height = 350 }: RealMapProps) {
  const mapRef = useRef<LeafletMap | null>(null)
  const visible = places.filter(p => p.lat && p.lng && p.decision !== 'removed')

  return (
    <div className="real-map-wrap" style={{ height }}>
      <MapContainer
        ref={mapRef}
        center={[35.690, 139.745]}
        zoom={13}
        style={{ width: '100%', height: '100%' }}
        zoomControl={false}
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
          maxZoom={19}
        />
        <FitBounds places={visible} />
        <SyncBounds places={visible} />
        {visible.map(p => (
          <Marker
            key={p.id}
            position={[p.lat!, p.lng!]}
            icon={pinIcon(p, focusedId === p.id)}
            eventHandlers={{ click: () => onPlace(p) }}
          >
            <Popup className="pinwise-popup" closeButton={false}>
              <div className="pinwise-popup-inner">
                <strong>{p.name}</strong>
                <span style={{ color: STATUS_COLOR[p.status] }}>{STATUS_LABEL[p.status]}</span>
                <em>{p.selected ? 'Included' : 'Candidate'} · {p.area} · {p.kind}</em>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <div className="real-map-attr">&copy; OpenStreetMap contributors</div>
    </div>
  )
}
