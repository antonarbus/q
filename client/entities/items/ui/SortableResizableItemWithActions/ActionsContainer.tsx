import type { ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}

export const ActionsContainer = ({ children }: IProps): JSX.Element => (
  <div
    className='actions'
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
    {children}
  </div>
)
