import { theme } from '@src/theme'

const css = {
  height: '100vh',
  marginTop: `-${theme.nav.fullHeight}px`,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '3vw',
  color: 'grey'
}

export const Unauthorized = () => <div css={css}>Unauthorized</div>
