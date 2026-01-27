import type { JSX } from 'react'
import { cls } from '@shared/cls'

export const DropHereText = (): JSX.Element => {
  return (
    <div
      className={cls.dropHereText}
      style={{
        position: 'absolute',
        top: 2,
        right: 5,
        color: 'grey',
        fontSize: 12,
        fontWeight: 700,
        userSelect: 'none',
        display: 'none',
      }}
    >
      Drop here
    </div>
  )
}
