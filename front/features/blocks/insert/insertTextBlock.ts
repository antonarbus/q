import { copySlice } from '@entities/copy/copySlice'
import { itemType } from '@entities/quotation/const/itemType'
import textBlockContentHtml from '@entities/quotation/templates/textBlockContent.html?raw' // assets can be imported as strings using the ?raw suffix
import textBlockPreviewHtml from '@entities/quotation/templates/textBlockPreview.html?raw'
import type { TextBlock } from '@root/shared/types/BlockItem'
import { textSlice } from '@shared/lib/froala/textSlice'
import { generateId } from '@shared/lib/nanoid'
import { dispatch, getState } from '@shared/lib/redux'
import type { MouseEvent } from 'react'

export const insertTextBlock = (event?: MouseEvent): void => {
  const block: TextBlock = {
    id: generateId(),
    name: '',
    category: '',
    desc: '',
    info: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    type: itemType.text,
    email: 'unknown@gmail.com',
    width: 600,
    height: 59.2,
    isFroala: true,
    preview: textBlockPreviewHtml,
    text: {
      html: textBlockContentHtml,
      value: null,
    },
  }

  const persistedScrollX = window.scrollX
  const persistedScrollY = window.scrollY

  dispatch(textSlice.actions.setNotEditable())

  // Restore scroll position after React renders
  requestAnimationFrame(() => {
    window.scrollTo(persistedScrollX, persistedScrollY)
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
