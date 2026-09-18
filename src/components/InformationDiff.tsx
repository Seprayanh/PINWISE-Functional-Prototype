interface Props{
 previous?:string
 latest?:string
 source?:string
 checked?:string
}

export function InformationDiff({previous,latest,source,checked}:Props){
 return <div className="information-diff">
   <div>
    <span>Previous information</span>
    <p>{previous}</p>
   </div>
   <div>↓ Changed</div>
   <div>
    <span>Latest information</span>
    <p>{latest}</p>
   </div>
   <small>✓ {source} · Checked {checked}</small>
 </div>
}
