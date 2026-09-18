import React from 'react'

export function EvidencePreview({
 image,
 source,
 title,
}: {
 image?: string
 source: string
 title: string
}) {
 return (
  <section className="evidence-preview">
   {image && (
    <img
     className="evidence-preview-image"
     src={image}
     alt={source}
    />
   )}

   <div className="evidence-preview-content">
    <span className="eyebrow">AI EVIDENCE</span>
    <strong>{source}</strong>
    <h3>{title}</h3>
   </div>
  </section>
 )
}
