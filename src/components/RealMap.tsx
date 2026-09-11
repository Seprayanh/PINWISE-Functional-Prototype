import { useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { divIcon, type Map as LeafletMap } from 'leaflet'
import type { Place, FreshnessStatus } from '../types'

const STATUS_COLOR: Record<FreshnessStatus, string> = {
  current:    '#2C5745',
  review:     '#EB7D00',
  outdated:   '#8E3B2F',
  unverified: '#8B8676',
}

const STATUS_LABEL: Record<FreshnessStatus, string> = {
  current:    'Current',
  review:     'Needs review',
  outdated:   'Outdated',
  unverified: 'Unverified',
}

function pinIcon(place: Place, focused: boolean) {
  const color = STATUS_COLOR[place.status]
  const initials = place.name.split(' ').map(s => s[0]).slice(0, 2).join('')
  const size = focused ? 44 : 38
  const fontSize = focused ? 11 : 10
  const ring = focused ? `outline:3px solid ${color}55;outline-offset:2px;` : ''
  return divIcon({
    className: '',
    html: `<div style="
      width:${size}px;height:${size}px;
      border-radius:50% 50% 50% 10px;
      transform:rotate(-45deg);
      background:${color};
      border:2.5px solid #fff;
      box-shadow:0 4px 14px rgba(46,41,16,.28);
      display:grid;place-items:center;
      transition:all .15s;
      ${ring}
    "><span style="
      transform:rotate(45deg);
      color:#fff;font-size:${fontSize}px;font-weight:800;
      font-family:-apple-system,BlinkMacSystemFont,'SF Pro Text','Helvetica Neue',sans-serif;
      line-height:1;letter-spacing:-.01em;
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
    if (pts.length === 1) {
      map.setView([pts[0].lat, pts[0].lng], 15)
    } else {
      const lats = pts.map(p => p.lat)
      const lngs = pts.map(p => p.lng)
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
    const lats = pts.map(p => p.lat)
    const lngs = pts.map(p => p.lng)
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
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          subdomains="abcd"
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
                <span style={{ color: STATUS_COLOR[p.status] }}>
                  {STATUS_LABEL[p.status]}
                </span>
                <em>{p.area} · {p.kind}</em>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <div className="real-map-attr">
        &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions" target="_blank" rel="noreferrer">CARTO</a>
      </div>
    </div>
  )
}
