export type ImageAsset = {
  cover: string
  thumbnail: string
  evidence?: string
}

export const imageAssets: Record<string, ImageAsset> = {
  hongkong: {
    cover:
      "https://images.unsplash.com/photo-1536599018102-9f803c4f7c1b",
    thumbnail:
      "https://images.unsplash.com/photo-1536599018102-9f803c4f7c1b",
    evidence:
      "https://images.unsplash.com/photo-1519501025264-65ba15a82390",
  },

  tokyo: {
    cover:
      "https://cdn.prod.website-files.com/6865cdc559f013614975d0bc/68cc418d22152a24dc3ec04b_02_escorted_tours_528707295.jpg",
    thumbnail:
      "https://tblg.k-img.com/restaurant/images/Rvw/167336/640x640_rect_f3d8222e1605dfd98bae605873855971.jpg",
  },

  koffeeMameya: {
    cover:
      "https://tblg.k-img.com/restaurant/images/Rvw/167336/640x640_rect_f3d8222e1605dfd98bae605873855971.jpg",
    thumbnail:
      "https://tblg.k-img.com/restaurant/images/Rvw/167336/640x640_rect_f3d8222e1605dfd98bae605873855971.jpg",
  },

  sensoJi: {
    cover:
      "https://cdn.prod.website-files.com/6865cdc559f013614975d0bc/68cc418d22152a24dc3ec04b_02_escorted_tours_528707295.jpg",
    thumbnail:
      "https://cdn.prod.website-files.com/6865cdc559f013614975d0bc/68cc418d22152a24dc3ec04b_02_escorted_tours_528707295.jpg",
  },
}
