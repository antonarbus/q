import { className } from '@shared/className'
import type { ReactNode } from 'react'

type Props = {
  itemActionElements?: ReactNode
}

export const ItemActionsContainer = ({ itemActionElements }: Props): JSX.Element => (
  <div
    className={className.actionsContainer}
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
