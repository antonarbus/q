import type { JSX } from 'react'
import { cls } from '@shared/cls'

export const DropHereText = (): JSX.Element => {
  return (
    <div
      className={cls.dropHereText}
      style={{
        position: 'absolute',
        inset: 0,
        color: 'grey',
        fontSize: 14,
        fontWeight: 600,
        userSelect: 'none',
        margin: '5px',
        background: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(1.2px) saturate(180%)',
        border: '2px dashed grey',
        borderRadius: '4px',
        pointerEvents: 'none',
        // display: 'grid', // set with JS
        placeItems: 'center',
        display: 'none',
      }}
    >
      Drop here
    </div>
  )
}
