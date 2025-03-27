type Props = {
  name?: string
}

export const NavName = ({ name }: Props): React.ReactNode => {
  if (name === undefined) {
    return null
  }

  return (
    <span
      className='nav-item-name'
      css={{
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <span
        className='nav-item-text'
        style={{ display: 'inline-block' }}
      >
        {name}
      </span>
    </span>
  )
}
