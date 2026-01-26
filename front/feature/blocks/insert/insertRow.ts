import { copySlice } from '@entity/copy/copySlice'
import rowDescriptionHtml from '@entity/quotation/templates/rowDescription.html?raw' // assets can be imported as strings using the ?raw suffix
import rowItemPriceHtml from '@entity/quotation/templates/rowItemPrice.html?raw'
import rowPreviewHtml from '@entity/quotation/templates/rowPreview.html?raw'
import rowPriceHtml from '@entity/quotation/templates/rowPrice.html?raw'
import rowQtyHtml from '@entity/quotation/templates/rowQty.html?raw'
import type { RowBlock } from '@back/entity/quotation/schema'
import { textSlice } from '@shared/lib/froala/textSlice'
import { generateId } from '@front/shared/lib/nanoid'
import { dispatch, getState } from '@shared/lib/redux'
import type { MouseEvent } from 'react'

export const insertRow = (event?: MouseEvent): void => {
  const row: RowBlock = {
    id: generateId(),
    bookmarkSchemaVersion: 2,
    name: '',
    category: '',
    desc: '',
    info: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    type: 'row',
    email: 'unknown@gmail.com',
    height: 55,
    width: 570,
    preview: rowPreviewHtml,
    description: {
      html: rowDescriptionHtml,
      value: 0,
      pin: {
        isPinned: false,
        isShown: false,
      },
    },
    itemPrice: {
      html: rowItemPriceHtml,
      value: 111,
      pin: {
        isPinned: false,
        isShown: false,
      },
    },
    qty: {
      html: rowQtyHtml,
      value: 6,
      pin: {
        isPinned: true,
        isShown: false,
      },
    },
    price: {
      html: rowPriceHtml,
      value: 666,
      pin: {
        isPinned: false,
        isShown: false,
      },
    },
  }

  const persistedScrollX = window.scrollX
  const persistedScrollY = window.scrollY

  dispatch(textSlice.actions.setNotEditable())

  // Restore scroll position after React renders
  requestAnimationFrame(() => {
    window.scrollTo(persistedScrollX, persistedScrollY)
  })

  dispatch(copySlice.actions.addItem({ item: row }))

  const isCopyModalVisible = getState().copy.isVisible

  if (isCopyModalVisible === false && event !== undefined) {
    dispatch(
      copySlice.actions.showCopyModal({
        initCursorPos: { x: event.clientX, y: event.clientY },
      }),
    )
  }
}
