import { copySlice } from '@entities/copy/copySlice'
import priceBlockPreviewHtml from '@entities/quotation/templates/priceBlockPreview.html?raw' // assets can be imported as strings using the ?raw suffix
import priceBlockTitleHtml from '@entities/quotation/templates/priceBlockTitle.html?raw'
import priceBlockValueHtml from '@entities/quotation/templates/priceBlockValue.html?raw'
import type { PriceBlock } from '@back/entities/quotation/schemas'
import { textSlice } from '@shared/lib/froala/textSlice'
import { generateId } from '@root/shared/lib/nanoid'
import { dispatch, getState } from '@shared/lib/redux'
import type { MouseEvent } from 'react'

export const insertPriceBlock = (event?: MouseEvent): void => {
  const block: PriceBlock = {
    id: generateId(),
    name: '',
    category: '',
    desc: '',
    info: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    type: 'price',
    email: 'unknown@gmail.com',
    width: 150,
    height: 90,
    isFroala: true,
    preview: priceBlockPreviewHtml,
    title: {
      html: priceBlockTitleHtml,
      value: null,
    },
    price: {
      html: priceBlockValueHtml,
      value: 0,
    },
  }

  const persistedScrollX = window.scrollX
  const persistedScrollY = window.scrollY

  dispatch(textSlice.actions.setNotEditable())

  // Restore scroll position after React renders
  requestAnimationFrame(() => {
    window.scrollTo(persistedScrollX, persistedScrollY)
  })

  dispatch(copySlice.actions.addItem({ item: block }))

  const isCopyModalVisible = getState().copy.isVisible

  if (isCopyModalVisible === false && event !== undefined) {
    dispatch(
      copySlice.actions.showCopyModal({
        initCursorPos: { x: event.clientX, y: event.clientY },
      }),
    )
  }
}
