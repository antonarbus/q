import { theme } from '@shared/theme'
import { useIsPasteHere } from './useIsPasteHere'

type Props = {
  children: React.ReactNode
}

export const PasteBoqRowTextOverlay = ({
  children,
}: Props): React.JSX.Element => {
  const isPasteHere = useIsPasteHere()

  return (
    <>
      <div
        className='paste-here'
        style={{
          opacity: isPasteHere ? 0.2 : 1,
          display: 'flex',
          alignItems: 'stretch',
        }}
      >
        {children}
      </div>
      {isPasteHere && (
        <div
          style={{
            fontWeight: 600,
            color: theme.copy.pasteTextColor,
            position: 'absolute',
            inset: 0,
            display: 'grid',
            placeItems: 'center',
            zIndex: 2,
            userSelect: 'none',
          }}
        >
          Paste here
        </div>
      )}
    </>
  )
}
