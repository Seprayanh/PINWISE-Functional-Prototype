/*
 Integration guide for Plan.tsx

 Add:

 import { TripCover } from '../components/TripCover'
 import { imageAssets } from '../data/imageAssets'

 Then inside Plan header:

 <TripCover
   image={imageAssets.tokyo.cover}
   title="Tokyo Escape"
   subtitle="8 places · freshness checked"
 />

 This keeps existing trip logic unchanged.
*/
