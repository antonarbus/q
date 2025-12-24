import { copySlice } from '@entities/copy/copySlice'
import { rowTypeKey } from '@entities/quotation/const/rowTypeKey'
import rowDescriptionHtml from '@entities/quotation/templates/rowDescription.html?raw' // assets can be imported as strings using the ?raw suffix
import rowItemPriceHtml from '@entities/quotation/templates/rowItemPrice.html?raw'
import rowPreviewHtml from '@entities/quotation/templates/rowPreview.html?raw'
import rowPriceHtml from '@entities/quotation/templates/rowPrice.html?raw'
import rowQtyHtml from '@entities/quotation/templates/rowQty.html?raw'
import type { Row } from '@entities/quotation/type'
import { textSlice } from '@shared/lib/froala/textSlice'
import { generateId } from '@shared/lib/nanoid'
import { dispatch, getState } from '@shared/lib/redux'
import type { MouseEvent } from 'react'

export const insertRow = (event?: MouseEvent): void => {
  const row: Row = {
    id: generateId(),
    name: '',
    category: '',
    desc: '',
    info: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    type: rowTypeKey.row,
    email: 'john@mail.com',
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

  // Save scroll position before setNotEditable
  const { scrollX, scrollY } = window

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
