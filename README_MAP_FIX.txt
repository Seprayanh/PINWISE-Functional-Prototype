Replace src/components/RealMap.tsx

Fixes:
- Removes hard-coded Tokyo center.
- Uses current trip coordinates.
- Automatically fits map bounds for Hong Kong/Tokyo/other cities.

Git:
git add .
git commit -m "Fix dynamic map center for multi-city trips"
git push origin main
