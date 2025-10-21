import { copySlice } from '@entities/copy/copySlice'
import { rowTypeKey } from '@entities/quotation/const/rowTypeKey'
import type { Row } from '@entities/quotation/type'
import { textSlice } from '@shared/lib/froala/textSlice'
import { generateId } from '@shared/lib/nanoid'
import { dispatch, getState } from '@shared/lib/redux'
import type { MouseEvent } from 'react'
import rowItemHtml from './templates/rowItem.html?raw'
import rowItemPriceHtml from './templates/rowItemPrice.html?raw'
import rowPreviewHtml from './templates/rowPreview.html?raw'
import rowQtyHtml from './templates/rowQty.html?raw'

export const insertRow = (event?: MouseEvent): void => {
  const row: Row = {
    id: generateId(),
    type: rowTypeKey.row,
    email: 'john@mail.com',
    height: 55,
    width: 570,
    preview: rowPreviewHtml,
    description: {
      html: rowItemHtml,
      value: 0,
      pin: {
        isPinned: false,
        isShown: false,
      },
    },
    itemPrice: {
      html: rowItemPriceHtml,
      value: 10,
      pin: {
        isPinned: false,
        isShown: false,
      },
    },
    qty: {
      html: rowQtyHtml,
      value: 1,
      pin: {
        isPinned: true,
        isShown: false,
      },
    },
    price: {
      html: rowItemPriceHtml,
      value: 10,
      pin: {
        isPinned: false,
        isShown: false,
      },
    },
  }

  // Save scroll position before setNotEditable
  const scrollX = window.scrollX
  const scrollY = window.scrollY

  dispatch(textSlice.actions.setNotEditable())

  // Restore scroll position after React renders
  requestAnimationFrame(() => {
    window.scrollTo(scrollX, scrollY)
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
