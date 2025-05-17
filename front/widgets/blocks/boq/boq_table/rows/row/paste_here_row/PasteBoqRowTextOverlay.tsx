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
          alignItems: 'stretch',
          display: 'flex',
          opacity: isPasteHere === true ? 0.2 : 1,
        }}
      >
        {children}
      </div>
      {isPasteHere && (
        <div
          style={{
            color: theme.copy.pasteTextColor,
            display: 'grid',
            fontWeight: 600,
            inset: 0,
            placeItems: 'center',
            position: 'absolute',
            userSelect: 'none',
            zIndex: 2,
          }}
        >
          Paste here
        </div>
      )}
    </>
  )
}
