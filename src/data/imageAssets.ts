import { imageImports } from "./imageImports";

export type ImageAsset = {
  cover: string;
  thumbnail: string;
  evidence: string;
};

export const imageAssets: Record<string, ImageAsset> = {
  tokyo: {
    cover: imageImports.Tokyo.cover,
    thumbnail: imageImports.Tokyo.cover,
    evidence: imageImports.Tokyo.cover,
  },
  hongkong: {
    cover: imageImports.HongKong.cover,
    thumbnail: imageImports.HongKong.cover,
    evidence: imageImports.HongKong.cover,
  },
  koffeeMameya: {
    cover: imageImports.Tokyo.places["Koffee Mame"],
    thumbnail: imageImports.Tokyo.places["Koffee Mame"],
    evidence: imageImports.Tokyo.places["Koffee Mame"],
  },
  sensoJi: {
    cover: imageImports.Tokyo.places["Senso-ji Temple"],
    thumbnail: imageImports.Tokyo.places["Senso-ji Temple"],
    evidence: imageImports.Tokyo.places["Senso-ji Temple"],
  },
  uenoPark: {
    cover: imageImports.Tokyo.places["Ueno Park"],
    thumbnail: imageImports.Tokyo.places["Ueno Park"],
    evidence: imageImports.Tokyo.places["Ueno Park"],
  },
  victoriaPeak: {
    cover: imageImports.HongKong.places["Victoria Peak"],
    thumbnail: imageImports.HongKong.places["Victoria Peak"],
    evidence: imageImports.HongKong.places["Victoria Peak"],
  },
  mPlus: {
    cover: imageImports.HongKong.places["M+ Museum"],
    thumbnail: imageImports.HongKong.places["M+ Museum"],
    evidence: imageImports.HongKong.places["M+ Museum"],
  },
};
