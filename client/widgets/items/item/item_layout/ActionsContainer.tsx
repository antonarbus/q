import { className } from 'client/shared/className'
import type { ReactNode } from 'react'

interface IProps {
  itemActionElements?: ReactNode
}

export const ActionsContainer = ({ itemActionElements }: IProps): JSX.Element => (
  <div
    className={className.actions}
    css={{
      display: 'flex',
      flexDirection: 'column',
      gap: 3,
      alignItems: 'center',
      width: 20,
      flexShrink: 0,
      userSelect: 'none',
      '& svg': { display: 'block' },
      '& span': {
        '&:focus': {
          outline: 0,
        },
      },
    }}
  >
    {itemActionElements}
  </div>
)
