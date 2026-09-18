PINWISE Plan city binding patch

Purpose:
Fix the remaining issue where Hong Kong trips still show Tokyo map.

Reason:
RealMap now supports city-based positioning, but Plan.tsx was not passing destination.

Replace the RealMap usage in:
src/screens/Plan.tsx

Change:
<RealMap places={places} onPlace={onPlace} height={350}/>

To:
<RealMap
  places={places}
  city={destination}
  onPlace={onPlace}
  height={350}
/>

Git commands:
git add src/screens/Plan.tsx
git commit -m "Pass destination city to map component"
git push origin main
