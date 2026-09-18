# PINWISE Visual Polish v5 Final Integration

Final goal:
Move from component preparation to real application integration.

Integrated targets:

- types.ts
  - image fields

- main.tsx
  - image enhancement stylesheet loading

- CITY_PLACE_DATA.ts
  - image data binding

- Plan.tsx
  - Trip cover visualization

- FreshnessFlow.tsx
  - evidence image visualization

After integration:
Remove obsolete PATCH files.

Expected final structure:

src/
├ components/
│  ├ TripCover.tsx
│  ├ EvidencePreview.tsx
│  └ ImageThumbnail.tsx
├ data/
│  └ CITY_PLACE_DATA.ts
├ screens/
│  ├ Plan.tsx
│  └ FreshnessFlow.tsx
├ types.ts
└ main.tsx
