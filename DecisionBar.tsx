import type { PlaceDecision } from '../types'

export function DecisionBar({
 decision,
 onChange
}:{
 decision:PlaceDecision;
 onChange:(decision:PlaceDecision)=>void
}) {

 return (
  <div className="decision-bar">
   <button
    className={decision==='kept'?'active keep':''}
    onClick={()=>onChange('kept')}
   >
    ✓ Keep
   </button>

   <button
    className={decision==='review'?'active review':''}
    onClick={()=>onChange('review')}
   >
    Review
   </button>

   <button
    className={decision==='removed'?'active remove':''}
    onClick={()=>onChange('removed')}
   >
    Remove
   </button>
  </div>
 )
}
