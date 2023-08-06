import { useTheme } from '@mui/material'
import { useIsPasteHere } from 'client/entities/items/ui/SortableResizableItemWithActions/useIsPasteHere'

interface IProps {
  index: number
}

export const PasteTextInMiddle = ({ index }: IProps): JSX.Element | null => {
  const theme = useTheme()
  const isPasteHere = useIsPasteHere({ index })

  if (!isPasteHere) return null

  return (
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
  )
}
