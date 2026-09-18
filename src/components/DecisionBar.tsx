import React from 'react'

type Decision = 'kept' | 'review' | 'removed' | 'candidate'

interface Props {
  decision?: Decision
  onChange: (decision: Decision) => void
}

const OPTIONS = [
  {key:'kept', label:'Keep', icon:'✓'},
  {key:'review', label:'Review', icon:'◌'},
  {key:'removed', label:'Remove', icon:'×'},
] as const

export function DecisionBar({decision,onChange}:Props){
  return <div className="decision-bar">
    {OPTIONS.map(option=>
      <button
        key={option.key}
        className={`decision-item ${decision===option.key?'active':''}`}
        onClick={()=>onChange(option.key)}
      >
        {option.icon} {option.label}
      </button>
    )}
  </div>
}
