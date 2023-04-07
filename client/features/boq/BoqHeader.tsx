import { theme } from 'client/theme'

type Props = {
  children: React.ReactNode,
}

export const BoqHeader = ({ children }: Props) => {
  return (
    <div
      css={{
        background: '#343434e6',
        padding: 15,
        // paddingBottom: 10,
        fontWeight: 600,
        color: theme.colors.greyFont,
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6
      }}
    >
      <div
        // ref={froalaElementRef}
        css={{
          // margin: theme.item.childMargin,
        }}
      >
        {children}
        {/* text is managed by froala */}
      </div>
    </div>
  )
}
