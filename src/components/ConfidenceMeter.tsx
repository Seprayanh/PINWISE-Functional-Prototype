interface Props{
 confidence?: string|number
}

export function ConfidenceMeter({confidence}:Props){
 const value=typeof confidence==='number'
 ? confidence
 : confidence?.toLowerCase()==='high'?85
 : confidence?.toLowerCase()==='medium'?60
 : 35

 return <div className="confidence-meter">
   <div>AI Confidence <strong>{value}%</strong></div>
   <div className="confidence-track">
     <div className="confidence-fill" style={{width:`${value}%`}} />
   </div>
 </div>
}
