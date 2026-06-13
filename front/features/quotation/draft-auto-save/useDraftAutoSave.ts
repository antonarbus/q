import { draftQuotationStorage } from '@front/entities/quotation/storage/draftQuotationStorage'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { useEffect } from 'react'
import { useUpdateEffect } from 'react-use'

const DEBOUNCE_MS = 1000

export const useDraftAutoSave = (): void => {
  const quotation = reduxHolder.useSelector((state) => state.quotation)
  const isModified = reduxHolder.useSelector((state) => state.app.isModified)

  // Clear draft when quotation is saved (isModified transitions true → false).
  // useUpdateEffect skips initial mount so the draft is not cleared before useLoadQuotation reads it.
  useUpdateEffect(() => {
    if (!isModified) {
      draftQuotationStorage.clear()
    }
  }, [isModified])

  useEffect(() => {
    if (quotation.id === '' || !isModified) {
      return undefined
    }

    const timer = setTimeout(() => {
      if (!reduxHolder.getState().app.isModified) {
        return
      }

      draftQuotationStorage.save(quotation)
    }, DEBOUNCE_MS)

    return (): void => {
      clearTimeout(timer)
    }
  }, [quotation, isModified])
}
