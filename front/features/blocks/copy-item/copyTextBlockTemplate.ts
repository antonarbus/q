import { copySlice } from '@front/entities/copy/copySlice'
import textBlockContentHtml from '@front/entities/quotation/templates/textBlockContent.html?raw' // assets can be imported as strings using the ?raw suffix
import textBlockPreviewHtml from '@front/entities/quotation/templates/textBlockPreview.html?raw'
import type { TextBlock } from '@back/entity/quotation/schema'
import { generateId } from '@front/shared/lib/nanoid'
import { dispatch, getState } from '@front/shared/lib/redux'

export const copyTextBlockTemplate = (event?: React.MouseEvent): void => {
  const textBlockTemplate: TextBlock = {
    id: generateId(),
    bookmarkSchemaVersion: 2,
    name: '',
    category: '',
    desc: '',
    info: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    type: 'text',
    email: 'unknown@gmail.com',
    width: 600,
    height: 59.2,
    text: {
      html: textBlockContentHtml,
      value: null,
    },
  }

  dispatch(
    copySlice.actions.addItem({
      item: textBlockTemplate,
      preview: textBlockPreviewHtml,
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
