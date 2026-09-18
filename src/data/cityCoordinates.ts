export type CityCoordinate = {
  lat:number
  lng:number
  zoom:number
}

export const CITY_COORDINATES:Record<string,CityCoordinate> = {
  Tokyo:{
    lat:35.6762,
    lng:139.6503,
    zoom:12
  },
  tokyo:{
    lat:35.6762,
    lng:139.6503,
    zoom:12
  },
  HongKong:{
    lat:22.3193,
    lng:114.1694,
    zoom:12
  },
  hongkong:{
    lat:22.3193,
    lng:114.1694,
    zoom:12
  },
  "Hong Kong":{
    lat:22.3193,
    lng:114.1694,
    zoom:12
  },
  London:{
    lat:51.5074,
    lng:-0.1278,
    zoom:12
  },
  Paris:{
    lat:48.8566,
    lng:2.3522,
    zoom:12
  }
}
