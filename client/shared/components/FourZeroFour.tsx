import { theme } from 'client/shared/clients'

const css = {
  height: '100vh',
  marginTop: `-${theme.nav.fullHeight}px`,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '20vw',
  color: 'grey',
}

export const FourZeroFour = () => <div css={css}>404</div>
