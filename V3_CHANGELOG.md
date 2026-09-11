# PINWISE v3 Multi-Trip Fixed

This patch is intended to be extracted over the existing PINWISE repository.

## Main fixes
- Replaces CARTO tiles with standard OpenStreetMap tiles (no API key required).
- Refactors app into `TripPlan[] + activePlanId`.
- Multiple trips coexist without overwriting one another.
- Home screen now shows a My Trips workspace with switching and deletion.
- Plan screen includes a trip switcher.
- Workspace persists to `localStorage` under `pinwise-plans-v1`.
- Every trip owns independent sources, places, freshness states, itinerary, and saved state.
- Stronger typography weights and higher-contrast status colors.
- Marker style now distinguishes included places from candidates.
- Freshness result explicitly supports Current / Needs Review / Outdated.
- Replace action only appears when a place has a linked `alternativeId`.
- Itinerary reorder preserves chronological time slots by swapping places, not timestamps.
- Repeated source analysis can continue generating demo candidate places.

## Overlay instructions
Extract this ZIP directly into the root of your existing local repository:
`D:\2606\HCI\team\figma0911\PINWISE_Functional_HiFi_Prototype`

Allow these files to overwrite the existing versions, then commit/push to GitHub.

The rest of the repository files are unchanged and should remain in place.
