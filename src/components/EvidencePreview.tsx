export function EvidencePreview({
 image,
 source,
 text
}:{
 image?:string
 source:string
 text:string
}) {
 return (
  <section className="evidence-preview">
   {image && <img src={image} alt="Evidence preview"/>}
   <div>
    <strong>{source}</strong>
    <p>{text}</p>
   </div>
  </section>
 )
}
