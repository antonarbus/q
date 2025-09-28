import { cls } from '@shared/const/cls'
import type { JSX, ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const BoqRowsLayout = ({ children }: Props): JSX.Element => {
  return (
    <div
      className={cls.boqRows}
      id='boq-rows'
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {children}
    </div>
  )
}
