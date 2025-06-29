import { dispatch, getState } from '@shared/lib/redux'
import type { UseMutationResult } from '@tanstack/react-query'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUpdateEffect } from 'react-use'
import {
  type BookmarkFormValues,
  useGetBookmarkCategoriesQuery,
  useGetBookmarksQuery,
  useSaveBookmarkMutation,
} from '@entities/bookmark'
import { BOOKMARK_POS_AT_BLOCKS, quotationSlice } from '@entities/quotation'
import { toast } from 'sonner'
import { cls } from '@shared/const/cls'
import { getPaperElementHtmlAtModal } from '@shared/util/htmlGetter/getPaperElementHtmlAtModal'
import { asyncDelay } from '@shared/util/delay'

type Props = {
  bookmarkFromValues: BookmarkFormValues
  slideOut: () => Promise<void>
}

type Res = {
  onSubmit: (e: React.FormEvent) => void
  isPending: UseMutationResult['isPending']
  isSuccess: UseMutationResult['isSuccess']
  isError: UseMutationResult['isError']
}

export const useSaveBookmark = ({
  bookmarkFromValues,
  slideOut,
}: Props): Res => {
  const navigate = useNavigate()

  const {
    mutate: saveItem,
    data,
    isSuccess,
    isPending,
    isError,
    error,
    reset,
  } = useSaveBookmarkMutation()

  const { refetch: updateItemCategories } = useGetBookmarkCategoriesQuery()
  const { refetch: updateBookmarks } = useGetBookmarksQuery()

  useUpdateEffect(() => {
    if (isSuccess === true) {
      if (data.message === 'saved') {
        toast.success('Saved')
      } else if (data.message === 'updated') {
        toast.info('Updated')
      }

      void updateItemCategories()
      void updateBookmarks()

      const slideOutAndChangeUrl = async (): Promise<void> => {
        await asyncDelay(1000)
        await slideOut()
        void navigate('..')
      }

      void slideOutAndChangeUrl()
    }
  }, [isSuccess])

  useUpdateEffect(() => {
    if (isError === true) {
      toast.error(error.response?.data.message)

      reset()
    }
  }, [isError])

  const onSubmit = useCallback((event: React.FormEvent) => {
    event.preventDefault()

    const { email } = getState().user

    if (email === null) {
      toast.warning('Not logged in')

      return
    }

    const paperElement = document.querySelector(
      `.${cls.formModal} .${cls.paper}`,
    )

    if (paperElement === null) {
      return
    }

    dispatch(
      quotationSlice.actions.updateBlockHeightReducer({
        blockIndex: BOOKMARK_POS_AT_BLOCKS,
        height: paperElement.clientHeight,
      }),
    )

    dispatch(
      quotationSlice.actions.updateBlockWidthReducer({
        blockIndex: BOOKMARK_POS_AT_BLOCKS,
        width: paperElement.clientWidth,
      }),
    )

    const bookmarkBlock = getState().quotation.blocks.at(BOOKMARK_POS_AT_BLOCKS)

    if (bookmarkBlock === undefined) {
      toast.warning('No item loaded')

      return
    }

    const html = getPaperElementHtmlAtModal()

    const itemWithUpdatedPreview = structuredClone(bookmarkBlock)

    itemWithUpdatedPreview.preview = html

    const item = {
      ...itemWithUpdatedPreview,
      name: bookmarkFromValues.nameSignal.value,
      category: bookmarkFromValues.categorySignal.value,
      desc: bookmarkFromValues.descSignal.value,
      info: bookmarkFromValues.infoSignal.value,
    }

    saveItem({ item })
  }, [])

  return { onSubmit, isPending, isSuccess, isError }
}
