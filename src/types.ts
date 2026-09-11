export type Tab = 'home' | 'sources' | 'plan' | 'settings'
export type PlanView = 'map' | 'places' | 'itinerary'
export type FreshnessStatus = 'current' | 'review' | 'outdated' | 'unverified'
export type StudyCondition = 'aggregation' | 'freshness'
export type PlaceDecision = 'candidate' | 'kept' | 'removed' | 'review' | 'replaced'
export type OptimizeMode = 'preserve' | 'suggest'

export type TripMeta = {
  id: string
  destination: string
  startDate: string
  endDate: string
  saved: boolean
}

export type SourceItem = {
  id: number
  title: string
  type: 'link' | 'screenshot'
  platform: string
  age: string
  url?: string
  preview?: string
  analyzed?: boolean
}

export type EvidenceItem = {
  id: string
  source: string
  age: string
  text: string
  tone: 'current' | 'old' | 'conflict'
}

export type Place = {
  id: string
  name: string
  area: string
  kind: string
  mentions: number
  selected: boolean
  decision: PlaceDecision
  status: FreshnessStatus
  postAge: string
  confidence: 'High' | 'Medium' | 'Low'
  savedInfo: string
  recentInfo: string
  note: string
  marker: { x: number; y: number }
  lat?: number
  lng?: number
  lastChecked?: string
  evidence?: EvidenceItem[]
  alternativeId?: string
}

export type ItineraryItem = {
  id: string
  time: string
  placeId: string
}

export type ItineraryDay = {
  id: number
  title: string
  area: string
  items: ItineraryItem[]
}

export type ConflictIssue = {
  id: string
  type: 'hours' | 'travel' | 'overlap' | 'freshness'
  severity: 'warning' | 'info'
  title: string
  detail: string
}

export type TripPlan = {
  id: string
  meta: TripMeta
  sources: SourceItem[]
  places: Place[]
  itinerary: ItineraryDay[]
  finalized: boolean
  updatedAt: string
}
