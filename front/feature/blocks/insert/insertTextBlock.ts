import { copySlice } from '@entity/copy/copySlice'
import textBlockContentHtml from '@entity/quotation/templates/textBlockContent.html?raw' // assets can be imported as strings using the ?raw suffix
import textBlockPreviewHtml from '@entity/quotation/templates/textBlockPreview.html?raw'
import type { TextBlock } from '@back/entity/quotation/schema'
import { textSlice } from '@shared/lib/tiptap/store/textSlice'
import { generateId } from '@front/shared/lib/nanoid'
import { dispatch, getState } from '@shared/lib/redux'
import { lockScroll } from '@shared/util/lockScroll'

export const insertTextBlock = (event?: React.MouseEvent): void => {
  const block: TextBlock = {
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

  lockScroll()
  dispatch(textSlice.actions.setNotEditable())

  dispatch(
    copySlice.actions.addItem({ item: block, preview: textBlockPreviewHtml }),
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
