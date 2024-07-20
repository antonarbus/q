import { theme } from '@lib_instances/theme'

export const FourZeroFour = (): JSX.Element => (
  <div
    style={{
      height: '100vh',
      marginTop: `-${String(theme.nav.fullHeight)}px`,
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
