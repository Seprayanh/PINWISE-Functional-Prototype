// PINWISE Multi-City Image Binding v2
// This file replaces the previous binding-only version.
// Merge with existing place metadata if your branch contains more fields.

export const PLACE_IMAGE_BINDINGS = {
  Tokyo: {
    cover: "/images/tokyo-cover.jpg",
    places: {
      "Koffee Mameya": {
        image: "/images/koffee-mameya.jpg",
        evidenceImage: "/images/koffee-evidence.jpg",
      },
      "Senso-ji Temple": {
        image: "/images/sensoji.jpg",
        evidenceImage: "/images/sensoji-evidence.jpg",
      },
      "Ueno Park": {
        image: "/images/ueno-park.jpg",
        evidenceImage: "/images/ueno-evidence.jpg",
      },
    },
  },

  "Hong Kong": {
    cover: "/images/hongkong-cover.jpg",
    places: {
      "Victoria Peak": {
        image: "/images/victoria-peak.jpg",
        evidenceImage: "/images/victoria-evidence.jpg",
      },
      "M+ Museum": {
        image: "/images/m-plus.jpg",
        evidenceImage: "/images/m-plus-evidence.jpg",
      },
    },
  },
} as const
