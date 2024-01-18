import { useSelectorTyped } from '@libras/store'
import { LoadingDots } from '@shared/components/LoadingDots'

type Props = {
  isShowing?: boolean
  title?: string
}

export const Spinner = ({ isShowing, title }: Props): JSX.Element | null => {
  const isLoading = useSelectorTyped(state => state.spinner.isLoading)
  const text = useSelectorTyped(state => state.spinner.text)
  if (!isLoading && !isShowing) return null

  return (
    <div
      css={{
        position: 'fixed',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '3vw',
        color: '#fff',
        zIndex: 1000,
        background: 'rgba(0, 0, 0, 0.5)',
        WebkitTapHighlightColor: 'transparent',
        backdropFilter: 'blur(2px)',
      }}
    >
      <div
        css={{
          color: '#d4d4d4',
          fontSize: '2rem',
          fontWeight: 300,
          position: 'relative',
          top: '-60px',
        }}
      >
        {text || title}
      </div>
      <LoadingDots />
    </div>
  )
}
