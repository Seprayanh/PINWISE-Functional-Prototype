// PINWISE Multi-City Place Data + Image Binding
// Compatible with App.tsx imports


import {
  INITIAL_PLACES,
  HONGKONG_PLACES
} from "./demoData";


// Main city place mapping
export const CITY_PLACE_DATA = {

  Tokyo: INITIAL_PLACES,
  tokyo: INITIAL_PLACES,

  "Hong Kong": HONGKONG_PLACES,
  HongKong: HONGKONG_PLACES,
  hongkong: HONGKONG_PLACES,

};


// Image binding layer
export const PLACE_IMAGE_BINDINGS = {

  Tokyo: {

    cover: "/images/tokyo/cover.png",

    places: {

      "Koffee Mame": {
        image: "/images/tokyo/koffee.png",
        evidenceImage: "/images/tokyo/koffee.png",
      },

      "Koffee Mameya": {
        image: "/images/tokyo/koffee.png",
        evidenceImage: "/images/tokyo/koffee.png",
      },

      "Senso-ji Temple": {
        image: "/images/tokyo/sensoji.png",
        evidenceImage: "/images/tokyo/sensoji.png",
      },

      "Senso-ji": {
        image: "/images/tokyo/sensoji.png",
        evidenceImage: "/images/tokyo/sensoji.png",
      },

      "Ueno Park": {
        image: "/images/tokyo/ueno.png",
        evidenceImage: "/images/tokyo/ueno.png",
      },

    }

  },


  "Hong Kong": {

    cover: "/images/hongkong/cover.png",

    places: {

      "Victoria Peak": {
        image: "/images/hongkong/victoria-peak.png",
        evidenceImage: "/images/hongkong/victoria-peak.png",
      },

      "M+ Museum": {
        image: "/images/hongkong/m-plus.png",
        evidenceImage: "/images/hongkong/m-plus.png",
      },

    }

  }

} as const;