export function ImageDecisionCard({
 image,
 title,
 subtitle,
 status,
}: {
 image?: string
 title:string
 subtitle:string
 status:string
}) {
 return (
  <article className="image-decision-card">
   {image && <img src={image} alt={title}/>}
   <div>
    <strong>{title}</strong>
    <p>{subtitle}</p>
    <span>{status}</span>
   </div>
  </article>
 )
}
