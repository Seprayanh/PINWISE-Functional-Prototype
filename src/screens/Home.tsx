import type { Tab } from '../types'
import { Notice, PageHeader } from '../components/UI'

export function HomeScreen({ onTab, onFreshness, finalized, selectedCount, sourceCount, reviewCount }: { onTab:(t:Tab)=>void; onFreshness:()=>void; finalized:boolean; selectedCount:number; sourceCount:number; reviewCount:number }) {
  return <div className="screen-scroll">
    <PageHeader title="Your Tokyo trip" subtitle={`4 days · ${sourceCount} saved sources · ${selectedCount} places`} />
    <main className="screen-content home-content">
      <button className="hero-card" onClick={()=>onTab('plan')}>
        <span className="eyebrow">TOKYO · APR 18–21</span>
        <h2>{finalized ? 'Your trip is ready.' : 'Build a plan you can trust.'}</h2>
        <p>{finalized ? 'Final itinerary saved with checked practical details and your edits preserved.' : `AI organized your saves. ${reviewCount ? `${reviewCount} place still needs a freshness review.` : 'Everything selected is checked.'}`}</p>
        <span className={`hero-pill ${reviewCount ? 'warn' : 'ok'}`}>{reviewCount ? `${reviewCount} needs review` : 'Ready to go'}</span>
      </button>
      <div className="quick-grid">
        <button className="quick-card" onClick={()=>onTab('sources')}><strong>Add sources</strong><span>Links & screenshots</span></button>
        <button className="quick-card" onClick={()=>onTab('plan')}><strong>View map</strong><span>See trip geography</span></button>
        <button className="quick-card" onClick={onFreshness}><strong>Check freshness</strong><span>Verify older info</span></button>
        <button className="quick-card" onClick={()=>onTab('plan')}><strong>Open itinerary</strong><span>Edit your days</span></button>
      </div>
      {reviewCount > 0 ? <Notice tone="orange" title="Restaurant A needs review" copy="Recent evidence reports earlier closing hours. Tap Check freshness to compare evidence." /> : <Notice tone="green" title="Freshness review complete" copy="Your selected places no longer carry unresolved practical conflicts." />}
    </main>
  </div>
}
