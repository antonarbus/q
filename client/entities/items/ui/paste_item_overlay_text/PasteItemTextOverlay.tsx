import { theme } from '@shared/clients'
import { useIsPasteHere } from './useIsPasteHere'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const PasteItemTextOverlay = ({ children }: Props): JSX.Element => {
  const isPasteHere = useIsPasteHere()

  return (
    <>
      <div
        style={{
          opacity: isPasteHere ? 0.2 : 1,
        }}
      >
        {children}
      </div>
      {isPasteHere && (
        <div
          css={{
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
