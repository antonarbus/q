type Props = {
  children: React.ReactNode
  css?: React.CSSProperties
  className?: string
  disabled?: boolean
}

export const RoundSpanForIcon = ({
  children,
  css,
  className,
  disabled,
}: Props): React.JSX.Element => {
  return (
    <span
      className={className}
      css={{
        width: 30,
        height: 30,
        backgroundColor: disabled === true ? 'transparent' : '#484a4d',
        borderRadius: '50%',
        padding: 5,
        margin: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#dadce1',
        flexShrink: 0, // to avoid logo shrink when menu item text is long
        '& svg': {
          color: disabled === true ? 'grey' : '',
        },
        ...css,
      }}
    >
      {children}
    </span>
  )
}
