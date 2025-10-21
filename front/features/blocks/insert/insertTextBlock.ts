import { copySlice } from '@entities/copy/copySlice'
import { itemType } from '@entities/quotation/const/itemType'
import type { Text } from '@entities/quotation/type'
import { textSlice } from '@shared/lib/froala/textSlice'
import { generateId } from '@shared/lib/nanoid'
import { dispatch, getState } from '@shared/lib/redux'
import type { MouseEvent } from 'react'
import textBlockContentHtml from './templates/textBlockContent.html?raw'
import textBlockPreviewHtml from './templates/textBlockPreview.html?raw'

export const insertTextBlock = (event?: MouseEvent): void => {
  const block: Text = {
    id: generateId(),
    type: itemType.text,
    email: 'john@mail.com',
    width: 600,
    height: 59.2,
    isFroala: true,
    preview: textBlockPreviewHtml,
    text: {
      html: textBlockContentHtml,
      value: null,
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
