import { useSelectorTyped } from '@lib_instances/store'
import { useEffect } from 'react'
import { boqRowKey, itemKey } from '@entities/quotation'
import { movePasteTextBoqRowOverlay } from './movePasteTextBoqRowOverlay'
import { movePasteTextItemOverlay } from './movePasteTextItemOverlay'

export const useMovePasteTextOverlay = (): void => {
  const typeOfNextPasteItem = useSelectorTyped(
    (state) => state.copy.items.at(0)?.type,
  )

  const isItem =
    typeOfNextPasteItem === itemKey.boq ||
    typeOfNextPasteItem === itemKey.text ||
    typeOfNextPasteItem === itemKey.price
  const isBoqRow = typeOfNextPasteItem === boqRowKey.row

  useEffect(() => {
    if (isItem) {
      document.body.style.cursor = 'pointer'
      document.addEventListener('mousemove', movePasteTextItemOverlay, {
        passive: true,
      })
    }

    if (isBoqRow) {
      document.body.style.cursor = 'pointer'
      document.addEventListener('mousemove', movePasteTextBoqRowOverlay, {
        passive: true,
      })
    }

    return () => {
      document.body.style.removeProperty('cursor')
      document.removeEventListener('mousemove', movePasteTextItemOverlay)
      document.removeEventListener('mousemove', movePasteTextBoqRowOverlay)
    }
  }, [isItem, isBoqRow])
}
