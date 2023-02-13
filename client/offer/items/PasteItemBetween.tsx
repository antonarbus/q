import { useSelectorTyped } from 'client/store'

type Props = {
  id: string
}

export const PasteItemBetween = ({ id }: Props) => {
  const isCopied = useSelectorTyped(state => state.copy.isShown)
  const { pastePos, itemId } = useSelectorTyped(state => state.copy.place)

  if (!isCopied) return null
  if (pastePos !== 'middle') return null
  if (id !== itemId) return null

  return (
    <div
      css={{
        fontWeight: 600,
        color: '#b4b4b4',
        height: '100%',
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        display: 'grid',
        placeItems: 'center',
        zIndex: 2,
        cursor: 'default',
        userSelect: 'none'
      }}
    >
      Paste here
    </div>
  )
}
