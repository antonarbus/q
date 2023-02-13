type Props = {
  children?: React.ReactNode
}

export const ActionsContainer = ({ children }: Props) => (
  <div
    css={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: 20,
      flexShrink: 1
    }}
  >
    {children}
  </div>
)
