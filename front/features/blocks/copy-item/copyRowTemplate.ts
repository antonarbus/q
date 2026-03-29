import { copySlice } from '@front/entities/copy/copySlice'

// assets can be imported as strings using the ?raw suffix
import rowDescriptionHtml from '@front/entities/quotation/templates/rowDescription.html?raw'
import rowItemPriceHtml from '@front/entities/quotation/templates/rowItemPrice.html?raw'
import rowPreviewHtml from '@front/entities/quotation/templates/rowPreview.html?raw'
import rowPriceHtml from '@front/entities/quotation/templates/rowPrice.html?raw'
import rowQtyHtml from '@front/entities/quotation/templates/rowQty.html?raw'
import type { RowBlock } from '@back/entity/quotation/schema'
import { generateId } from '@front/shared/lib/nanoid'
import { reduxHolder } from '@front/shared/lib/redux'

export const copyRowBlockTemplate = (event?: React.MouseEvent): void => {
  const rowTemplate: RowBlock = {
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

  reduxHolder.dispatch(
    copySlice.actions.addItem({
      item: rowTemplate,
      preview: rowPreviewHtml,
    }),
  )

  const isCopyModalVisible = reduxHolder.getState().copy.isVisible

  if (isCopyModalVisible === false && event !== undefined) {
    reduxHolder.dispatch(
      copySlice.actions.setInitCursorPos({
        x: event.clientX,
        y: event.clientY,
      }),
    )

    reduxHolder.dispatch(copySlice.actions.showCopyModal())
  }
}
