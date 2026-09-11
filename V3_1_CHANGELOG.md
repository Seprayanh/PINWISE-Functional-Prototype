# PINWISE v3.1 Workspace Fix

## Product logic
- `My Trips` is now the real app-level home.
- Users open/select a trip before entering its workspace.
- Inside a trip workspace, a persistent `← My Trips` control and destination header are shown.
- Removed the native Plan trip `<select>`.
- Trip switching now happens by returning to My Trips and opening another trip.
- Added a dedicated Trip Overview screen.

## Data / persistence
- Keeps multi-trip independent state and `localStorage`.
- Migrates an old empty Tokyo plan (0 sources + 0 places) back to the full Tokyo demo.
- Tokyo demo restores the original sample sources, places and 2-day itinerary.

## UI
- Replaced native `window.confirm` deletion with a PINWISE in-app delete sheet.
- Keeps no-key OpenStreetMap tiles but applies a soft, low-saturation CARTO-like treatment.
- Keeps the stronger typography and higher-contrast status treatment from v3.

## Navigation
My Trips -> Open Trip -> Trip Overview -> Sources / Plan / Freshness / Settings -> Back to My Trips
