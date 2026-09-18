export function ConfidenceMeter({
 confidence
}:{
 confidence?:number
}){

 const value = confidence ?? 0

 const label =
 value >= 90
 ? 'High confidence'
 : value >= 75
 ? 'Medium confidence'
 : 'Low confidence'

 return (
 <div className="confidence-card">

  <div className="confidence-title">
   <span>AI confidence</span>
   <strong>{value}%</strong>
  </div>

  <div className="confidence-track">
   <div
    className="confidence-progress"
    style={{width:`${value}%`}}
   />
  </div>

  <small>
   {label} · Based on recent evidence
  </small>

 </div>
 )
}
