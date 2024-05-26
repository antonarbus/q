import { accessTokenSignal } from '../../../auth/accessTokenSignal'

export const NoRowsTableOverlay = (): JSX.Element | null => {
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
        {accessTokenSignal.value === null ? 'Not logged in' : 'No content'}
      </div>
    </div>
  )
}
