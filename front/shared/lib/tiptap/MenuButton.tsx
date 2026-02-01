import type { JSX, ReactNode } from 'react'

type Props = {
  onClick: () => void
  isActive: boolean
  title: string
  children: ReactNode
}

export const MenuButton = (props: Props): JSX.Element => (
  <button
    type='button'
    onClick={props.onClick}
    title={props.title}
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: 28,
      height: 28,
      padding: '4px 8px',
      border: 'none',
      borderRadius: 4,
      backgroundColor: props.isActive === true ? '#dcdcdc' : 'transparent',
      cursor: 'pointer',
      fontSize: 14,
    }}
  >
    {props.children}
  </button>
)
