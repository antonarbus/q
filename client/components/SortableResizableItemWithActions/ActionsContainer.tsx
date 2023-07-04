type TProps = {
  children?: React.ReactNode
}

export const ActionsContainer = ({ children }: TProps) => (
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
