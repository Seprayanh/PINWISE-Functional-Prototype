export function TripCover({
 image,
 title,
 subtitle
}:{
 image:string
 title:string
 subtitle:string
}) {
 return (
  <section className="trip-cover">
   <img src={image} alt={title}/>
   <div className="trip-cover-overlay">
    <h1>{title}</h1>
    <p>{subtitle}</p>
   </div>
  </section>
 )
}
