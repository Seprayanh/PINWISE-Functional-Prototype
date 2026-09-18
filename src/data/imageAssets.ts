export type ImageAsset = {
  cover: string
  thumbnail: string
  evidence?: string
}

export const imageAssets: Record<string, ImageAsset> = {
  hongkong: {
    cover: "/images/hongkong-cover.jpg",
    thumbnail: "/images/hongkong-cover.jpg",
    evidence: "/images/hongkong-evidence.jpg",
  },

  tokyo: {
    cover: "/images/tokyo-cover.jpg",
    thumbnail: "/images/tokyo-cover.jpg",
    evidence: "/images/tokyo-evidence.jpg",
  },

  koffeeMameya: {
    cover: "/images/koffee-mameya.jpg",
    thumbnail: "/images/koffee-mameya.jpg",
    evidence: "/images/koffee-evidence.jpg",
  },

  sensoJi: {
    cover: "/images/sensoji.jpg",
    thumbnail: "/images/sensoji.jpg",
    evidence: "/images/sensoji-evidence.jpg",
  },

  uenoPark: {
    cover: "/images/ueno-park.jpg",
    thumbnail: "/images/ueno-park.jpg",
    evidence: "/images/ueno-evidence.jpg",
  },

  victoriaPeak: {
    cover: "/images/victoria-peak.jpg",
    thumbnail: "/images/victoria-peak.jpg",
    evidence: "/images/victoria-evidence.jpg",
  },

  mPlus: {
    cover: "/images/m-plus.jpg",
    thumbnail: "/images/m-plus.jpg",
    evidence: "/images/m-plus-evidence.jpg",
  },
}
