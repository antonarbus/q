import { useGetBookmarkCategoryListQuery } from '@front/entities/bookmark/api/useGetBookmarkCategoryListQuery'
import { useGetBookmarkListQuery } from '@front/entities/bookmark/api/useGetBookmarkListQuery'
import { useSaveBookmarkMutation } from '@front/entities/bookmark/api/useSaveBookmarkMutation'
import type { BookmarkFormValues } from '@front/entities/bookmark/form/types'
import { BOOKMARK_POS_AT_BLOCKS } from '@front/entities/quotation/const/bookmarkPosAtBlocks'
import { quotationSlice } from '@front/entities/quotation/redux/quotationSlice'

import { cls } from '@front/shared/cls'
import { dispatch, getState } from '@front/shared/lib/redux'
import { asyncDelay } from '@front/shared/util/asyncDelay'
import type { UseMutationResult } from '@tanstack/react-query'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUpdateEffect } from 'react-use'
import { toast } from 'sonner'

type Props = {
  bookmarkFormValues: BookmarkFormValues
  slideOut: () => Promise<void>
}

type Res = {
  handleSubmit: (e: React.SubmitEvent) => void
  isPending: UseMutationResult['isPending']
  isSuccess: UseMutationResult['isSuccess']
  isError: UseMutationResult['isError']
}

export const useSaveBookmark = (props: Props): Res => {
  const navigate = useNavigate()
  const saveBookmarkMutation = useSaveBookmarkMutation()
  const getBookmarkCategoryListQuery = useGetBookmarkCategoryListQuery()
  const getBookmarkListQuery = useGetBookmarkListQuery()

  useUpdateEffect(() => {
    if (saveBookmarkMutation.isSuccess === true) {
      if (saveBookmarkMutation.data.isNew === true) {
        toast.success('Saved')
      } else {
        toast.info('Updated')
      }

      void getBookmarkCategoryListQuery.refetch()
      void getBookmarkListQuery.refetch()

      const slideOutAndChangeUrl = async (): Promise<void> => {
        await asyncDelay(1000)
        await props.slideOut()
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

  const handleSubmit = useCallback((event: React.SubmitEvent) => {
    event.preventDefault()

    if (getState().user.email === null) {
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
      quotationSlice.actions.updateBlockHeight({
        blockIndex: BOOKMARK_POS_AT_BLOCKS,
        height: paperElement.clientHeight,
      }),
    )

    dispatch(
      quotationSlice.actions.updateBlockWidth({
        blockIndex: BOOKMARK_POS_AT_BLOCKS,
        width: paperElement.clientWidth,
      }),
    )

    const bookmarkBlock = getState().quotation.blocks.at(BOOKMARK_POS_AT_BLOCKS)

    if (bookmarkBlock === undefined) {
      toast.warning('No item loaded')

      return
    }

    const item = {
      ...bookmarkBlock,
      name: props.bookmarkFormValues.nameSignal.value,
      category: props.bookmarkFormValues.categorySignal.value,
      desc: props.bookmarkFormValues.descSignal.value,
      info: props.bookmarkFormValues.infoSignal.value,
    }

    saveBookmarkMutation.mutate({ bookmark: item })
  }, [])

  return {
    handleSubmit,
    isPending: saveBookmarkMutation.isPending,
    isSuccess: saveBookmarkMutation.isSuccess,
    isError: saveBookmarkMutation.isError,
  }
}
