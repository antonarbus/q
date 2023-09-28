import { theme } from 'client/shared/clients'
import { useIsPasteHere } from './useIsPasteHere'
import type { ReactNode } from 'react'

type Props = {
  id: string
  children: ReactNode
}

export const PasteHere = ({ children, id }: Props): JSX.Element => {
  const isPasteHere = useIsPasteHere({ id })

  return (
    <>
      <div
        style={{
          opacity: isPasteHere ? 0.2 : 1,
          display: 'flex',
          alignItems: 'flex-end',
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
