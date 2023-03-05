type Props = {
  children?: React.ReactNode
}

export const ActionsContainer = ({ children }: Props) => (
  <div
    className='actions-container'
    css={{
      display: 'flex',
      flexDirection: 'column',
      gap: 3,
      alignItems: 'center',
      width: 20,
      flexShrink: 0,
      '& > *:hover': {
        scale: '1.3',
        color: 'black',
        transition: 'scale 200ms'
      }
    }}
  >
    {children}
  </div>
)
