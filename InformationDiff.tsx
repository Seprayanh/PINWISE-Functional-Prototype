export function InformationDiff({
 previous,
 latest,
 source,
 checked
}:{
 previous?:string;
 latest?:string;
 source?:string;
 checked?:string
}){
 return (
  <section className="diff-card">
   <div className="diff-section saved">
    <label>Original saved information</label>
    <p>{previous}</p>
   </div>
   <div className="diff-divider">AI comparison</div>
   <div className="diff-section latest">
    <label>Latest verified information</label>
    <p>{latest}</p>
   </div>
   <small>✓ {source || 'Verified source'} · {checked || 'recently checked'}</small>
  </section>
 )
}
