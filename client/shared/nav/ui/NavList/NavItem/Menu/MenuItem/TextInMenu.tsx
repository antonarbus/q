import type { ReactNode } from 'react'

type Props = {
  reserveSpaceForIcon?: boolean
  name: ReactNode | string
  disabled?: boolean
}

/**
 * Component for name in menu item
 * @descriptions
 * - if we have nested menu some space should be reserved for 'go inside' icon
 * - if name is long it will be trimmed ellipsis (... dots)
 */
export const TextInMenu = ({ reserveSpaceForIcon, name, disabled }: Props): JSX.Element => {
  return (
    <span
      style={{
        marginLeft: 10,
        marginRight: reserveSpaceForIcon ? 30 : 0,
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        color: disabled ? 'grey' : 'inherit',
      }}
    >
      {name}
    </span>
  )
}
