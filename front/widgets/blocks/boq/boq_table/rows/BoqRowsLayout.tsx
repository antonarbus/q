import { cls } from '@shared/consts/cls'

type Props = {
  children: React.ReactNode
}

export const BoqRowsLayout = ({ children }: Props): JSX.Element => {
  return (
    <div
      id='boq-rows'
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
