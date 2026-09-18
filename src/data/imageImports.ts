// PINWISE Vite Image Import System v1
// Assets are imported through Vite for Figma Make compatibility.

import tokyoCover from "../assets/images/tokyo/cover.png";
import koffee from "../assets/images/tokyo/koffee.png";
import sensoJi from "../assets/images/tokyo/sensoji.png";
import ueno from "../assets/images/tokyo/ueno.png";

import hongkongCover from "../assets/images/hongkong/cover.png";
import victoriaPeak from "../assets/images/hongkong/victoria-peak.png";
import mPlus from "../assets/images/hongkong/m-plus.png";

export const imageImports = {
  Tokyo: {
    cover: tokyoCover,
    places: {
      "Koffee Mame": koffee,
      "Koffee Mameya": koffee,
      "Senso-ji Temple": sensoJi,
      "Senso-ji": sensoJi,
      "Ueno Park": ueno,
    },
  },
  HongKong: {
    cover: hongkongCover,
    places: {
      "Victoria Peak": victoriaPeak,
      "M+ Museum": mPlus,
    },
  },
};
