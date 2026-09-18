import type { ItineraryDay, Place, SourceItem, TripMeta } from '../types'

export const INITIAL_TRIP: TripMeta = {
  id: 'tokyo-apr', destination: 'Tokyo', startDate: '2027-04-18', endDate: '2027-04-21', saved: false,
}

export const INITIAL_SOURCES: SourceItem[] = [
  { id: 1, title: 'Tokyo cafés worth saving', type: 'link', platform: 'Xiaohongshu', age: 'saved 2 days ago', url: 'https://www.xiaohongshu.com/', analyzed: true },
  { id: 2, title: 'Asakusa + Ueno route', type: 'link', platform: 'Xiaohongshu', age: 'saved last week', url: 'https://www.xiaohongshu.com/', analyzed: true },
  { id: 3, title: 'Shibuya dinner shortlist', type: 'screenshot', platform: 'Screenshot', age: 'added 1 month ago', analyzed: true },
  { id: 4, title: 'Omotesando coffee notes', type: 'screenshot', platform: 'Screenshot', age: 'added 2 months ago', analyzed: true },
  { id: 5, title: 'Tokyo food map', type: 'link', platform: 'Blog', age: 'saved 6 months ago', url: 'https://example.com/tokyo-food', analyzed: true },
  { id: 6, title: 'Restaurant A recommendation', type: 'link', platform: 'Xiaohongshu', age: 'saved 14 months ago', url: 'https://www.xiaohongshu.com/', analyzed: true },
]

const ev = (id:string, source:string, age:string, text:string, tone:'current'|'old'|'conflict') => ({id,source,age,text,tone})

export const INITIAL_PLACES: Place[] = [
  {
    id:'koffee-mame', name:'Koffee Mame', area:'Omotesando', kind:'Café', mentions:2, image:'/images/tokyo/koffee.png', selected:true, decision:'kept',
    status:'current', postAge:'2 months', confidence:'High',
    savedInfo:'Open 10:00–18:00 · walk-in queue', recentInfo:'Current listing confirms 10:00–18:00',
    note:'Compact specialty coffee stop with a short queue at peak time.',
    marker:{x:28,y:40}, lat:35.6700, lng:139.7105,
    lastChecked:'today',
    evidence:[ev('km1','Official listing','2 days ago','Open 10:00–18:00. Walk-in queue remains available.','current')],
  },
  {
    id:'sensoji', name:'Senso-ji Temple', area:'Asakusa', kind:'Attraction', mentions:3, image:'/images/tokyo/sensoji.png', selected:true, decision:'kept',
    status:'current', postAge:'3 weeks', confidence:'High',
    savedInfo:'Grounds open daily · main hall 06:00–17:00', recentInfo:'No meaningful conflict found in recent sources.',
    note:'Best visited early before the central walkway gets crowded.',
    marker:{x:72,y:25}, lat:35.7147, lng:139.7967,
    lastChecked:'today',
    evidence:[ev('se1','Official temple site','1 day ago','Main hall hours remain 06:00–17:00.','current')],
  },
  {
    id:'ueno', name:'Ueno Park', area:'Ueno', kind:'Park', mentions:2, image:'/images/tokyo/ueno.png', selected:true, decision:'kept',
    status:'current', postAge:'1 month', confidence:'High',
    savedInfo:'Open all day · museums have separate hours', recentInfo:'Current park access unchanged.',
    note:'Pairs naturally with Asakusa on an east-Tokyo day.',
    marker:{x:70,y:44}, lat:35.7141, lng:139.7733,
    lastChecked:'today',
    evidence:[ev('ue1','Tokyo parks listing','4 days ago','Park grounds remain continuously accessible.','current')],
  },
  {
    id:'restaurant-a', name:'Restaurant A', area:'Shibuya', kind:'Dinner', mentions:2, image:'/images/tokyo/cover.png', selected:true, decision:'review',
    status:'review', postAge:'14 months', confidence:'High',
    savedInfo:'Open daily · 10:00–22:00 · walk-in accepted', recentInfo:'Recent evidence reports closing at 20:00 and reservations recommended.',
    note:'This is the core freshness-verification example used in the study flow.',
    marker:{x:39,y:66}, lat:35.6617, lng:139.7041,
    evidence:[
      ev('ra1','Official listing','3 days ago','Hours now end at 20:00. Reservations recommended.','conflict'),
      ev('ra2','Recent review','1 week ago','Walk-ins were turned away after 19:00.','conflict'),
      ev('ra3','Saved Xiaohongshu post','14 months ago','Open until 22:00; walk-ins accepted.','old'),
    ],
  },
  {
    id:'daikanyama', name:'Daikanyama Café', area:'Daikanyama', kind:'Café', mentions:1, image:'/images/tokyo/cover.png', selected:false, decision:'candidate',
    status:'unverified', postAge:'8 months', confidence:'Medium',
    savedInfo:'Open until 19:00', recentInfo:'Recent listing confirms 11:00–19:00.',
    note:'A nearby user-selectable alternative with current practical info.',
    marker:{x:34,y:73}, lat:35.6488, lng:139.7026,
    evidence:[ev('dk1','Official listing','2 days ago','Open 11:00–19:00.','current')],
  },
  {
    id:'shibuya', name:'Shibuya Crossing', area:'Shibuya', kind:'Walk', mentions:4, image:'/images/tokyo/cover.png', selected:true, decision:'kept',
    status:'current', postAge:'2 weeks', confidence:'High',
    savedInfo:'Best around sunset / evening', recentInfo:'No practical conflict found.',
    note:'Easy to pair with dinner in the same area.',
    marker:{x:43,y:60}, lat:35.6595, lng:139.7004,
    lastChecked:'today',
    evidence:[ev('sh1','Recent guide','5 days ago','Access remains unrestricted.','current')],
  },
]

