import { useTheme } from '@mui/material'
import { useIsPasteHere } from './useIsPasteHere'
import type { ReactNode } from 'react'

interface IProps {
  index: number
  children: ReactNode
}

export const PasteHere = ({ children, index }: IProps): JSX.Element => {
  const theme = useTheme()
  const isPasteHere = useIsPasteHere({ index })

  return (
    <>
      <div
        className='reduce-opacity-if-paste-here'
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
