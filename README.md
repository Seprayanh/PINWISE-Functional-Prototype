# PINWISE · Functional Hi‑Fi Prototype

A stateful, interactive React + TypeScript + Vite prototype based on the PINWISE HCI project and the iPhone 14 Pro high‑fidelity visual direction.

## Product principle

**AI organizes → AI verifies → You decide.**

This prototype preserves user agency: AI can surface freshness conflicts and reorganize logistics, but it does not automatically remove user-selected places.

## Functional interactions included

- Four-tab app shell: **Home / Sources / Plan / Settings**
- Paste travel links and add local screenshot files
- Delete sources and see source count update
- Simulated AI extraction with real loading/progress state
- Map / Places / Itinerary segmented views
- Select/deselect candidate places
- Open place details and run a multi-step freshness check
- Compare recent evidence against an older saved post
- **Keep / Replace** decision for flagged information
- Replacing Restaurant A updates the itinerary to a verified alternative
- Add/remove/reorder itinerary items
- Simulated AI route re-optimization that preserves user edits
- Conflict/timing check
- Final itinerary save state
- Settings toggles
- Research **Condition A (aggregation only)** vs **Condition B (freshness-aware AI)**
- Responsive iPhone 14 Pro presentation shell (393 × 852 reference)

## Visual system

- Forest green: `#2C5745`
- Dark olive: `#2E2910`
- Warm sand: `#EBE3A7`
- Orange: `#EB7D00`

The app uses the system Apple font stack so SF Pro is used automatically where available.

## Run locally

```bash
npm install
npm run dev
```

Then open the local Vite URL (normally `http://localhost:5173`).

Production build:

```bash
npm run build
npm run preview
```

## Suggested demo path

1. **Sources** → paste a link or upload screenshots → **Analyze sources**.
2. **Plan → Places** → open **Restaurant A**.
3. **Check current information** → view conflict → **View supporting evidence**.
4. **Decide what to do** → **Replace Restaurant A**.
5. **Plan → Itinerary** → add/reorder/remove a place → **Re-optimize route**.
6. Run **Check timing & conflicts** → **Accept and finalize**.
7. Return to **Home** to see the finished trip state.

## Figma Make handoff

This ZIP is intentionally structured like a small Vite/React project so the source is easy to move into a Figma Make code project. The exact import UI can vary by Figma Make version; keep the directory structure and package files intact when transferring it.

## Notes

- AI, freshness lookup, routing, and conflict checks are simulated client-side for user testing; no external AI/API key is required.
- Uploaded screenshots are only previewed locally in the browser and are not transmitted anywhere by this demo.
- The research condition switch lives in **Settings → Prototype study mode**.
