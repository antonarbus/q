type Props = {
  name?: string
  maxName?: string
}

export const NavName = (props: Props): React.ReactNode => {
  if (props.name === undefined) {
    return null
  }

  return (
    <span
      className='nav-item-name'
      css={{
        position: 'relative',
        display: 'inline-block',
        marginLeft: '5px',
        paddingRight: props.maxName === undefined ? '30px' : 0,
      }}
    >
      <span style={{ visibility: 'hidden', whiteSpace: 'nowrap' }}>
        {props.maxName ?? props.name}
      </span>
      <span
        className='nav-item-text'
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          whiteSpace: 'nowrap',
        }}
      >
        {props.name}
      </span>
    </span>
  )
}
