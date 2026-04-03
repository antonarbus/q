type Props = {
  reserveSpaceForIcon?: boolean
  name: React.ReactNode | string
  disabled?: boolean
}

/**
 * Component for name in menu item
 * @description
 * - if we have nested menu some space should be reserved for 'go inside' icon
 * - if name is long it will be trimmed ellipsis (... dots)
 */
export const TextInMenu = (props: Props): React.JSX.Element => {
  return (
    <span
      style={{
        marginLeft: 10,
        marginRight: props.reserveSpaceForIcon === true ? 30 : 0,
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        color: props.disabled === true ? 'grey' : 'inherit',
      }}
    >
      {props.name}
    </span>
  )
}
