import { getState } from '@lib_instances/store'
import { useEffectOnce } from 'react-use'
import { useSignal } from '@preact/signals-react'
import { bookmarkPosAtBlocks } from '@entities/quotation'
import type { BookmarkFromValues } from '@entities/bookmark'

type Res = {
  bookmarkFromValues: BookmarkFromValues
}

export const useLoadInitValuesIntoBookmarkModal = (): Res => {
  const bookmarkFromValues = {
    nameSignal: useSignal(''),
    categorySignal: useSignal(''),
    descSignal: useSignal(''),
    infoSignal: useSignal(''),
  }

  useEffectOnce(() => {
    const bookmark = getState().quotation.blocks.at(bookmarkPosAtBlocks)

    if (bookmark) {
      bookmarkFromValues.nameSignal.value = bookmark.name ?? ''
      bookmarkFromValues.categorySignal.value = bookmark.category ?? ''
      bookmarkFromValues.descSignal.value = bookmark.desc ?? ''
      bookmarkFromValues.infoSignal.value = bookmark.info ?? ''
    }
  })

  return { bookmarkFromValues }
}
