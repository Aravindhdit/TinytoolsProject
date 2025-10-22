import React, {useState} from 'react'
import ColorPaletteTool from './tools/color-palette'
import CSSGenerator from './tools/css-generator'
import QRTool from './tools/qr-shortener'
import ResumeTool from './tools/resume-snippet'
import ToolShell from './components/ToolShell'


export default function App(){
const [tool, setTool] = useState('palette')
return (
<div className="app">
<header className="header">
<h1>TinyTools Studio</h1>
<p className="sub">Tiny, shareable web utilities — fast, focused, and embeddable.</p>
</header>


<div className="container">
<aside className="sidebar">
<button className={tool==='palette'? 'active':''} onClick={()=>setTool('palette')}>Color Palette</button>
<button className={tool==='css'? 'active':''} onClick={()=>setTool('css')}>CSS Generator</button>
<button className={tool==='qr'? 'active':''} onClick={()=>setTool('qr')}>QR & Shorten</button>
<button className={tool==='resume'? 'active':''} onClick={()=>setTool('resume')}>Resume Snippet</button>
</aside>


<main className="main">
<ToolShell>
{tool==='palette' && <ColorPaletteTool />}
{tool==='css' && <CSSGenerator />}
{tool==='qr' && <QRTool />}
{tool==='resume' && <ResumeTool />}
</ToolShell>
</main>
</div>


<footer className="footer">Made by Arav — TinyTools Studio</footer>
</div>
)
}