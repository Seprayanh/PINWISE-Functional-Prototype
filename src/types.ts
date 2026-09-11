export type Tab = 'home' | 'sources' | 'plan' | 'settings'
export type PlanView = 'map' | 'places' | 'itinerary'
export type FreshnessStatus = 'current' | 'review' | 'outdated' | 'unverified'
export type StudyCondition = 'aggregation' | 'freshness'

export type SourceItem = {
  id: number
  title: string
  type: 'link' | 'screenshot'
  platform: string
  age: string
  url?: string
  preview?: string
}

export type Place = {
  id: string
  name: string
  area: string
  kind: string
  mentions: number
  selected: boolean
  status: FreshnessStatus
  postAge: string
  confidence: 'High' | 'Medium' | 'Low'
  savedInfo: string
  recentInfo: string
  note: string
  marker: { x: number; y: number }
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
