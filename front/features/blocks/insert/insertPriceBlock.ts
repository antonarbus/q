import { copySlice } from '@entities/copy/copySlice'
import { itemType } from '@entities/quotation/const/itemType'
import priceBlockPreviewHtml from '@entities/quotation/templates/priceBlockPreview.html?raw' // assets can be imported as strings using the ?raw suffix
import priceBlockTitleHtml from '@entities/quotation/templates/priceBlockTitle.html?raw'
import priceBlockValueHtml from '@entities/quotation/templates/priceBlockValue.html?raw'
import type { Price } from '@entities/quotation/type'
import { textSlice } from '@shared/lib/froala/textSlice'
import { generateId } from '@shared/lib/nanoid'
import { dispatch, getState } from '@shared/lib/redux'
import type { MouseEvent } from 'react'

export const insertPriceBlock = (event?: MouseEvent): void => {
  const block: Price = {
    id: generateId(),
    name: '',
    category: '',
    desc: '',
    info: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    type: itemType.price,
    email: 'john@mail.com',
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

  // Save scroll position before setNotEditable
  const { scrollX, scrollY } = window

  dispatch(textSlice.actions.setNotEditable())

  // Restore scroll position after React renders
  requestAnimationFrame(() => {
    window.scrollTo(scrollX, scrollY)
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
