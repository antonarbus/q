import { theme } from 'client/theme'

type Props = {
  children: React.ReactNode,
}

export const BoqHeader = ({ children }: Props) => {
  return (
    <div
      css={{
        background: '#343434e6',
        padding: 20,
        paddingBottom: 10,
        fontWeight: 500,
        color: theme.colors.greyFont
      }}
    >
      {children}
    </div>
  )
}
