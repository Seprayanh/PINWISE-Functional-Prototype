/*
Integrate into existing FreshnessFlow.tsx

Import:

import { EvidencePreview } from '../components/EvidencePreview'

Inside evidence stage add:

<EvidencePreview
 image={place.evidenceImage}
 source="Recent evidence"
 title={place.recentInfo}
 confidence={place.confidence}
/>

Keep existing:
- ConfidenceMeter
- InformationDiff
- DecisionBar
*/
