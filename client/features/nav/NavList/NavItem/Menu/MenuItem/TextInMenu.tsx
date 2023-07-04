type TProps = {
  reserveSpaceForIcon?: boolean,
  name: string | React.ReactNode
  disabled?: boolean
}

/**
 * Component for name in menu item
 * @descriptions
 * - if we have nested menu some space should be reserved for 'go inside' icon
 * - if name is long it will be trimmed ellipsis (... dots)
 */
export function TextInMenu({ reserveSpaceForIcon, name, disabled }: TProps) {
  return (
    <span
      css={{
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
