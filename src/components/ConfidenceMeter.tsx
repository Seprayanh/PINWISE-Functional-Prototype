export function ConfidenceMeter({
 confidence
}:{
 confidence?:string|number
}){

 const value =
 typeof confidence==='number'
 ? confidence
 : confidence?.toLowerCase()==='high'
 ? 85
 : confidence?.toLowerCase()==='medium'
 ? 60
 : 35

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
   Based on recent evidence
  </small>

 </div>
 )
}
