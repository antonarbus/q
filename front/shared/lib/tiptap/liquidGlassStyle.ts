import { type CSSProperties } from 'react'

export const liquidGlassStyle: CSSProperties = {
  background: 'rgba(0, 0, 0, 0.75)',
  backdropFilter: 'blur(4px) saturate(180%)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: 8,
  boxShadow:
    '0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 1px 0 rgba(255, 255, 255, 0.05)',
}
