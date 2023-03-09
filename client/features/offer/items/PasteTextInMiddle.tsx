import { useSelectorTyped } from 'client/store'

type Props = {
  id: string
}

export const PasteTextInMiddle = ({ id }: Props) => {
  const pastePos = useSelectorTyped(state => state.copy.place.pastePos)
  const itemId = useSelectorTyped(state => state.copy.place.itemId)

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
        userSelect: 'none',
        cursor: 'pointer'
      }}
    >
      Paste here
    </div>
  )
}
