import type { ReactNode } from 'react'
import type { FreshnessStatus } from '../types'
import { IconAlert, IconCheck, IconClock, IconSparkle } from './Icons'

export function Brand() { return <div className="brand">PINWISE</div> }

export function PageHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return <header className="page-header"><div className="page-header-main"><Brand/><div className="header-row"><h1>{title}</h1>{action}</div>{subtitle && <p>{subtitle}</p>}</div></header>
}

export function Badge({ status, children }: { status: FreshnessStatus | 'ai' | 'neutral'; children?: ReactNode }) {
  const label = children ?? ({ current: 'Current', review: 'Needs review', outdated: 'Outdated', unverified: 'Unverified', ai: 'AI support', neutral: 'Info' } as Record<string, string>)[status]
  return <span className={`badge badge-${status}`}>{status === 'ai' && <IconSparkle size={13}/>} {label}</span>
}

export function Toggle({ value, onChange, label, description, disabled = false }: { value: boolean; onChange: (v:boolean) => void; label: string; description?: string; disabled?: boolean }) {
  return <button className={`toggle-row ${disabled ? 'disabled' : ''}`} onClick={() => !disabled && onChange(!value)} disabled={disabled}><span><strong>{label}</strong>{description && <small>{description}</small>}</span><span className={`switch ${value ? 'on' : ''}`}><i/></span></button>
}

export function ProgressPanel({ title, subtitle, progress }: { title: string; subtitle: string; progress: number }) {
  return <div className="progress-panel"><div className="ai-orb"><IconSparkle size={24}/></div><h3>{title}</h3><p>{subtitle}</p><div className="progress-track"><i style={{ width: `${Math.max(5, progress)}%` }}/></div><span>{progress}%</span></div>
}

export function EmptyState({ title, copy, action }: { title: string; copy: string; action?: ReactNode }) {
  return <div className="empty-state"><div className="empty-icon">◎</div><h3>{title}</h3><p>{copy}</p>{action}</div>
}

export function Notice({ tone='warm', title, copy }: { tone?: 'warm'|'green'|'orange'; title: string; copy: string }) {
  return <div className={`notice notice-${tone}`}>{tone === 'orange' ? <IconAlert/> : tone === 'green' ? <IconCheck/> : <IconClock/>}<div><strong>{title}</strong><p>{copy}</p></div></div>
}
