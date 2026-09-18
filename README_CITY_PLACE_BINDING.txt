PINWISE City Place Dataset Binding Patch

Purpose:
Fix issue:
Hong Kong trip still shows Tokyo places.

Problem:
Map now receives Hong Kong destination correctly,
but places state still contains Tokyo dataset.

Files:
- CITY_PLACE_DATA.ts (add city mapping)
- App.tsx patch (switch places based on destination)

Expected result:

Input:
Hong Kong

↓

places:
Victoria Peak
M+ Museum
Tai Kwun

↓

Map:
Hong Kong

↓

Places:
Hong Kong locations
