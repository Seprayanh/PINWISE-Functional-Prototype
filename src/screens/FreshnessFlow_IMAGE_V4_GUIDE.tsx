/*
FRESHNESSFLOW.TSX INTEGRATION

Import:

import { EvidencePreview } from '../components/EvidencePreview'

Replace text-only evidence area with:

<EvidencePreview
 image={place.evidenceImage}
 source="Recent source"
 title={place.recentInfo}
 confidence={85}
/>

This creates:
old information -> evidence -> AI confidence -> decision
*/
