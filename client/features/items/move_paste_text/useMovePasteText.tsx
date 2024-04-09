import { useSelectorTyped } from '@lib_instances/store'
import { useEffect } from 'react'
import { boqRowKey, itemKey } from '@entities/quotation'
import { movePasteTextForBoqRow } from './movePasteTextForBoqRow'
import { movePasteTextForItem } from './movePasteTextForItem'

export const useMovePasteText = (): void => {
  const typeOfNextPasteItem = useSelectorTyped(state => state.copy.items.at(0)?.type)

  const isItem = typeOfNextPasteItem === itemKey.boq || typeOfNextPasteItem === itemKey.text || typeOfNextPasteItem === itemKey.price
  const isBoqRow = typeOfNextPasteItem === boqRowKey.row

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
