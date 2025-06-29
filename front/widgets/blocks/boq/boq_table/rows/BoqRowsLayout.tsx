import { cls } from '@shared/const/cls'

type Props = {
  children: React.ReactNode
}

export const BoqRowsLayout = ({ children }: Props): React.JSX.Element => {
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
