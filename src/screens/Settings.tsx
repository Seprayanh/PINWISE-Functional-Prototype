import type { Dispatch, SetStateAction } from 'react'
import type { StudyCondition } from '../types'
import { PageHeader, Toggle } from '../components/UI'

export type SettingsState = { freshness:boolean; explanations:boolean; autoRemove:boolean; notifications:boolean; locationHints:boolean; condition:StudyCondition }

export function SettingsScreen({ settings, setSettings }: { settings:SettingsState; setSettings:Dispatch<SetStateAction<SettingsState>> }) {
  const change=<K extends keyof SettingsState>(k:K,v:SettingsState[K])=>setSettings(s=>({...s,[k]:v}))
  return <div className="screen-scroll"><PageHeader title="Settings" subtitle="Control how AI supports your planning decisions."/><main className="screen-content settings-content">
    <section className="settings-section"><h2>AI assistance</h2><Toggle value={settings.freshness} onChange={v=>change('freshness',v)} label="Freshness verification" description="Compare older saved information with recent sources."/><Toggle value={settings.explanations} onChange={v=>change('explanations',v)} label="Show AI explanations" description="Explain why information is flagged or routes are changed."/><Toggle value={settings.autoRemove} onChange={v=>change('autoRemove',v)} label="Auto-remove flagged places" description="Off by design — final decisions stay with you." disabled/></section>
    <section className="settings-section"><h2>Trip behavior</h2><Toggle value={settings.locationHints} onChange={v=>change('locationHints',v)} label="Use area hints" description="Group selected places by nearby neighborhoods."/><Toggle value={settings.notifications} onChange={v=>change('notifications',v)} label="Trip update reminders" description="Remind me when an included place needs review."/></section>
    <section className="settings-section study-mode"><h2>Prototype study mode</h2><p>Switch between the two experimental conditions without rebuilding the app.</p><div className="condition-picker"><button className={settings.condition==='aggregation'?'active':''} onClick={()=>change('condition','aggregation')}><strong>A</strong><span>Aggregation only</span></button><button className={settings.condition==='freshness'?'active':''} onClick={()=>change('condition','freshness')}><strong>B</strong><span>Freshness-aware AI</span></button></div><small>Condition A hides freshness status and supporting evidence. Condition B exposes them before Keep / Replace.</small></section>
    <section className="about-card"><strong>PINWISE prototype</strong><span>iPhone 14 Pro · Functional Hi‑Fi · v1.0</span><p>AI organizes. AI verifies. You decide.</p></section>
  </main></div>
}
