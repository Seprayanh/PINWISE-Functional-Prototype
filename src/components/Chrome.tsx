import type { Tab } from '../types'
import { IconGear, IconHome, IconMap, IconSources } from './Icons'

export function StatusBar() {
  return (
    <div className="status-bar">
      <span className="status-time">9:41</span>
      <div className="dynamic-island" />
      <div className="status-icons" aria-hidden="true">
        <span className="signal"><i/><i/><i/><i/></span>
        <svg className="wifi" viewBox="0 0 20 14"><path d="M1 5.3C6 1.1 14 1.1 19 5.3M4 8.4c3.4-2.6 8.6-2.6 12 0M7.3 11.2c1.5-1 4-1 5.4 0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><circle cx="10" cy="13" r="1" fill="currentColor"/></svg>
        <span className="battery"><i/></span>
      </div>
    </div>
  )
}

export function HomeIndicator() { return <div className="home-indicator" /> }

const items: { tab: Tab; label: string }[] = [
  { tab: 'home', label: 'Home' }, { tab: 'sources', label: 'Sources' }, { tab: 'plan', label: 'Plan' }, { tab: 'settings', label: 'Settings' },
]

export function BottomNav({ active, onChange }: { active: Tab; onChange: (tab: Tab) => void }) {
  return (
    <nav className="bottom-nav" aria-label="Primary">
      {items.map(({ tab, label }) => {
        const isActive = active === tab
        const Icon = tab === 'home' ? IconHome : tab === 'sources' ? IconSources : tab === 'plan' ? IconMap : IconGear
        return <button key={tab} className={`nav-item ${isActive ? 'active' : ''}`} onClick={() => onChange(tab)}><Icon active={isActive}/><span>{label}</span></button>
      })}
    </nav>
  )
}
