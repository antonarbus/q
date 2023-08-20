import { className } from 'client/shared/className'
import type { ReactNode } from 'react'

interface Props {
  itemActionElements?: ReactNode
}

export const ActionsContainer = ({ itemActionElements }: Props): JSX.Element => (
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
