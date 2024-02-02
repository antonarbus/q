import { useSelectorTyped } from '@lib_instances/store'
import { useEffect } from 'react'
import { movePasteTextForBoqRow } from './movePasteTextForBoqRow'
import { movePasteTextForItem } from './movePasteTextForItem'

export const useMovePasteText = (): void => {
  const typeOfNextPasteItem = useSelectorTyped(state => state.copy.items.at(0)?.type)

  const isItem = typeOfNextPasteItem === 'boq' || typeOfNextPasteItem === 'text' || typeOfNextPasteItem === 'price'
  const isBoqRow = typeOfNextPasteItem === 'boq row'

  useEffect(() => {
    if (isItem) {
      document.body.style.cursor = 'pointer'
      document.addEventListener('mousemove', movePasteTextForItem, { passive: true })
    }

    if (isBoqRow) {
      document.body.style.cursor = 'pointer'
      document.addEventListener('mousemove', movePasteTextForBoqRow, { passive: true })
    }

    return () => {
      document.body.style.removeProperty('cursor')
      document.removeEventListener('mousemove', movePasteTextForItem)
      document.removeEventListener('mousemove', movePasteTextForBoqRow)
    }
  }, [isItem, isBoqRow])
}
