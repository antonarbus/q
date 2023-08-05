import { useIsPasteHere } from 'client/entities/items/ui/SortableResizableItemWithActions/useIsPasteHere'
import { theme } from 'client/shared/clients'

type Props = {
  index: number
}

export const PasteTextInMiddle = ({ index }: Props) => {
  const isPasteHere = useIsPasteHere({ index })
  if (!isPasteHere) return null

  return (
    <div
      css={{
        fontWeight: 600,
        color: theme.copy.pasteTextColor,
        height: '100%',
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
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
