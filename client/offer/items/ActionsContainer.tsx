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
    }}
  >
    {children}
  </div>
)
