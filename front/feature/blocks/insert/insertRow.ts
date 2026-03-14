import { copySlice } from '@entity/copy/copySlice'
import rowDescriptionHtml from '@entity/quotation/templates/rowDescription.html?raw' // assets can be imported as strings using the ?raw suffix
import rowItemPriceHtml from '@entity/quotation/templates/rowItemPrice.html?raw'
import rowPreviewHtml from '@entity/quotation/templates/rowPreview.html?raw'
import rowPriceHtml from '@entity/quotation/templates/rowPrice.html?raw'
import rowQtyHtml from '@entity/quotation/templates/rowQty.html?raw'
import type { RowBlock } from '@back/entity/quotation/schema'
import { textSlice } from '@shared/lib/tiptap/store/textSlice'
import { generateId } from '@front/shared/lib/nanoid'
import { dispatch, getState } from '@shared/lib/redux'
import { lockScroll } from '@shared/util/lockScroll'

export const insertRow = (event?: React.MouseEvent): void => {
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

  dispatch(copySlice.actions.addItem({ item: row, preview: rowPreviewHtml }))

  const isCopyModalVisible = getState().copy.isVisible

  if (isCopyModalVisible === false && event !== undefined) {
    dispatch(
      copySlice.actions.setInitCursorPos({
        x: event.clientX,
        y: event.clientY,
      }),
    )

    dispatch(copySlice.actions.showCopyModal())
  }
}
