import type { JSX } from 'react'
import { cls } from '@shared/cls'

export const DropHereText = (): JSX.Element => {
  return (
    <div
      className={cls.dropHereText}
      style={{
        position: 'absolute',
        // top: 2,
        // right: 5,
        inset: 0,
        display: 'grid',
        placeItems: 'center',
        color: 'grey',
        fontSize: 12,
        fontWeight: 700,
        userSelect: 'none',
        // display: 'none',
      }}
    >
      Drop here
    </div>
  )
}
