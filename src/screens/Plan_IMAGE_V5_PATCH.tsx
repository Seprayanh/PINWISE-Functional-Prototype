/*
Integrate into existing Plan.tsx

Import:

import { TripCover } from '../components/TripCover'
import { imageAssets } from '../data/imageAssets'

Add near the page header:

<TripCover
 image={imageAssets.tokyo.cover}
 title="Tokyo Escape"
 subtitle="8 places · freshness checked"
/>

Do not replace:
- map rendering
- itinerary logic
- city selection
*/