export const EXTRACTED_BATCH: Place[] = [
  {
    id:'meiji', name:'Meiji Jingu', area:'Harajuku', kind:'Attraction', mentions:2, image:'/images/tokyo/cover.png', selected:false, decision:'candidate',
    status:'unverified', postAge:'just added', confidence:'Medium',
    savedInfo:'Forest shrine near Harajuku', recentInfo:'Not checked yet.',
    note:'Extracted from a newly added source.',
    marker:{x:26,y:52}, lat:35.6763, lng:139.6993,
  },
  {
    id:'teamLab', name:'teamLab Borderless', area:'Azabudai', kind:'Museum', mentions:1, image:'/images/tokyo/cover.png', selected:false, decision:'candidate',
    status:'unverified', postAge:'just added', confidence:'Medium',
    savedInfo:'Timed-entry digital art museum', recentInfo:'Not checked yet.',
    note:'Extracted from a newly added source.',
    marker:{x:49,y:48}, lat:35.6563, lng:139.7394,
  },
]

export const INITIAL_ITINERARY: ItineraryDay[] = [
  { id:1, title:'Day 1', area:'West Tokyo', items:[
    {id:'d1-1', time:'10:00', placeId:'koffee-mame'},
    {id:'d1-2', time:'14:00', placeId:'shibuya'},
    {id:'d1-3', time:'20:30', placeId:'restaurant-a'},
  ]},
  { id:2, title:'Day 2', area:'East Tokyo', items:[
    {id:'d2-1', time:'09:30', placeId:'sensoji'},
    {id:'d2-2', time:'13:00', placeId:'ueno'},
  ]},
]


export const HONGKONG_TRIP: TripMeta = {
  id:'hongkong-trip',
  destination:'Hong Kong',
  startDate:'2027-05-10',
  endDate:'2027-05-14',
  saved:false,
}

export const HONGKONG_PLACES: Place[] = [
  {
    id:'victoria-peak',
    name:'Victoria Peak',
    image:'/images/hongkong/victoria-peak.png',
    area:'Central',
    kind:'Attraction',
    mentions:4,
    selected:true,
    decision:'kept',
    status:'current',
    postAge:'3 weeks',
    confidence:'High',
    savedInfo:'Peak Tram access available · best sunset view',
    recentInfo:'Current transport information confirms operation hours',
    note:'Popular viewpoint with changing crowd conditions.',
    marker:{x:55,y:25},
    lat:22.2759,
    lng:114.1455,
    lastChecked:'today',
    evidence:[ev('vp1','Official Peak Tram','2 days ago','Service hours remain updated.','current')],
  },
  {
    id:'mplus',
    name:'M+ Museum',
    image:'/images/hongkong/m-plus.png',
    area:'West Kowloon',
    kind:'Museum',
    mentions:3,
    selected:true,
    decision:'review',
    status:'review',
    postAge:'8 months',
    confidence:'High',
    savedInfo:'Open until 22:00 on weekends',
    recentInfo:'Current schedule shows different closing hours',
    note:'Museum exhibitions and opening hours frequently change.',
    marker:{x:42,y:48},
    lat:22.3018,
    lng:114.0365,
    evidence:[
      ev('mplus1','Official museum site','1 day ago','Opening hours changed after exhibition update.','conflict'),
      ev('mplus2','Saved Xiaohongshu post','8 months ago','Weekend opening until 22:00.','old')
    ],
  },
  {
    id:'tai-kwun',
    name:'Tai Kwun',
    image:'/images/hongkong/cover.png',
    area:'Central',
    kind:'Culture',
    mentions:2,
    selected:false,
    decision:'candidate',
    status:'unverified',
    postAge:'just added',
    confidence:'Medium',
    savedInfo:'Historic compound with exhibitions',
    recentInfo:'Not checked yet.',
    note:'New candidate extracted from travel sources.',
    marker:{x:62,y:40},
    lat:22.2819,
    lng:114.1542,
  }
]
