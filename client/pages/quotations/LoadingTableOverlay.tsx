import { accessTokenSignal } from '@shared/auth/accessTokenSignal'
import { LoadingDots } from '@shared/loading_dots_overlay/LoadingDots'

export const LoadingTableOverlay = (): JSX.Element | null => {
  return (
    <div
      css={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '3vw',
        zIndex: 1000,
      }}
    >
      <div
        css={{
          color: '#d4d4d4',
          fontSize: '2rem',
          fontWeight: 300,
          position: 'relative',
          top: '-60px',
          height: '60px',
        }}
      >
        {accessTokenSignal.value ? 'Loading' : 'Not logged in'}
      </div>
      {accessTokenSignal.value && <LoadingDots background='grey' />}
    </div>
  )
}
