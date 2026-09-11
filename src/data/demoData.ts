import type { ItineraryDay, Place, SourceItem } from '../types'

export const INITIAL_SOURCES: SourceItem[] = [
  { id: 1, title: 'Tokyo cafés worth saving', type: 'link', platform: 'Xiaohongshu', age: 'saved 2 days ago', url: 'https://www.xiaohongshu.com/' },
  { id: 2, title: 'Asakusa + Ueno route', type: 'link', platform: 'Xiaohongshu', age: 'saved last week', url: 'https://www.xiaohongshu.com/' },
  { id: 3, title: 'Shibuya dinner shortlist', type: 'screenshot', platform: 'Screenshot', age: 'added 1 month ago' },
  { id: 4, title: 'Omotesando coffee notes', type: 'screenshot', platform: 'Screenshot', age: 'added 2 months ago' },
  { id: 5, title: 'Tokyo food map', type: 'link', platform: 'Blog', age: 'saved 6 months ago', url: 'https://example.com/tokyo-food' },
  { id: 6, title: 'Restaurant A recommendation', type: 'link', platform: 'Xiaohongshu', age: 'saved 14 months ago', url: 'https://www.xiaohongshu.com/' },
]

export const INITIAL_PLACES: Place[] = [
  {
    id: 'koffee-mame', name: 'Koffee Mame', area: 'Omotesando', kind: 'Café', mentions: 2, selected: true,
    status: 'current', postAge: '2 months', confidence: 'High',
    savedInfo: 'Open 10:00–18:00 · walk-in queue', recentInfo: 'Current listing confirms 10:00–18:00',
    note: 'Compact specialty coffee stop with a short queue at peak time.', marker: { x: 28, y: 40 },
  },
  {
    id: 'sensoji', name: 'Senso-ji Temple', area: 'Asakusa', kind: 'Attraction', mentions: 3, selected: true,
    status: 'current', postAge: '3 weeks', confidence: 'High',
    savedInfo: 'Grounds open daily · main hall 06:00–17:00', recentInfo: 'No meaningful conflict found in recent sources.',
    note: 'Best visited early before the central walkway gets crowded.', marker: { x: 72, y: 25 },
  },
  {
    id: 'ueno', name: 'Ueno Park', area: 'Ueno', kind: 'Park', mentions: 2, selected: true,
    status: 'current', postAge: '1 month', confidence: 'High',
    savedInfo: 'Open all day · museums have separate hours', recentInfo: 'Current park access unchanged.',
    note: 'Pairs naturally with Asakusa on an east-Tokyo day.', marker: { x: 70, y: 44 },
  },
  {
    id: 'restaurant-a', name: 'Restaurant A', area: 'Shibuya', kind: 'Dinner', mentions: 2, selected: true,
    status: 'review', postAge: '14 months', confidence: 'High',
    savedInfo: 'Open daily · 10:00–22:00 · walk-in accepted', recentInfo: 'Recent evidence reports closing at 20:00 and reservations recommended.',
    note: 'This is the core freshness-verification example used in the study flow.', marker: { x: 39, y: 66 },
  },
  {
    id: 'daikanyama', name: 'Daikanyama Café', area: 'Daikanyama', kind: 'Café', mentions: 1, selected: false,
    status: 'unverified', postAge: '8 months', confidence: 'Medium',
    savedInfo: 'Open until 19:00', recentInfo: 'Freshness check not run yet.',
    note: 'A user-added alternative near Shibuya.', marker: { x: 34, y: 73 },
  },
  {
    id: 'shibuya', name: 'Shibuya Crossing', area: 'Shibuya', kind: 'Walk', mentions: 4, selected: true,
    status: 'current', postAge: '2 weeks', confidence: 'High',
    savedInfo: 'Best around sunset / evening', recentInfo: 'No practical conflict found.',
    note: 'Easy to pair with dinner in the same area.', marker: { x: 43, y: 60 },
  },
]

export const INITIAL_ITINERARY: ItineraryDay[] = [
  {
    id: 1, title: 'Day 1', area: 'West Tokyo', items: [
      { id: 'd1-1', time: '10:00', placeId: 'koffee-mame' },
      { id: 'd1-2', time: '14:00', placeId: 'shibuya' },
      { id: 'd1-3', time: '18:30', placeId: 'restaurant-a' },
    ],
  },
  {
    id: 2, title: 'Day 2', area: 'East Tokyo', items: [
      { id: 'd2-1', time: '09:30', placeId: 'sensoji' },
      { id: 'd2-2', time: '13:00', placeId: 'ueno' },
    ],
  },
]
