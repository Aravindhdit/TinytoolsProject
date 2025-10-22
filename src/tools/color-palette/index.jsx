import React, {useState} from 'react'

export default function ColorPalette() {
  const [src, setSrc] = useState('')
  const [err, setErr] = useState('')
  const [colors, setColors] = useState([])

  // Simple color extractor: picks the first N distinct non-transparent colors found
  function extractColors(imageData, count) {
	const data = imageData.data
	const seen = new Set()
	const out = []
	for (let i = 0; i < data.length; i += 4) {
	  const a = data[i + 3]
	  if (a === 0) continue
	  const r = data[i].toString(16).padStart(2, '0')
	  const g = data[i + 1].toString(16).padStart(2, '0')
	  const b = data[i + 2].toString(16).padStart(2, '0')
	  const hex = `#${r}${g}${b}`
	  if (!seen.has(hex)) {
		seen.add(hex)
		out.push(hex)
		if (out.length >= count) break
	  }
	}
	return out
  }

  function handleFile(e) {
	const f = e.target.files[0]
	if (!f) return
	const url = URL.createObjectURL(f)
	setSrc(url)
	process(url)
  }

  function process(url) {
	setErr('')
	const img = new Image()
	img.crossOrigin = 'anonymous'
	img.onload = () => {
	  const canvas = document.createElement('canvas')
	  const w = Math.min(300, img.width)
	  const h = Math.min(300, img.height)
	  canvas.width = w; canvas.height = h
	  const ctx = canvas.getContext('2d')
	  ctx.drawImage(img, 0, 0, w, h)
	  try {
		const data = ctx.getImageData(0, 0, w, h)
		const out = extractColors(data, 5)
		setColors(out)
	  } catch (e) {
		setErr('Unable to read image data. If you pasted a remote URL it might be blocked by CORS. Try uploading the image.')
	  }
	}
	img.onerror = () => setErr('Failed to load image')
	img.src = url
  }

  return (
	<div>
	  <div className="tool-title">Color Palette Extractor</div>
	  <p className="small">Drop an image or paste a URL (upload recommended for CORS).</p>
	  <div style={{display:'flex',gap:12,marginTop:12}}>
		<div style={{flex:1}}>
		  <input type="file" accept="image/*" onChange={handleFile} />
		  <div style={{marginTop:8}}>
			<input className="input" placeholder="Or paste an image URL and press Enter" onKeyDown={(e)=>{ if(e.key==='Enter') { setSrc(e.target.value); process(e.target.value) } }} />
		  </div>

		  {err && <div className="small" style={{color:'#ff6b6b',marginTop:8}}>{err}</div>}

		  <div style={{display:'flex',gap:8,marginTop:12}}>
			{colors.map(c=> (
			  <div key={c} style={{flex:1}} className="card">
				<div className="color-swatch" style={{background:c}}></div>
				<div style={{marginTop:8,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
				  <div>{c}</div>
				  <button className="copy-btn" onClick={()=>navigator.clipboard.writeText(c)}>Copy</button>
				</div>
			  </div>
			))}
		  </div>
		</div>

		<div className="preview-box">
		  {src ? <img src={src} alt="preview" style={{maxWidth:'100%',maxHeight:'100%',borderRadius:8}}/> : <div className="small">Preview</div>}
		</div>
	  </div>
	</div>
  )
}