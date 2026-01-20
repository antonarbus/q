import type { JSX, ReactNode } from 'react'

type MenuButtonProps = {
  onClick: () => void
  isActive: boolean
  title: string
  children: ReactNode
}

export const MenuButton = ({
  onClick,
  isActive,
  title,
  children,
}: MenuButtonProps): JSX.Element => (
  <button
    type='button'
    onClick={onClick}
    title={title}
    style={{
      padding: '4px 8px',
      border: 'none',
      borderRadius: 4,
      backgroundColor: isActive === true ? '#4b5563' : 'transparent',
      color: '#fff',
      cursor: 'pointer',
      fontSize: 14,
      fontWeight: isActive === true ? 600 : 400,
      minWidth: 28,
      height: 28,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    {children}
  </button>
)
