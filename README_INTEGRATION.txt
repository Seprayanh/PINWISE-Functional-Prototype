PINWISE HiFi Interaction Integration Patch

Purpose:
Integrate previously created AI transparency components into actual user flows.

Files:
- src/components/PlaceCard.tsx
- src/screens/FreshnessFlow.tsx

Changes:
1. PlaceCard
   - Replace duplicated decision buttons.
   - Use DecisionBar.

2. FreshnessFlow
   - Replace Saved vs Recent text comparison.
   - Use InformationDiff.
   - Add ConfidenceMeter.
   - Use DecisionBar for final decisions.

After integration:

git add .
git commit -m "Integrate AI transparency components into user flow"
git push origin main
