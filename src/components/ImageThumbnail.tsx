export function ImageThumbnail({
 src,
 alt,
 className=''
}:{
 src?:string
 alt:string
 className?:string
}) {
 return src ? (
   <img
    className={`image-thumbnail ${className}`}
    src={src}
    alt={alt}
   />
 ) : (
   <div className={`image-fallback ${className}`}>
    {alt.slice(0,2).toUpperCase()}
   </div>
 )
}
