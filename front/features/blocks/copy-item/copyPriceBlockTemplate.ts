import { copySlice } from '@front/entities/copy/copySlice'
import priceBlockPreviewHtml from '@front/entities/quotation/templates/priceBlockPreview.html?raw' // assets can be imported as strings using the ?raw suffix
import priceBlockTitleHtml from '@front/entities/quotation/templates/priceBlockTitle.html?raw'
import priceBlockValueHtml from '@front/entities/quotation/templates/priceBlockValue.html?raw'
import type { PriceBlock } from '@back/entity/quotation/schema'
import { generateId } from '@front/shared/lib/nanoid'
import { dispatch, getState } from '@front/shared/lib/redux'

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

  dispatch(
    copySlice.actions.addItem({
      item: priceBlockTemplate,
      preview: priceBlockPreviewHtml,
    }),
  )

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
