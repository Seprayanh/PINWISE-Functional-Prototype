// Add city based place mapping in demoData.ts or create a new file.

import { INITIAL_PLACES, HONGKONG_PLACES } from './demoData'

export const CITY_PLACE_DATA = {
  Tokyo: INITIAL_PLACES,
  tokyo: INITIAL_PLACES,

  "Hong Kong": HONGKONG_PLACES,
  HongKong: HONGKONG_PLACES,
  hongkong: HONGKONG_PLACES,
}


// Image bindings for visual enhancement
export const CITY_IMAGE_BINDINGS = {
  Tokyo: {
    cover: '/images/tokyo-cover.jpg',
    places: {
      'Koffee Mameya': '/images/koffee-mameya.jpg',
      'Senso-ji': '/images/sensoji.jpg',
    }
  },
  'Hong Kong': {
    cover: '/images/hongkong-cover.jpg',
    places: {}
  }
}
