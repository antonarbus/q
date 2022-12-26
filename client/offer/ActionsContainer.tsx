type Props = {
  children: React.ReactNode
}

export const ActionsContainer = ({ children }: Props) => (
  <div
    css={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      flexShrink: 1
    }}
  >
    {children}
  </div>
)
