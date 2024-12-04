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
import { bookmarkPosAtBlocks, quotationSlice } from '@entities/quotation'
import { notify } from '@shared/toast'
import { cls } from '@shared/consts/cls'
import { getPaperElementHtmlAtModal } from '@shared/utils/htmlGetter/getPaperElementHtmlAtModal'
import { asyncDelay } from '@shared/utils/delay'

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
    if (isSuccess) {
      if (data.message === 'saved') {
        notify({
          msg: 'Saved',
          type: 'success',
          theme: 'dark',
          position: 'bottom-center',
        })
      } else if (data.message === 'updated') {
        notify({
          msg: 'Updated',
          type: 'info',
          theme: 'dark',
          position: 'bottom-center',
        })
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
    if (isError) {
      notify({
        msg: error.response?.data.message,
        type: 'error',
        theme: 'dark',
        position: 'bottom-center',
      })

      reset()
    }
  }, [isError])

  const onSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()

    const email = getState().user.email

    if (!email) {
      notify({ msg: 'Not logged in', type: 'warn', theme: 'light' })

      return
    }

    const paperElement = document.querySelector(
      `.${cls.formModal} .${cls.paper}`,
    )

    if (!paperElement) {
      return
    }

    dispatch(
      quotationSlice.actions.updateBlockHeightReducer({
        blockIndex: bookmarkPosAtBlocks,
        height: paperElement.clientHeight,
      }),
    )

    dispatch(
      quotationSlice.actions.updateBlockWidthReducer({
        blockIndex: bookmarkPosAtBlocks,
        width: paperElement.clientWidth,
      }),
    )

    const block = getState().quotation.blocks.at(bookmarkPosAtBlocks)

    if (!block) {
      notify({ msg: 'No item loaded', type: 'warn', theme: 'light' })

      return
    }

    const html = getPaperElementHtmlAtModal()

    const itemWithUpdatedPreview = structuredClone(block)

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
