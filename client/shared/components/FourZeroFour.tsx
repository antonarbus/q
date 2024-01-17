import { theme } from '@shared/clients'

export const FourZeroFour = (): JSX.Element => (
  <div
    css={{
      height: '100vh',
      marginTop: `-${theme.nav.fullHeight}px`,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '20vw',
      color: 'grey',
    }}
  >
    404
  </div>
)
