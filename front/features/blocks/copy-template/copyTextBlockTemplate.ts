import { clipboardSlice } from '@front/entities/clipboard/clipboardSlice'

// assets can be imported as strings using the ?raw suffix
import textBlockContentHtml from '@front/entities/quotation/templates/textBlockContent.html?raw'
import textBlockPreviewHtml from '@front/entities/quotation/templates/textBlockPreview.html?raw'
import type { TextBlock } from '@back/entity/quotation/schema'
import { generateId } from '@front/shared/lib/nanoid/generateId'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'

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

  reduxHolder.dispatch(
    clipboardSlice.actions.addItem({
      item: textBlockTemplate,
      preview: textBlockPreviewHtml,
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
