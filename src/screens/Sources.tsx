import { useRef, useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import type { SourceItem } from '../types'
import { IconImage, IconLink, IconPlus, IconTrash } from '../components/Icons'
import { Badge, PageHeader, ProgressPanel } from '../components/UI'

export function SourcesScreen({ sources, setSources, onAnalyzed }: { sources:SourceItem[]; setSources:Dispatch<SetStateAction<SourceItem[]>>; onAnalyzed:()=>void }) {
  const [url, setUrl] = useState('')
  const [analyzing, setAnalyzing] = useState(false)
  const [progress, setProgress] = useState(0)
  const fileRef = useRef<HTMLInputElement>(null)

  function addLink() {
    const value = url.trim(); if(!value) return
    setSources(s => [{ id: Date.now(), title: `Imported link ${s.length + 1}`, type:'link', platform: value.includes('xiaohongshu') ? 'Xiaohongshu' : 'Web', age:'added just now', url:value }, ...s]); setUrl('')
  }
  function onFiles(files: FileList | null) {
    if(!files) return
    const additions = Array.from(files).map((f,i):SourceItem=>({ id:Date.now()+i, title:f.name, type:'screenshot', platform:'Screenshot', age:'added just now', preview:URL.createObjectURL(f) }))
    setSources(s=>[...additions,...s])
  }
  function analyze() {
    if(analyzing || !sources.length) return
    setAnalyzing(true); setProgress(8)
    const steps=[28,56,78,100]; steps.forEach((v,i)=>setTimeout(()=>setProgress(v),500*(i+1)))
    setTimeout(()=>{ setAnalyzing(false); onAnalyzed() }, 2400)
  }
  return <div className="screen-scroll"><PageHeader title="Saved sources" subtitle="Bring scattered travel posts into one place." />
    <main className="screen-content">
      <section className="source-import-card">
        <h3>Add travel content</h3><p>Paste a saved post or add screenshots from your phone.</p>
        <div className="url-row"><input value={url} onChange={e=>setUrl(e.target.value)} placeholder="Paste a link…" onKeyDown={e=>e.key==='Enter'&&addLink()}/><button onClick={addLink} aria-label="Add link"><IconPlus/></button></div>
        <div className="import-actions"><button onClick={()=>fileRef.current?.click()}><IconImage/> Screenshot</button><button onClick={()=>setUrl('https://www.xiaohongshu.com/')}><IconLink/> Example link</button></div>
        <input ref={fileRef} hidden type="file" accept="image/*" multiple onChange={e=>onFiles(e.target.files)}/>
      </section>
      <div className="section-heading"><div><h2>Imported</h2><span>{sources.length} items</span></div><Badge status="ai">AI ready</Badge></div>
      <div className="source-list">{sources.map(s=><article className="source-row" key={s.id}><div className={`source-icon ${s.type}`}>{s.type==='link'?<IconLink/>:<IconImage/>}</div><div><strong>{s.title}</strong><span>{s.platform} · {s.age}</span></div><button aria-label="Remove source" onClick={()=>setSources(all=>all.filter(x=>x.id!==s.id))}><IconTrash/></button></article>)}</div>
      <button className="primary-button sticky-action" onClick={analyze} disabled={!sources.length || analyzing}>{analyzing ? 'Analyzing…' : `Analyze ${sources.length} source${sources.length===1?'':'s'}`}</button>
    </main>
    {analyzing && <div className="modal-scrim"><div className="modal-card"><ProgressPanel title="AI is extracting places" subtitle="Finding locations, opening hours and repeated mentions while merging duplicates." progress={progress}/></div></div>}
  </div>
}
