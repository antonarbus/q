import {
  type BookmarkFormValues,
  useGetBookmarkCategoryListQuery,
  useGetBookmarkListQuery,
  useSaveBookmarkMutation,
} from '@entities/bookmark'
import { BOOKMARK_POS_AT_BLOCKS, quotationSlice } from '@entities/quotation'
import { cls } from '@shared/const/cls'
import { dispatch, getState } from '@shared/lib/redux'
import { asyncDelay } from '@shared/util/delay'
import { getPaperElementHtmlAtModal } from '@shared/util/html-getter/getPaperElementHtmlAtModal'
import type { UseMutationResult } from '@tanstack/react-query'
import { type FormEvent, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUpdateEffect } from 'react-use'
import { toast } from 'sonner'

type Props = {
  bookmarkFromValues: BookmarkFormValues
  slideOut: () => Promise<void>
}

type Res = {
  onSubmit: (e: FormEvent) => void
  isPending: UseMutationResult['isPending']
  isSuccess: UseMutationResult['isSuccess']
  isError: UseMutationResult['isError']
}

export const useSaveBookmark = ({
  bookmarkFromValues,
  slideOut,
}: Props): Res => {
  const navigate = useNavigate()
  const saveBookmarkMutation = useSaveBookmarkMutation()
  const getBookmarkCategoryListQuery = useGetBookmarkCategoryListQuery()
  const getBookmarkListQuery = useGetBookmarkListQuery()

  useUpdateEffect(() => {
    if (saveBookmarkMutation.isSuccess === true) {
      if (saveBookmarkMutation.data.message === 'saved') {
        toast.success('Saved')
      } else if (saveBookmarkMutation.data.message === 'updated') {
        toast.info('Updated')
      }

      void getBookmarkCategoryListQuery.refetch()
      void getBookmarkListQuery.refetch()

      const slideOutAndChangeUrl = async (): Promise<void> => {
        await asyncDelay(1000)
        await slideOut()
        void navigate('..')
      }

      void slideOutAndChangeUrl()
    }
  }, [saveBookmarkMutation.isSuccess])

  useUpdateEffect(() => {
    if (saveBookmarkMutation.isError === true) {
      toast.error(saveBookmarkMutation.error.response?.data.message)
      saveBookmarkMutation.reset()
    }
  }, [saveBookmarkMutation.isError])

  const onSubmit = useCallback((event: FormEvent) => {
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

    saveBookmarkMutation.mutate({ item })
  }, [])

  return {
    onSubmit,
    isPending: saveBookmarkMutation.isPending,
    isSuccess: saveBookmarkMutation.isSuccess,
    isError: saveBookmarkMutation.isError,
  }
}
