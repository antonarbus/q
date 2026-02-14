import { cls } from '@shared/cls'

type Props = {
  children: React.ReactNode
}

export const RowsLayout = (props: Props): React.JSX.Element => {
  return (
    <div
      className={cls.rows}
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {props.children}
    </div>
  )
}
