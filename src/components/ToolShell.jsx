import React from 'react'
export default function ToolShell({children}){
return (
<div className="card">
<div className="tool-title">{children.props?.title || ''}</div>
<div>{children}</div>
</div>
)
}