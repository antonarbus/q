import type { JSX } from 'react'
import { TiptapExample } from './tiptap-example/TiptapExample'
import { PlateExample } from './plate-example/PlateExample'

const containerStyle: React.CSSProperties = {
  maxWidth: 1200,
  margin: '40px auto',
  padding: '0 20px',
}

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
  gap: 32,
}

const cardStyle: React.CSSProperties = {
  padding: 20,
  backgroundColor: '#fff',
  borderRadius: 12,
  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
}

const titleStyle: React.CSSProperties = {
  fontSize: 18,
  fontWeight: 600,
  marginBottom: 16,
  color: '#374151',
}

export const TestPage = (): JSX.Element => {
  return (
    <div style={containerStyle}>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 32, color: '#111827' }}>
        Editor Comparison
      </h1>

      <div style={gridStyle}>
        <div style={cardStyle}>
          <h2 style={titleStyle}>Tiptap (ProseMirror)</h2>
          <TiptapExample />
        </div>

        <div style={cardStyle}>
          <h2 style={titleStyle}>Plate (Slate)</h2>
          <PlateExample />
        </div>
      </div>
    </div>
  )
}
