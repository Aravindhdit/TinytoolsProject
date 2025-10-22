import React, { useState } from 'react'
import QRCode from 'qrcode'

// simple fallback shortener — replace with a real API if available
async function simpleShorten(url) {
  return url
}

export default function QRShortener() {
  const [url, setUrl] = useState('')
  const [short, setShort] = useState('')
  const [qrData, setQrData] = useState('')
  const [loading, setLoading] = useState(false)

  const handleMake = async () => {
	if (!url) return
	setLoading(true)
	try {
	  const s = await simpleShorten(url)
	  setShort(s)
	  const data = await QRCode.toDataURL(s, { margin: 1, width: 256 })
	  setQrData(data)
	} catch (e) {
	  setShort(url)
	  try {
		const data = await QRCode.toDataURL(url)
		setQrData(data)
	  } catch (err) {
		// ignore
	  }
	} finally {
	  setLoading(false)
	}
  }

  return (
	<div>
	  <div className="tool-title">QR Code & URL Shortener</div>
	  <p className="small">Paste a URL, get a short link and a downloadable QR code.</p>
	  <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
		<div style={{ flex: 1 }}>
		  <input
			className="input"
			placeholder="https://example.com"
			value={url}
			onChange={e => setUrl(e.target.value)}
		  />
		  <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
			<button className="copy-btn" onClick={handleMake}>
			  {loading ? 'Working...' : 'Generate'}
			</button>
			{short && (
			  <button className="copy-btn" onClick={() => navigator.clipboard.writeText(short)}>
				Copy Short Link
			  </button>
			)}
		  </div>

		  {short && (
			<div style={{ marginTop: 12 }}>
			  <div className="small">Short link</div>
			  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
				<input className="input" value={short} readOnly />
			  </div>
			</div>
		  )}
		</div>

		<div style={{ width: 260, textAlign: 'center' }}>
		  <div className="preview-box" style={{ height: 260 }}>
			{qrData ? (
			  <img src={qrData} alt="qr" style={{ maxWidth: '100%' }} />
			) : (
			  <div className="small">QR Preview</div>
			)}
		  </div>
		  {qrData && (
			<div style={{ marginTop: 8 }}>
			  <a className="copy-btn" href={qrData} download="qr.png">
				Download PNG
			  </a>
			</div>
		  )}
		</div>
	  </div>
	</div>
  )
}