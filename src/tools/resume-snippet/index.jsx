import React, {useState} from 'react'


const templates = [
{id:'one', title:'Short Profile (Markdown)', content:`### Name\nRole • Location\n\n- Quick summary: Experienced developer who...\n- Skills: JavaScript, React, CSS`},
{id:'two', title:'Experience Bullet (HTML)', content:`<div class="exp"><h3>Software Engineer — Acme</h3><p>Worked on X, Y, Z.</p><ul><li>Improved load time by 30%</li></ul></div>`}
]


export default function ResumeTool(){
const [sel,setSel]=useState('one')
const t = templates.find(x=>x.id===sel)


return (
<div>
<div className="tool-title">Resume Snippet Builder</div>
<p className="small">Choose a snippet and copy it into your resume or portfolio.</p>
<div style={{display:'flex',gap:12,marginTop:12}}>
<div style={{flex:1}}>
<select className="input" value={sel} onChange={e=>setSel(e.target.value)}>
{templates.map(tp=> <option value={tp.id} key={tp.id}>{tp.title}</option>)}
</select>
<textarea className="input" rows={8} value={t.content} readOnly style={{marginTop:8}} />
<div style={{marginTop:8,display:'flex',gap:8}}>
<button className="copy-btn" onClick={()=>navigator.clipboard.writeText(t.content)}>Copy Snippet</button>
<button className="copy-btn" onClick={()=>downloadText(`${t.id}-snippet.txt`, t.content)}>Download</button>
</div>
</div>


<div style={{width:260}}>
<div className="card" style={{padding:12}}>
<div style={{fontWeight:700}}>{t.title}</div>
<pre style={{whiteSpace:'pre-wrap',marginTop:8}}>{t.content}</pre>
</div>
</div>
</div>
</div>
)
}


function downloadText(filename, text){
const a=document.createElement('a')
a.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(text)
a.download = filename
a.click()
}