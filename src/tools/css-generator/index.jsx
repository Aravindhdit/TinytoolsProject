import React, {useState} from 'react'

export default function CssGenerator() {
  const [x,setX]=useState(8)
  const [y,setY]=useState(8)
  const [color,setColor]=useState('#00000088')
  const [angle,setAngle]=useState(135)
  const [gradientFrom,setGradientFrom]=useState('#06b6d4')
  const [gradientTo,setGradientTo]=useState('#7c3aed')
  const [blur,setBlur]=useState(8)


  const boxStyle={
	padding:20,
	borderRadius:12,
	background:`linear-gradient(${angle}deg, ${gradientFrom}, ${gradientTo})`,
	boxShadow:`${x}px ${y}px ${blur}px ${color}`
  }


  const css=`background: linear-gradient(${angle}deg, ${gradientFrom}, ${gradientTo});\nbox-shadow: ${x}px ${y}px ${blur}px ${color};\nborder-radius: 12px;\npadding: 20px;`


  return (
	<div>
	  <div className="tool-title">CSS Shadow & Gradient Generator</div>
	  <p className="small">Tweak values and copy the CSS snippet.</p>
	  <div style={{display:'flex',gap:12,marginTop:12}}>
		<div style={{flex:1}}>
		  <label className="small">Shadow X</label>
		  <input type="range" min={-50} max={50} value={x} onChange={e=>setX(Number(e.target.value))} />
		  <label className="small">Shadow Y</label>
		  <input type="range" min={-50} max={50} value={y} onChange={e=>setY(Number(e.target.value))} />
		  <label className="small">Blur</label>
		  <input type="range" min={0} max={80} value={blur} onChange={e=>setBlur(Number(e.target.value))} />
		  <label className="small">Shadow Color</label>
		  <input type="text" className="input" value={color} onChange={e=>setColor(e.target.value)} />


		  <label className="small" style={{marginTop:8}}>Gradient Angle</label>
		  <input type="number" className="input" value={angle} onChange={e=>setAngle(Number(e.target.value))} />


		  <div style={{display:'flex',gap:8,marginTop:8}}>
			<input className="input" value={gradientFrom} onChange={e=>setGradientFrom(e.target.value)} />
			<input className="input" value={gradientTo} onChange={e=>setGradientTo(e.target.value)} />
		  </div>


		  <div style={{marginTop:8}}>
			<textarea className="input" rows={5} value={css} readOnly />
			<div style={{marginTop:8,display:'flex',gap:8}}>
			  <button className="copy-btn" onClick={()=>navigator.clipboard.writeText(css)}>Copy CSS</button>
			</div>
		  </div>
		</div>


		<div style={{width:260}}>
		  <div style={boxStyle}>
			<div style={{fontWeight:700}}>Preview box</div>
			<div className="small">Use this in your UI</div>
		  </div>
		</div>
	  </div>
	</div>
  )
}