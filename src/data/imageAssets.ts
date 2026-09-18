export type ImageAsset = {
  cover: string
  thumbnail: string
  evidence: string
}

export const imageAssets: Record<string, ImageAsset> = {
  tokyo: {
    cover: "/images/tokyo/cover.png",
    thumbnail: "/images/tokyo/cover.png",
    evidence: "/images/tokyo/cover.png",
  },

  hongkong: {
    cover: "/images/hongkong/cover.png",
    thumbnail: "/images/hongkong/cover.png",
    evidence: "/images/hongkong/cover.png",
  },

  koffeeMameya: {
    cover: "/images/tokyo/koffee.png",
    thumbnail: "/images/tokyo/koffee.png",
    evidence: "/images/tokyo/koffee.png",
  },

  sensoJi: {
    cover: "/images/tokyo/sensoji.png",
    thumbnail: "/images/tokyo/sensoji.png",
    evidence: "/images/tokyo/sensoji.png",
  },

  uenoPark: {
    cover: "/images/tokyo/ueno.png",
    thumbnail: "/images/tokyo/ueno.png",
    evidence: "/images/tokyo/ueno.png",
  },

  victoriaPeak: {
    cover: "/images/hongkong/victoria-peak.png",
    thumbnail: "/images/hongkong/victoria-peak.png",
    evidence: "/images/hongkong/victoria-peak.png",
  },

  mPlus: {
    cover: "/images/hongkong/m-plus.png",
    thumbnail: "/images/hongkong/m-plus.png",
    evidence: "/images/hongkong/m-plus.png",
  },
}
