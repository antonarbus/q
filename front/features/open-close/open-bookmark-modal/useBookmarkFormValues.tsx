import type { BookmarkFormValues } from '@front/entities/bookmark/form/types'
import { BOOKMARK_POS_AT_BLOCKS } from '@front/entities/quotation/redux/bookmarkPosAtBlocks'
import { useSignal } from '@preact/signals-react'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { useEffectOnce } from 'react-use'

export const useBookmarkFormValues = (): BookmarkFormValues => {
  const bookmarkFromValues = {
    nameSignal: useSignal(''),
    categorySignal: useSignal(''),
    descSignal: useSignal(''),
    infoSignal: useSignal(''),
  }

  useEffectOnce(() => {
    const bookmark = reduxHolder.getState().quotation.blocks.at(BOOKMARK_POS_AT_BLOCKS)

    if (bookmark !== undefined) {
      bookmarkFromValues.nameSignal.value = bookmark.name
      bookmarkFromValues.categorySignal.value = bookmark.category
      bookmarkFromValues.descSignal.value = bookmark.desc
      bookmarkFromValues.infoSignal.value = bookmark.info
    }
  })

  return bookmarkFromValues
}
