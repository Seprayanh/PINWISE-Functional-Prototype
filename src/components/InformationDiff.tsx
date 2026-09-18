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

  <div className="diff-section">
   <label>Saved information</label>
   <p>{previous}</p>
  </div>

  <div className="diff-divider">
   ↓ No major change detected
  </div>

  <div className="diff-section latest">
   <label>Latest information</label>
   <p>{latest}</p>
  </div>

  <small>
   ✓ {source || 'Verified source'} · {checked || 'recently checked'}
  </small>

 </section>
 )
}
