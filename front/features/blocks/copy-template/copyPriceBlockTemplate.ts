import { clipboardSlice } from '@front/entities/quotation/redux/clipboardSlice'

// assets can be imported as strings using the ?raw suffix
import priceBlockPreviewHtml from '@front/entities/quotation/templates/priceBlockPreview.html?raw'
import priceBlockTitleHtml from '@front/entities/quotation/templates/priceBlockTitle.html?raw'
import priceBlockValueHtml from '@front/entities/quotation/templates/priceBlockValue.html?raw'
import type { PriceBlock } from '@back/entity/quotation/schema'
import { generateId } from '@front/shared/lib/nanoid/generateId'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'

export const copyPriceBlockTemplate = (event?: React.MouseEvent): void => {
  const priceBlockTemplate: PriceBlock = {
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
    title: {
      html: priceBlockTitleHtml,
      value: null,
    },
    price: {
      html: priceBlockValueHtml,
      value: 0,
    },
  }

  reduxHolder.dispatch(
    clipboardSlice.actions.addItem({
      item: priceBlockTemplate,
      preview: priceBlockPreviewHtml,
    }),
  )

  const isClipboardModalVisible = reduxHolder.getState().clipboard.isVisible

  if (isClipboardModalVisible === false && event !== undefined) {
    reduxHolder.dispatch(
      clipboardSlice.actions.setInitCursorPos({
        x: event.clientX,
        y: event.clientY,
      }),
    )

    reduxHolder.dispatch(clipboardSlice.actions.showClipboardModal())
  }
}
