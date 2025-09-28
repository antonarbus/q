import { theme } from '@shared/theme'
import { useIsPasteHere } from './useIsPasteHere'
import type { JSX,ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const PasteBlockTextOverlay = ({
  children,
}: Props): JSX.Element => {
  const isPasteHere = useIsPasteHere()

  return (
    <>
      <div
        style={{
          opacity: isPasteHere === true ? 0.2 : 1,
        }}
      >
        {children}
      </div>
      {isPasteHere === true ? (
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
      ) : null}
    </>
  )
}
