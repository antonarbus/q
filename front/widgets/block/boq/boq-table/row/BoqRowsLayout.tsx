import { cls } from '@shared/cls'
import type { JSX, ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const BoqRowsLayout = ({ children }: Props): JSX.Element => {
  return (
    <div
      className={cls.boqRows}
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {children}
    </div>
  )
}
