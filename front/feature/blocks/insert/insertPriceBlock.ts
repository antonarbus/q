import { copySlice } from '@entity/copy/copySlice'
import priceBlockPreviewHtml from '@entity/quotation/templates/priceBlockPreview.html?raw' // assets can be imported as strings using the ?raw suffix
import priceBlockTitleHtml from '@entity/quotation/templates/priceBlockTitle.html?raw'
import priceBlockValueHtml from '@entity/quotation/templates/priceBlockValue.html?raw'
import type { PriceBlock } from '@back/entity/quotation/schema'
import { textSlice } from '@shared/lib/froala/textSlice'
import { generateId } from '@front/shared/lib/nanoid'
import { dispatch, getState } from '@shared/lib/redux'
import type { MouseEvent } from 'react'

export const insertPriceBlock = (event?: MouseEvent): void => {
  const block: PriceBlock = {
    id: generateId(),
    bookmarkSchemaVersion: 2,
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
