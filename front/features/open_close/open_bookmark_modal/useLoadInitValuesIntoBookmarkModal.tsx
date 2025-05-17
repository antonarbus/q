import { getState } from '@shared/lib/redux'
import { useEffectOnce } from 'react-use'
import { useSignal } from '@preact/signals-react'
import { BOOKMARK_POS_AT_BLOCKS } from '@entities/quotation'
import type { BookmarkFormValues } from '@entities/bookmark'

type Res = {
  bookmarkFromValues: BookmarkFormValues
}

export const useLoadInitValuesIntoBookmarkModal = (): Res => {
  const bookmarkFromValues = {
    nameSignal: useSignal(''),
    categorySignal: useSignal(''),
    descSignal: useSignal(''),
    infoSignal: useSignal(''),
  }

  useEffectOnce(() => {
    const bookmark = getState().quotation.blocks.at(BOOKMARK_POS_AT_BLOCKS)

    if (bookmark !== undefined) {
      bookmarkFromValues.nameSignal.value = bookmark.name ?? ''
      bookmarkFromValues.categorySignal.value = bookmark.category ?? ''
      bookmarkFromValues.descSignal.value = bookmark.desc ?? ''
      bookmarkFromValues.infoSignal.value = bookmark.info ?? ''
    }
  })

  return { bookmarkFromValues }
}
