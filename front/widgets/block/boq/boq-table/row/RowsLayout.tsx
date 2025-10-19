import { cls } from '@shared/cls'
import type { JSX, ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const RowsLayout = ({ children }: Props): JSX.Element => {
  return (
    <div
      className={cls.rows}
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {children}
    </div>
  )
}
